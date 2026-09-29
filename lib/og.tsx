import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };

const dataUri = async (rel: string, mime: string) => `data:${mime};base64,${(await readFile(path.join(process.cwd(), 'public', rel))).toString('base64')}`;

/** Brand-style Open Graph card: blue-glass ground, diagonal beams, flag + H1. */
export async function ogCard({ title, eyebrow, flag }: { title: string; eyebrow: string; flag?: string }) {
  const mark = await dataUri('brand/primeedge-mark-white.png', 'image/png');
  const flagSrc = flag ? await dataUri(`flags/${flag}.svg`, 'image/svg+xml') : null;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          color: '#fff',
          background: 'linear-gradient(135deg, #0b1c3e 0%, #156ba8 62%, #1b7ec1 100%)',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ position: 'absolute', top: -200, left: 420, width: 180, height: 1100, background: 'rgba(255,255,255,0.10)', transform: 'rotate(25deg)', display: 'flex' }} />
        <div style={{ position: 'absolute', top: -200, left: 700, width: 90, height: 1100, background: 'rgba(255,255,255,0.07)', transform: 'rotate(25deg)', display: 'flex' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mark} width={70} height={80} alt="" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: 1 }}>PRIME EDGE</div>
            <div style={{ fontSize: 20, opacity: 0.85 }}>Overseas Education</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            {flagSrc && (
              <div style={{ display: 'flex', borderRadius: 12, overflow: 'hidden', border: '3px solid rgba(255,255,255,0.8)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={flagSrc} width={96} height={72} alt="" />
              </div>
            )}
            <div style={{ fontSize: 26, textTransform: 'uppercase', letterSpacing: 4, opacity: 0.9 }}>{eyebrow}</div>
          </div>
          <div style={{ fontSize: title.length > 70 ? 52 : 60, fontWeight: 800, lineHeight: 1.1, maxWidth: 1060 }}>{title}</div>
        </div>
        <div style={{ fontSize: 22, opacity: 0.85 }}>WhatsApp +92 311 0600230 · Free assessment</div>
      </div>
    ),
    OG_SIZE,
  );
}
