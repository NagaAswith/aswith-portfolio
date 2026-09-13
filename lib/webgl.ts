export interface WebGLSupport {
  supported: boolean;
  version: 1 | 2 | 0;
  maxTextureSize: number;
  extensions: string[];
}

export function checkWebGLSupport(): WebGLSupport {
  if (typeof window === 'undefined') {
    return { supported: true, version: 2, maxTextureSize: 4096, extensions: [] };
  }

  try {
    const canvas = document.createElement('canvas');
    const gl2 = canvas.getContext('webgl2');
    if (gl2) {
      const maxTextureSize = gl2.getParameter(gl2.MAX_TEXTURE_SIZE) as number;
      const extensions = gl2.getSupportedExtensions() || [];
      return { supported: true, version: 2, maxTextureSize, extensions };
    }

    const gl1 =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl1) {
      const gl1Ctx = gl1 as WebGLRenderingContext;
      const maxTextureSize = gl1Ctx.getParameter(
        gl1Ctx.MAX_TEXTURE_SIZE
      ) as number;
      const extensions = gl1Ctx.getSupportedExtensions() || [];
      return { supported: true, version: 1, maxTextureSize, extensions };
    }
  } catch (e) {
    console.warn('WebGL support check failed:', e);
  }

  return { supported: false, version: 0, maxTextureSize: 0, extensions: [] };
}
