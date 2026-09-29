import type { NextConfig } from 'next';

// The globe never uses WebGPU/TSL (heatmaps or the WebGPU renderer), so swap those
// top-level imports for tiny stubs. See lib/stubs/.

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },
  poweredByHeader: false,
  turbopack: {
    resolveAlias: { 'three/webgpu': './lib/stubs/three-webgpu.ts', 'three/tsl': './lib/stubs/three-tsl.ts' },
  },
};

export default nextConfig;
