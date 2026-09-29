'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { countries } from '@/content/countries';
import type { GlobeHandle } from './GlobeCanvas';
import { FallbackMap } from './FallbackMap';

const GlobeCanvas = dynamic(() => import('./GlobeCanvas'), { ssr: false });

type Mode = 'poster' | 'globe' | 'fallback';

function canUseWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
}

function isLowEnd() {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  return (nav.hardwareConcurrency ?? 8) <= 2 || (nav.deviceMemory ?? 8) <= 1 || nav.connection?.saveData === true;
}

export function GlobeStage() {
  const [mode, setMode] = useState<Mode>('poster');
  const [ready, setReady] = useState(false);
  const [size, setSize] = useState(560);
  const [reducedMotion, setReducedMotion] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const globe = useRef<GlobeHandle>(null);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (!canUseWebGL() || isLowEnd()) {
      setMode('fallback');
      return;
    }
    // Let the hero text and CTAs paint first (they are the LCP), then pull in three.js.
    const start = () => setMode('globe');
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(start, { timeout: 1500 });
    else window.setTimeout(start, 300);
  }, []);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setSize(Math.round(entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="globe-stage">
      <div className={`globe-box${ready ? ' is-ready' : ''}${mode === 'fallback' ? ' is-fallback' : ''}`} ref={boxRef}>
        {mode !== 'fallback' && <div className="globe-glow" aria-hidden="true" />}
        {mode !== 'fallback' && <div className="globe-ring" aria-hidden="true" />}
        {mode !== 'fallback' && <div className="globe-poster" aria-hidden="true" />}
        {mode === 'globe' && (
          <div className="globe-canvas" aria-hidden="true">
            <GlobeCanvas ref={globe} size={size} reducedMotion={reducedMotion} onReady={() => setReady(true)} />
          </div>
        )}
        {mode === 'fallback' && <FallbackMap />}
      </div>

      <nav className="flag-dock" aria-label="Study destinations">
        <p className="flag-dock-label">From Pakistan to the world. Pick a destination:</p>
        <ul>
          {countries.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/${c.slug}`}
                className="pe-flag-chip pe-glass pe-shine"
                onMouseEnter={() => globe.current?.focus(c.slug)}
                onFocus={() => globe.current?.focus(c.slug)}
              >
                <span className="pe-flag">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/flags/${c.flag}.svg`} alt="" width={36} height={27} />
                </span>
                <span className="visually-hidden">Study in </span>
                {c.short}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
