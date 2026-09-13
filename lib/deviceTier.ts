export type DeviceTier = 'HIGH' | 'MEDIUM' | 'LOW';

export interface DeviceCapabilities {
  tier: DeviceTier;
  gpuVendor: string;
  isMobile: boolean;
  cores: number;
  memory: number;
  dpr: number;
}

export function detectDeviceTier(): DeviceCapabilities {
  if (typeof window === 'undefined') {
    return {
      tier: 'HIGH',
      gpuVendor: 'unknown',
      isMobile: false,
      cores: 8,
      memory: 8,
      dpr: 1,
    };
  }

  let gpuVendor = 'unknown';
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');

    if (gl) {
      const debugInfo = (gl as WebGLRenderingContext).getExtension(
        'WEBGL_debug_renderer_info'
      );
      if (debugInfo) {
        gpuVendor =
          ((gl as WebGLRenderingContext).getParameter(
            debugInfo.UNMASKED_RENDERER_WEBGL
          ) as string) || 'unknown';
      }
    }
  } catch {
    gpuVendor = 'unknown';
  }

  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent
    ) || window.innerWidth < 768;

  const cores = navigator.hardwareConcurrency || 4;
  const memory =
    (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4;
  const dpr = window.devicePixelRatio || 1;

  const lowerGpu = gpuVendor.toLowerCase();

  const isLowGpu =
    lowerGpu.includes('swiftshader') ||
    lowerGpu.includes('llvmpipe') ||
    lowerGpu.includes('mali-4') ||
    lowerGpu.includes('mali-t') ||
    lowerGpu.includes('adreno 3') ||
    lowerGpu.includes('adreno 4') ||
    lowerGpu.includes('intel hd graphics 2000') ||
    lowerGpu.includes('intel hd graphics 3000');

  const isHighGpu =
    lowerGpu.includes('nvidia') ||
    lowerGpu.includes('geforce') ||
    lowerGpu.includes('rtx') ||
    lowerGpu.includes('gtx') ||
    lowerGpu.includes('radeon') ||
    lowerGpu.includes('apple m') ||
    lowerGpu.includes('apple gpu') ||
    lowerGpu.includes('adreno 7') ||
    lowerGpu.includes('adreno 660');

  let tier: DeviceTier = 'MEDIUM';

  if (isLowGpu || cores <= 2 || memory <= 2) {
    tier = 'LOW';
  } else if (isHighGpu && cores >= 6 && memory >= 6 && !isMobile) {
    tier = 'HIGH';
  } else if (isMobile) {
    tier = cores >= 8 && memory >= 6 ? 'MEDIUM' : 'LOW';
  } else {
    tier = 'MEDIUM';
  }

  return {
    tier,
    gpuVendor,
    isMobile,
    cores,
    memory,
    dpr,
  };
}
