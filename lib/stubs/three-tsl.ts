// Build-time stand-in for 'three/tsl' (see next.config.ts and three-webgpu.ts).
// Only three-globe's heatmap GPU path touches these, and this site has no heatmaps.
const unavailable = () => {
  throw new Error('three/tsl is not bundled in this build.');
};
export const Fn = unavailable;
export const If = unavailable;
export const Loop = unavailable;
export const uniform = unavailable;
export const storage = unavailable;
export const float = unavailable;
export const sqrt = unavailable;
export const sin = unavailable;
export const cos = unavailable;
export const asin = unavailable;
export const exp = unavailable;
export const negate = unavailable;
export const instanceIndex = undefined;
