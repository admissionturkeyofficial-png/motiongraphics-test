import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon } from './Icon';
import type { IconName } from '@/content/services';

type Variant = 'primary' | 'frost' | 'outline' | 'wa' | 'on-blue' | 'ghost-blue';

export function ButtonLink({
  href,
  variant = 'primary',
  size,
  icon,
  iconRight,
  children,
  external,
  className,
  ariaLabel,
}: {
  href: string;
  variant?: Variant;
  size?: 'sm' | 'lg';
  icon?: IconName;
  iconRight?: IconName;
  children: ReactNode;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const shine = variant === 'primary' || variant === 'frost' || variant === 'wa';
  const cls = ['pe-btn', `pe-btn-${variant}`, size && `pe-btn-${size}`, shine && 'pe-shine', className].filter(Boolean).join(' ');
  const inner = (
    <>
      {icon && <Icon name={icon} size={18} />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} size={16} />}
    </>
  );
  if (external || href.startsWith('http')) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener" aria-label={ariaLabel}>
        {inner}
      </a>
    );
  }
  return (
    <Link className={cls} href={href} aria-label={ariaLabel}>
      {inner}
    </Link>
  );
}

export function SectionHead({ eyebrow, title, intro, id, center }: { eyebrow?: string; title: string; intro?: ReactNode; id?: string; center?: boolean }) {
  return (
    <div className={center ? 'section-head center' : 'section-head'}>
      {eyebrow && <p className="pe-eyebrow">{eyebrow}</p>}
      <h2 id={id} className="section-title">
        {title}
      </h2>
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  );
}

export function ServiceCard({ icon, title, children, href, linkLabel }: { icon: IconName; title: string; children: ReactNode; href?: string; linkLabel?: string }) {
  return (
    <article className="pe-card pe-glass pe-shine">
      <div className="pe-icon-tile">
        <Icon name={icon} size={26} strokeWidth={2} />
      </div>
      <h3>{title}</h3>
      <p>{children}</p>
      {href && (
        <Link className="pe-link" href={href}>
          {linkLabel ?? 'Learn more'} <Icon name="arrow" size={15} />
        </Link>
      )}
    </article>
  );
}

export function UniversityCard({ initials, name, chips, children, href, linkLabel }: { initials: string; name: string; chips?: string[]; children?: ReactNode; href?: string; linkLabel?: string }) {
  return (
    <article className="pe-card pe-glass pe-uni pe-shine">
      <div className="pe-uni-visual pe-blue-glass">
        <div className="pe-uni-mark" aria-hidden="true">
          {initials}
        </div>
      </div>
      <div className="pe-uni-body">
        <h3>{name}</h3>
        {chips && chips.length > 0 && (
          <div className="pe-uni-meta">
            {chips.map((c) => (
              <span key={c} className="pe-chip">
                {c}
              </span>
            ))}
          </div>
        )}
        {children && <p>{children}</p>}
        {href && (
          <Link className="pe-link" href={href}>
            {linkLabel ?? 'Ask about this option'} <Icon name="arrow" size={15} />
          </Link>
        )}
      </div>
    </article>
  );
}

export function StatCard({ value, label }: { value: string; label: string }) {
  const isPlaceholder = value.startsWith('{{');
  return (
    <div className={`pe-stat pe-glass pe-shine${isPlaceholder ? ' is-placeholder' : ''}`}>
      <div className="pe-stat-num">{value}</div>
      <div className="pe-stat-label">{label}</div>
    </div>
  );
}

export function TestimonialCard({ quote, name, role, placeholder }: { quote: string; name: string; role: string; placeholder?: boolean }) {
  const initials = placeholder
    ? '?'
    : name
        .split(' ')
        .map((p) => p[0])
        .slice(0, 2)
        .join('');
  return (
    <figure className={`pe-card pe-glass pe-testi${placeholder ? ' is-placeholder' : ''}`}>
      <blockquote>{quote}</blockquote>
      <figcaption>
        <div className="pe-avatar" aria-hidden="true">
          {initials}
        </div>
        <div>
          <div className="pe-testi-name">{name}</div>
          <div className="pe-testi-role">{role}</div>
        </div>
      </figcaption>
    </figure>
  );
}

export function CTABanner({ title, text, children }: { title: string; text?: string; children: ReactNode }) {
  return (
    <div className="pe-cta pe-blue-glass pe-shine">
      <div>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      <div className="pe-cta-actions">{children}</div>
    </div>
  );
}

export function FAQList({ items, openFirst }: { items: { q: string; a: string }[]; openFirst?: boolean }) {
  return (
    <div className="pe-faq pe-glass">
      {items.map((it, i) => (
        <details key={it.q} open={openFirst && i === 0}>
          <summary>
            <h3>{it.q}</h3>
          </summary>
          <div className="pe-faq-a">
            <p>{it.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

export function Flag({ code, size = 36 }: { code: string; size?: number }) {
  // Local flag-icons SVGs (public/flags). Decorative: the country name always sits next to it.
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <span className="pe-flag" style={{ width: size, height: Math.round(size * 0.75) }}>
      <img src={`/flags/${code}.svg`} alt="" width={size} height={Math.round(size * 0.75)} loading="lazy" decoding="async" />
    </span>
  );
}

export function Steps({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="steps">
      {steps.map((s, i) => (
        <li key={s.title} className="step pe-glass">
          <span className="step-num" aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
