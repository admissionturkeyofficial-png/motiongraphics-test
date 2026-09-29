'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { countries } from '@/content/countries';
import { site, waLink } from '@/content/site';
import { Icon } from './Icon';

const NAV = [
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // mobile drawer
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMegaOpen(false);
        setOpen(false);
      }
    }
    function onClick(e: MouseEvent) {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, []);

  const isDestination = countries.some((c) => pathname === `/${c.slug}`);

  return (
    <header className="nav-wrap">
      <nav className="nav pe-glass" aria-label="Main">
        <Link href="/" className="nav-logo" aria-label={`${site.name}, home`}>
          <Image src="/brand/primeedge-mark.png" alt="" width={38} height={44} priority />
          <span className="nav-wordmark" aria-hidden="true">
            <b>PRIME</b>
            <b className="edge">EDGE</b>
            <small>Overseas Education</small>
          </span>
        </Link>

        <button className="nav-toggle" aria-expanded={open} aria-controls="nav-menu" onClick={() => setOpen((o) => !o)}>
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="burger" aria-hidden="true" />
        </button>

        <ul id="nav-menu" className={`nav-menu${open ? ' is-open' : ''}`}>
          <li
            ref={megaRef}
            className="nav-item has-mega"
            onMouseEnter={() => window.matchMedia('(hover:hover) and (min-width:961px)').matches && setMegaOpen(true)}
            onMouseLeave={() => window.matchMedia('(hover:hover) and (min-width:961px)').matches && setMegaOpen(false)}
          >
            <button className={`nav-link${isDestination ? ' is-active' : ''}`} aria-expanded={megaOpen} aria-controls="mega-destinations" onClick={() => setMegaOpen((o) => !o)}>
              Destinations
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div id="mega-destinations" className={`mega pe-glass${megaOpen ? ' is-open' : ''}`}>
              <p className="mega-title">Study abroad destinations</p>
              <ul className="mega-grid">
                {countries.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/${c.slug}`} className="mega-link">
                      <span className="pe-flag">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`/flags/${c.flag}.svg`} alt="" width={36} height={27} />
                      </span>
                      <span>
                        <b>Study in {c.inName}</b>
                        <small>{c.cardLine}</small>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          {NAV.map((n) => (
            <li key={n.href} className="nav-item">
              <Link href={n.href} className={`nav-link${pathname.startsWith(n.href) ? ' is-active' : ''}`} aria-current={pathname === n.href ? 'page' : undefined}>
                {n.label}
              </Link>
            </li>
          ))}
          <li className="nav-item nav-cta">
            <a className="pe-btn pe-btn-wa pe-btn-sm pe-shine" href={waLink('Hi Prime Edge, I would like a free study abroad assessment.')} target="_blank" rel="noopener">
              <Icon name="whatsapp" size={17} />
              <span>WhatsApp us</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
