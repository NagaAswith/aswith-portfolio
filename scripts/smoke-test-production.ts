/**
 * Live Production Smoke Test
 * Tests the live deployed URL: https://aswith-portfolio.vercel.app
 */

const BASE_URL = process.env.PRODUCTION_URL || 'https://aswith-portfolio.vercel.app';

interface SmokeTestResult {
  endpoint: string;
  expectedStatus: number | number[];
  actualStatus?: number;
  pass: boolean;
  notes?: string;
}

async function runProductionSmokeTests() {
  console.log('================================================================');
  console.log(`LIVE PRODUCTION SMOKE TESTS: ${BASE_URL}`);
  console.log('================================================================\n');

  const tests: Array<{
    name: string;
    path: string;
    method?: string;
    body?: any;
    headers?: Record<string, string>;
    expectedStatus: number | number[];
    validateBody?: (data: any, text: string) => boolean;
  }> = [
    {
      name: 'Public Homepage',
      path: '/',
      expectedStatus: 200,
      validateBody: (_, text) => text.includes('Aswith') || text.includes('html'),
    },
    {
      name: 'Dedicated About Page',
      path: '/about',
      expectedStatus: 200,
      validateBody: (_, text) => text.includes('Aswith') || text.includes('About'),
    },
    {
      name: 'Projects API',
      path: '/api/projects',
      expectedStatus: 200,
      validateBody: (data) => Boolean(data?.success && Array.isArray(data?.data) && data.data.length >= 5),
    },
    {
      name: 'Certificates API',
      path: '/api/certificates',
      expectedStatus: 200,
      validateBody: (data) => Boolean(data?.success && Array.isArray(data?.data) && data.data.length >= 10),
    },
    {
      name: 'Skills Matrix API',
      path: '/api/skills',
      expectedStatus: 200,
      validateBody: (data) => Boolean(data?.success && Array.isArray(data?.data) && data.data.length >= 12),
    },
    {
      name: 'Experience API',
      path: '/api/experience',
      expectedStatus: 200,
      validateBody: (data) => Boolean(data?.success && Array.isArray(data?.data) && data.data.length >= 2),
    },
    {
      name: 'Education API',
      path: '/api/education',
      expectedStatus: 200,
      validateBody: (data) => Boolean(data?.success && Array.isArray(data?.data) && data.data.length >= 1),
    },
    {
      name: 'Achievements API',
      path: '/api/achievements',
      expectedStatus: 200,
      validateBody: (data) => Boolean(data?.success && Array.isArray(data?.data) && data.data.length >= 6),
    },
    {
      name: 'Personal Identity API',
      path: '/api/personal',
      expectedStatus: 200,
      validateBody: (data) => Boolean(data?.success && (data?.data?.fullName || data?.data?.name)),
    },
    {
      name: 'Sitemap XML',
      path: '/sitemap.xml',
      expectedStatus: 200,
      validateBody: (_, text) => text.includes('urlset') || text.includes('aswith-portfolio'),
    },
    {
      name: 'Robots.txt',
      path: '/robots.txt',
      expectedStatus: 200,
      validateBody: (_, text) => text.toLowerCase().includes('user-agent'),
    },
    {
      name: 'Protected Passkey Reveal API (unauthorized blocked)',
      path: '/api/admin/auth/reveal-passkey',
      method: 'POST',
      body: JSON.stringify({ code: '0409' }),
      headers: { 'Content-Type': 'application/json' },
      expectedStatus: 401,
      validateBody: (data) => data.success === false && data.error.includes('Unauthorized'),
    },
    {
      name: 'Protected Media Cleanup API (unauthorized blocked)',
      path: '/api/admin/media/cleanup',
      method: 'POST',
      body: JSON.stringify({ oldMediaUrl: '/media/test.jpg' }),
      headers: { 'Content-Type': 'application/json' },
      expectedStatus: 401,
      validateBody: (data) => data.success === false && data.error.includes('Unauthorized'),
    },
    {
      name: 'AI Chat Assistant (Creator question: "Who built you?")',
      path: '/api/chat',
      method: 'POST',
      body: JSON.stringify({ message: 'Who built you?' }),
      headers: { 'Content-Type': 'application/json' },
      expectedStatus: 200,
      validateBody: (data) => Boolean(data?.reply?.includes('Naga Aswith') && data?.reply?.includes('creator')),
    },
    {
      name: 'AI Chat Assistant (Imperfect query: "who build u")',
      path: '/api/chat',
      method: 'POST',
      body: JSON.stringify({ message: 'who build u' }),
      headers: { 'Content-Type': 'application/json' },
      expectedStatus: 200,
      validateBody: (data) => Boolean(data?.reply?.includes('Naga Aswith') && data?.reply?.includes('creator')),
    },
    {
      name: 'Desktop Intro Video Asset (HTTP 200 or 206)',
      path: '/media/intro/intro-video.mp4',
      expectedStatus: [200, 206],
    },
    {
      name: 'Mobile Intro Video Asset (HTTP 200 or 206)',
      path: '/media/mobileintro/Mobileintro.mp4',
      expectedStatus: [200, 206],
    },
    {
      name: 'Particle Tunnel Video Asset (HTTP 200 or 206)',
      path: '/media/background/Particle_tunnel_portfolio_video___20261024144915.mp4',
      expectedStatus: [200, 206],
    },
    {
      name: 'Background Music Track Asset (HTTP 200 or 206)',
      path: '/media/back_music/pirate.mp3',
      expectedStatus: [200, 206],
    },
  ];

  let passed = 0;
  let failed = 0;

  for (const t of tests) {
    const url = `${BASE_URL}${t.path}`;
    try {
      const res = await fetch(url, {
        method: t.method || 'GET',
        headers: t.headers,
        body: t.body,
      });

      const allowedStatuses = Array.isArray(t.expectedStatus) ? t.expectedStatus : [t.expectedStatus];
      const statusOk = allowedStatuses.includes(res.status);

      let bodyOk = true;
      let bodyText = '';
      let bodyJson = null;

      if (t.validateBody) {
        bodyText = await res.text();
        try {
          bodyJson = JSON.parse(bodyText);
        } catch {}
        bodyOk = t.validateBody(bodyJson, bodyText);
      }

      if (statusOk && bodyOk) {
        passed++;
        console.log(`  [✓ PASS] ${t.name} -> HTTP ${res.status}`);
      } else {
        failed++;
        console.error(`  [✗ FAIL] ${t.name} -> HTTP ${res.status} (expected: ${allowedStatuses.join('/')})`);
        if (!bodyOk) {
          console.error(`          Body validation failed. Sample: ${bodyText.slice(0, 150)}...`);
        }
      }
    } catch (err: unknown) {
      failed++;
      console.error(`  [✗ ERROR] ${t.name} -> Connection error: ${(err as Error)?.message}`);
    }
  }

  console.log('\n================================================================');
  console.log(`PRODUCTION SMOKE TEST RESULTS: ${passed} PASSED, ${failed} FAILED (TOTAL: ${tests.length})`);
  console.log('================================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runProductionSmokeTests().catch((err) => {
  console.error('Smoke Test Fatal Error:', err);
  process.exit(1);
});
