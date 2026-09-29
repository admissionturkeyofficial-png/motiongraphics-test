import Link from 'next/link';
import { countries } from '@/content/countries';

// Static dotted world map with the eight destinations as links. Shown when WebGL is
// unavailable or the device is very low-end. The map covers latitudes 80°N to 70°S.
export function FallbackMap() {
  return (
    <div className="fallback-map">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/data/world-dots.svg" alt="" width={720} height={300} />
      <div className="fallback-pins">
      {countries.map((c) => (
        <Link
          key={c.slug}
          href={`/${c.slug}`}
          className="fallback-pin pe-glass"
          style={{ left: `${((c.pin.lng + 180) / 360) * 100}%`, top: `${((80 - c.pin.lat) / 150) * 100}%` }}
          aria-label={`Study in ${c.inName}`}
          tabIndex={-1}
        >
          <span className="pe-flag">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/flags/${c.flag}.svg`} alt="" width={24} height={18} />
          </span>
        </Link>
      ))}
      </div>
    </div>
  );
}
