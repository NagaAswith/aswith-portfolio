interface RateLimitRecord {
  timestamps: number[];
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetMs: number;
  adapter: 'memory' | 'redis';
}

class SlidingWindowRateLimiter {
  private memoryStore = new Map<string, RateLimitRecord>();

  public isRedisConfigured(): boolean {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    return !!(url && url.trim() !== '' && token && token.trim() !== '');
  }

  /**
   * Check if request should be rate-limited
   * Uses Upstash Redis if environment variables are set; falls back to in-memory sliding window.
   */
  public check(key: string, limit: number, windowMs: number): RateLimitResult | Promise<RateLimitResult> {
    if (this.isRedisConfigured()) {
      return this.checkRedis(key, limit, windowMs);
    }
    return this.checkMemory(key, limit, windowMs);
  }

  /**
   * Async check method explicitly returning a Promise
   */
  public async checkAsync(key: string, limit: number, windowMs: number): Promise<RateLimitResult> {
    return Promise.resolve(this.check(key, limit, windowMs));
  }

  private checkMemory(key: string, limit: number, windowMs: number): RateLimitResult {
    const now = Date.now();
    const windowStart = now - windowMs;

    let record = this.memoryStore.get(key);
    if (!record) {
      record = { timestamps: [] };
      this.memoryStore.set(key, record);
    }

    record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

    if (record.timestamps.length >= limit) {
      const oldestInWindow = record.timestamps[0];
      const resetMs = oldestInWindow + windowMs - now;
      return { allowed: false, remaining: 0, resetMs: Math.max(0, resetMs), adapter: 'memory' };
    }

    record.timestamps.push(now);
    const remaining = limit - record.timestamps.length;
    return { allowed: true, remaining, resetMs: windowMs, adapter: 'memory' };
  }

  private async checkRedis(key: string, limit: number, windowMs: number): Promise<RateLimitResult> {
    const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
    const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

    if (!url || !token) {
      return this.checkMemory(key, limit, windowMs);
    }

    const now = Date.now();
    const windowStart = now - windowMs;
    const memberId = `${now}-${Math.random().toString(36).substring(2, 9)}`;
    const expireSec = Math.max(1, Math.ceil(windowMs / 1000));

    try {
      const pipelineUrl = url.endsWith('/') ? `${url}pipeline` : `${url}/pipeline`;
      const response = await fetch(pipelineUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          ['ZREMRANGEBYSCORE', key, '0', String(windowStart)],
          ['ZADD', key, String(now), memberId],
          ['ZCARD', key],
          ['EXPIRE', key, String(expireSec)],
        ]),
      });

      if (!response.ok) {
        console.warn(`[RateLimit] Redis REST error (status ${response.status}). Falling back to memory limiter.`);
        return this.checkMemory(key, limit, windowMs);
      }

      const data = await response.json();
      if (!Array.isArray(data) || data.length < 3) {
        console.warn('[RateLimit] Unexpected Redis REST pipeline response format. Falling back to memory.');
        return this.checkMemory(key, limit, windowMs);
      }

      const zcardResult = data[2]?.result;
      const count = typeof zcardResult === 'number' ? zcardResult : parseInt(String(zcardResult || 0), 10);

      if (count > limit) {
        return { allowed: false, remaining: 0, resetMs: windowMs, adapter: 'redis' };
      }

      return { allowed: true, remaining: Math.max(0, limit - count), resetMs: windowMs, adapter: 'redis' };
    } catch {
      console.warn('[RateLimit] Network exception contacting Redis REST host. Falling back to memory limiter.');
      return this.checkMemory(key, limit, windowMs);
    }
  }

  public cleanup(windowMs: number = 3600000) {
    const now = Date.now();
    const windowStart = now - windowMs;
    for (const [key, record] of this.memoryStore.entries()) {
      record.timestamps = record.timestamps.filter((ts) => ts > windowStart);
      if (record.timestamps.length === 0) {
        this.memoryStore.delete(key);
      }
    }
  }
}

export const rateLimiter = new SlidingWindowRateLimiter();

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return '127.0.0.1';
}

