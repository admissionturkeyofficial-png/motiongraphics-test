import Image from 'next/image';
import Link from 'next/link';
import { countries } from '@/content/countries';
import { services } from '@/content/services';
import { hasRealValue, site, waLink } from '@/content/site';
import { Icon } from './Icon';

export function Footer() {
  const socials = Object.entries(site.social).filter(([, url]) => url);
  const addr = site.address;
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Image src="/brand/primeedge-logo-full-white.png" alt={site.legalName} width={200} height={174} />
          <p>Admission, visa filing and scholarship support for Pakistani students going abroad.</p>
          {socials.length > 0 && (
            <ul className="footer-social">
              {socials.map(([name, url]) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener" className="footer-link">
                    {name[0].toUpperCase() + name.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="footer-h">Destinations</h2>
          <ul className="footer-list">
            {countries.map((c) => (
              <li key={c.slug}>
                <Link className="footer-link" href={`/${c.slug}`}>
                  Study in {c.inName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="footer-h">Services</h2>
          <ul className="footer-list">
            {services.map((s) => (
              <li key={s.slug}>
                <Link className="footer-link" href={`/services/${s.slug}`}>
                  {s.name}
                </Link>
              </li>
            ))}
            <li>
              <Link className="footer-link" href="/about">
                About us
              </Link>
            </li>
            <li>
              <Link className="footer-link" href="/blog">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="footer-h">Contact</h2>
          <address className="footer-nap">
            <b>{site.legalName}</b>
            <span className={hasRealValue(addr.street) ? '' : 'todo'}>{addr.street}</span>
            <span className={hasRealValue(addr.city) ? '' : 'todo'}>
              {addr.city}, Pakistan
            </span>
            {site.whatsapp.map((w) => (
              <a key={w.number} className="footer-link" href={`tel:+${w.number}`}>
                {w.label}
              </a>
            ))}
            {hasRealValue(site.email) ? (
              <a className="footer-link" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            ) : (
              <span className="todo">{site.email}</span>
            )}
          </address>
          <a className="pe-btn pe-btn-wa pe-btn-sm pe-shine footer-wa" href={waLink('Hi Prime Edge, I have a question about studying abroad.')} target="_blank" rel="noopener">
            <Icon name="whatsapp" size={17} /> <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>
          © {new Date().getFullYear()} {site.legalName}. All rights reserved.
        </p>
        <p>
          <Link className="footer-link" href="/privacy-policy">
            Privacy policy
          </Link>
        </p>
      </div>
    </footer>
  );
}
