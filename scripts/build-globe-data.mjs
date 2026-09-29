// Builds the static data the home globe needs:
//   public/data/land-dots.json  (H3 cell centres over land, precomputed so the browser does no
//                                hex-binning; split into normal and highlighted destination dots)
//   public/data/world-dots.svg  (dotted equirectangular map used as the no-WebGL fallback)
// and copies the destination flags from the flag-icons package into public/flags.
// Run with: npm run globe-data   (only needed when changing the map or flags)
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { feature } from 'topojson-client';
import { polygonToCells, cellToLatLng } from 'h3-js';

const require = createRequire(import.meta.url);
const topo = JSON.parse(readFileSync(require.resolve('world-atlas/countries-110m.json'), 'utf8'));
const geo = feature(topo, topo.objects.countries);

const round = (v) => (Array.isArray(v) ? v.map(round) : Math.round(v * 100) / 100);
// Drop degenerate polygons (the source has a few zero-area slivers) — H3 hex-binning throws on them.
const distinct = (ring) => new Set(ring.map((pt) => pt.join(','))).size;
const cleanGeometry = ({ type, coordinates }) => {
  const polys = (type === 'Polygon' ? [coordinates] : coordinates).map(round).filter((poly) => distinct(poly[0]) >= 3);
  return polys.length === 1 ? { type: 'Polygon', coordinates: polys[0] } : { type: 'MultiPolygon', coordinates: polys };
};
const features = geo.features
  .filter((f) => f.id !== '010') // Antarctica: skip, it only adds noise at the bottom of the globe
  .map((f) => ({ type: 'Feature', id: f.id ?? null, properties: { name: f.properties.name }, geometry: cleanGeometry(f.geometry) }));
mkdirSync('public/data', { recursive: true });

// Destination countries glow brighter on the globe. Keep in sync with content/countries.ts.
const SCHENGEN = ['040','056','100','191','203','208','233','246','250','276','300','348','352','380','428','438','440','442','470','528','578','616','620','642','703','705','724','752','756'];
const HIGHLIGHT = new Set(['826', '840', '036', '792', '417', '156', '458', ...SCHENGEN]);
const RES = 3;
const dots = [], hi = [];
for (const f of features) {
  const g = f.geometry;
  const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
  const target = HIGHLIGHT.has(f.id) ? hi : dots;
  const cells = new Set(polys.flatMap((p) => polygonToCells(p, RES, true)));
  for (const c of cells) {
    const [lat, lng] = cellToLatLng(c);
    target.push(Math.round(lat * 10), Math.round(lng * 10)); // tenths of a degree, as integers
  }
}
writeFileSync('public/data/land-dots.json', JSON.stringify({ scale: 10, dots, hi }));

// point-in-polygon for the dotted fallback map
function inRing(x, y, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
function inGeom(x, y, g) {
  const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
  return polys.some((p) => inRing(x, y, p[0]) && !p.slice(1).some((h) => inRing(x, y, h)));
}
const STEP = 2.5, W = 360, H = 150; // latitude 80N..-70S
let svgDots = '';
for (let lat = 80; lat >= -70; lat -= STEP) {
  for (let lng = -180 + STEP / 2; lng < 180; lng += STEP) {
    if (features.some((f) => inGeom(lng, lat, f.geometry))) svgDots += `<circle cx="${(lng + 180).toFixed(2)}" cy="${(80 - lat).toFixed(2)}" r="0.85"/>`;
  }
}
writeFileSync('public/data/world-dots.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" fill="#1b7ec1" fill-opacity="0.55">${svgDots}</svg>`);

mkdirSync('public/flags', { recursive: true });
for (const c of ['gb', 'us', 'au', 'eu', 'tr', 'kg', 'cn', 'my', 'pk']) {
  copyFileSync(require.resolve(`flag-icons/flags/4x3/${c}.svg`), `public/flags/${c}.svg`);
}
console.log('globe data written:', features.length, 'countries,', dots.length / 2, 'land dots,', hi.length / 2, 'highlighted');
