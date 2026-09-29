'use client';

// The WebGL globe. Loaded only on the client, after the hero text has painted
// (see GlobeStage: dynamic(() => import('./GlobeCanvas'), { ssr: false })).

import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Globe, { type GlobeMethods } from 'react-globe.gl';
import { CanvasTexture, Color, MeshPhongMaterial, SRGBColorSpace } from 'three';
import { countries, PAKISTAN } from '@/content/countries';

export type GlobeHandle = { focus: (slug: string) => void };

type Dot = { lat: number; lng: number };
type DotSet = { kind: 'land' | 'hi'; pts: Dot[] };
type Pin = { slug: string; lat: number; lng: number; flag: string; label: string; short: string; i: number };

// Final resting view: centred so the UK, Europe, Turkey, Kyrgyzstan, China and Malaysia are all in sight.
const HOME_VIEW = { lat: 30, lng: 55, altitude: 2.05 };
const INTRO_MS = 2800;
const INTRO_SPIN = 540; // degrees of longitude the globe unwinds during the intro

const PINS: Pin[] = countries.map((c, i) => ({
  slug: c.slug,
  lat: c.pin.lat,
  lng: c.pin.lng,
  flag: c.flag,
  label: c.slug === 'study-in-europe' ? 'Schengen (Europe)' : c.slug === 'study-in-usa' ? 'USA' : c.name.replace(' (Türkiye)', ''),
  short: c.short,
  i,
}));

// Label nudges so neighbouring pins (UK/Schengen, Kyrgyzstan/China) never overlap at the home view.
const PIN_OFFSET: Record<string, [string, string]> = {
  'study-in-uk': ['-30%', '-26px'],
  'study-in-europe': ['-35%', '16px'],
  'study-in-kyrgyzstan': ['-10%', '-24px'],
  'study-in-china': ['35%', '10px'],
  'study-in-turkey': ['0%', '10px'],
};

const ARCS = countries.map((c) => ({ startLat: PAKISTAN.lat, startLng: PAKISTAN.lng, endLat: c.pin.lat, endLng: c.pin.lng }));

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

type Props = { size: number; reducedMotion: boolean; onReady?: () => void };

const GlobeCanvas = forwardRef<GlobeHandle, Props>(function GlobeCanvas({ size, reducedMotion, onReady }, ref) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const router = useRouter();
  const [land, setLand] = useState<DotSet[]>([]);
  const [landed, setLanded] = useState(false);
  const navigating = useRef(false);

  useEffect(() => {
    let alive = true;
    // Land dots are precomputed at build time (scripts/build-globe-data.mjs): the browser only
    // uploads two point clouds to the GPU instead of hex-binning every country on the main thread.
    fetch('/data/land-dots.json')
      .then((r) => r.json())
      .then((d: { scale: number; dots: number[]; hi: number[] }) => {
        const unpack = (a: number[]) => {
          const pts: Dot[] = [];
          for (let i = 0; i < a.length; i += 2) pts.push({ lat: a[i] / d.scale, lng: a[i + 1] / d.scale });
          return pts;
        };
        if (alive) setLand([{ kind: 'land', pts: unpack(d.dots) }, { kind: 'hi', pts: unpack(d.hi) }]);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const material = useMemo(() => {
    const m = new MeshPhongMaterial({ color: new Color('#0b1c3e'), shininess: 18 });
    m.emissive = new Color('#0b1c3e');
    m.emissiveIntensity = 0.35;
    return m;
  }, []);

  // Round point sprites so particles read as dots, not squares. three-globe ignores
  // particlesColor once a texture is set, so each colour is baked into its own texture.
  const dotTextures = useMemo(() => {
    const make = (fill: string) => {
      const c = document.createElement('canvas');
      c.width = c.height = 64;
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.arc(32, 32, 28, 0, Math.PI * 2);
      ctx.fill();
      const t = new CanvasTexture(c);
      t.colorSpace = SRGBColorSpace;
      return t;
    };
    return { land: make('#2d6fa8'), hi: make('#5fd0ff') };
  }, []);

  const flyTo = useCallback((slug: string) => {
    const pin = PINS.find((p) => p.slug === slug);
    const g = globeRef.current;
    if (!pin || !g || navigating.current) return;
    navigating.current = true;
    g.pointOfView({ lat: pin.lat, lng: pin.lng, altitude: 1.35 }, reducedMotion ? 0 : 600);
    window.setTimeout(() => router.push(`/${slug}`), reducedMotion ? 0 : 600);
  }, [reducedMotion, router]);

  useImperativeHandle(ref, () => ({
    focus(slug: string) {
      const pin = PINS.find((p) => p.slug === slug);
      if (!pin || !globeRef.current || !landed) return;
      globeRef.current.pointOfView({ lat: pin.lat, lng: pin.lng, altitude: 2.1 }, reducedMotion ? 0 : 1000);
    },
  }), [landed, reducedMotion]);

  // Controls: drag to rotate on desktop, never zoom (keeps page scroll working).
  useEffect(() => {
    const g = globeRef.current;
    if (!g) return;
    const c = g.controls();
    c.enableZoom = false;
    c.enablePan = false;
    c.autoRotate = false;
    c.rotateSpeed = 0.6;
    // On touch screens a draggable canvas would trap vertical scrolling, so the globe stays still there.
    c.enableRotate = !window.matchMedia('(pointer: coarse)').matches;
  });

  // globe.gl only re-evaluates which pins face the camera when the camera moves, so give it a
  // no-op move once the pins exist; otherwise far-side pins (USA, Australia) would show through.
  useEffect(() => {
    if (!landed) return;
    const id = requestAnimationFrame(() => globeRef.current?.pointOfView(globeRef.current.pointOfView(), 0));
    return () => cancelAnimationFrame(id);
  }, [landed]);

  const runIntro = useCallback(() => {
    const g = globeRef.current;
    if (!g) return;
    // Phones report DPR 2–3; rendering the globe at full DPR multiplies GPU fill work for little
    // visible gain on a dotted globe, so cap it.
    g.renderer().setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    if (reducedMotion) {
      g.pointOfView(HOME_VIEW, 0);
      setLanded(true);
      onReady?.();
      return;
    }
    const from = { lat: 12, lng: HOME_VIEW.lng - INTRO_SPIN, altitude: 4 };
    g.pointOfView(from, 0);
    onReady?.();
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / INTRO_MS);
      const e = easeOutCubic(t);
      g.pointOfView(
        {
          lat: from.lat + (HOME_VIEW.lat - from.lat) * e,
          lng: from.lng + (HOME_VIEW.lng - from.lng) * e,
          altitude: from.altitude + (HOME_VIEW.altitude - from.altitude) * e,
        },
        0,
      );
      if (t < 1) requestAnimationFrame(tick);
      else setLanded(true);
    };
    requestAnimationFrame(tick);
  }, [onReady, reducedMotion]);

  const makePin = useCallback(
    (d: object) => {
      const p = d as Pin;
      // globe.gl positions this outer node with an inline transform; all visual motion
      // happens on the inner link so the two never fight.
      const anchor = document.createElement('div');
      anchor.className = 'globe-pin-anchor';
      const el = document.createElement('a');
      el.href = `/${p.slug}`;
      el.className = 'globe-pin pe-glass';
      el.style.setProperty('--i', String(p.i));
      const [dx, dy] = PIN_OFFSET[p.slug] ?? ['0%', '0px'];
      el.style.setProperty('--dx', dx);
      el.style.setProperty('--dy', dy);
      // The flag dock below the globe is the accessible, crawlable version of these pins.
      el.tabIndex = -1;
      el.setAttribute('aria-hidden', 'true');
      el.innerHTML =
        `<span class="pe-flag"><img src="/flags/${p.flag}.svg" alt="" width="28" height="21"></span>` +
        `<span class="globe-pin-label">${p.label}</span>` +
        `<span class="globe-pin-tip pe-glass">Study in ${p.short} · Explore →</span>`;
      el.addEventListener('click', (ev) => {
        if (ev.metaKey || ev.ctrlKey || ev.shiftKey) return;
        ev.preventDefault();
        flyTo(p.slug);
      });
      anchor.appendChild(el);
      return anchor;
    },
    [flyTo],
  );

  return (
    <Globe
      ref={globeRef}
      width={size}
      height={size}
      animateIn={false}
      backgroundColor="rgba(0,0,0,0)"
      rendererConfig={{ antialias: typeof window === 'undefined' || window.devicePixelRatio < 2, alpha: true, powerPreference: 'high-performance' }}
      globeMaterial={material}
      showAtmosphere
      atmosphereColor="#39b6f0"
      atmosphereAltitude={0.2}
      onGlobeReady={runIntro}
      particlesData={land}
      particlesList="pts"
      particleLat="lat"
      particleLng="lng"
      particleAltitude={0.004}
      particlesSize={(d: object) => ((d as DotSet).kind === 'hi' ? 2.2 : 1.8)}
      particlesSizeAttenuation
      particlesTexture={(d: object) => dotTextures[(d as DotSet).kind]}
      arcsData={landed ? ARCS : []}
      arcColor={() => ['rgba(95,208,255,0.05)', 'rgba(95,208,255,0.95)']}
      arcStroke={0.6}
      arcAltitudeAutoScale={0.38}
      arcDashLength={reducedMotion ? 1 : 0.45}
      arcDashGap={reducedMotion ? 0 : 0.25}
      arcDashInitialGap={reducedMotion ? 0 : 1}
      arcDashAnimateTime={reducedMotion ? 0 : 2600}
      arcsTransitionDuration={0}
      htmlElementsData={landed ? PINS : []}
      htmlLat="lat"
      htmlLng="lng"
      htmlAltitude={0.03}
      htmlElement={makePin}
      htmlTransitionDuration={0}
      htmlElementVisibilityModifier={(el, visible) => {
        el.classList.toggle('is-hidden', !visible);
      }}
    />
  );
});

export default GlobeCanvas;
