// Build-time stand-in for 'three/webgpu' (see next.config.ts; 'three/tsl' has its own stub).
// three-globe and three-render-objects import these at the top level, but only use them for
// heatmap layers and an opt-in WebGPU renderer, neither of which this site uses. Aliasing them
// away removes roughly a megabyte of JavaScript from the home page's globe chunk.
export class WebGPURenderer {
  constructor() {
    throw new Error('WebGPU renderer is not bundled in this build.');
  }
}
export class StorageInstancedBufferAttribute {}
