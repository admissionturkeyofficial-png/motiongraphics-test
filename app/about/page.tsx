import Image from 'next/image';
import { Breadcrumbs } from '@/components/seo';
import { ButtonLink, CTABanner, SectionHead, StatCard } from '@/components/ui';
import { Icon } from '@/components/Icon';
import { home } from '@/content/home';
import { placeholder, site, waLink } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'About Prime Edge Overseas Education (Pvt Ltd)',
  description: 'Prime Edge Overseas Education is a Pakistan-based study abroad consultancy helping students with admission, visas and scholarships in 8 countries.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <section className="section page-hero" aria-labelledby="about-h1">
        <div className="wrap">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]} />
          <div className="about-grid">
            <div>
              <p className="pe-eyebrow">About us</p>
              <h1 id="about-h1" className="hero-title">A study abroad team that tells you the truth</h1>
              <p className="hero-sub">
                {site.legalName} helps Pakistani students get into universities abroad and prepare visa files that hold up. We work across eight destinations, from the UK and USA to Kyrgyzstan and Malaysia.
              </p>
              <p className="todo-block">TODO: founder story, team names and photos, office address and registration details (SECP number) from the client.</p>
            </div>
            <div className="about-logo pe-glass">
              <Image src="/brand/primeedge-logo-full.png" alt={site.legalName} width={360} height={313} />
            </div>
          </div>
        </div>
      </section>
      <section className="section-tight">
        <div className="wrap stats-row">
          <StatCard value={placeholder(site.stats.studentsPlaced, 'STUDENTS_PLACED')} label="Students placed" />
          <StatCard value={placeholder(site.stats.partnerUniversities, 'PARTNER_UNIVERSITIES')} label="Partner universities" />
          <StatCard value={site.stats.countries} label="Study destinations" />
          <StatCard value={placeholder(site.stats.yearEstablished, 'YEAR_ESTABLISHED')} label="Established" />
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="How we work" title="What you can expect from us" />
          <ul className="why-list why-list-grid">
            {home.why.map((w) => (
              <li key={w.title} className="pe-glass why-item">
                <span className="why-check" aria-hidden="true"><Icon name="check" size={18} /></span>
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section-tight">
        <div className="wrap">
          <CTABanner title="Meet a counsellor" text="Visit our office or talk to us on WhatsApp. The first assessment is free.">
            <ButtonLink href="/contact" variant="on-blue">Contact us</ButtonLink>
            <ButtonLink href={waLink('Hi Prime Edge, I would like to speak to a counsellor.')} variant="ghost-blue" icon="whatsapp">WhatsApp</ButtonLink>
          </CTABanner>
        </div>
      </section>
    </>
  );
}
