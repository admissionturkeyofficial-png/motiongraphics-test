import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { LeadForm } from '@/components/LeadForm';
import { Breadcrumbs, JsonLd } from '@/components/seo';
import { ButtonLink, FAQList, Flag, SectionHead, Steps } from '@/components/ui';
import { Icon } from '@/components/Icon';
import { countries } from '@/content/countries';
import { serviceBySlug, services } from '@/content/services';
import { waLink } from '@/content/site';
import { faqSchema, pageMetadata, serviceSchema } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();
  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      <section className="section page-hero" aria-labelledby="s-h1">
        <div className="wrap">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: s.name, path: `/services/${s.slug}` }]} />
          <div className="svc-hero-grid">
            <div>
              <div className="pe-icon-tile">
                <Icon name={s.icon} size={26} strokeWidth={2} />
              </div>
              <h1 id="s-h1" className="hero-title">{s.h1}</h1>
              <p className="hero-sub">{s.intro}</p>
              <div className="hero-actions">
                <ButtonLink href={waLink(`Hi Prime Edge, I'd like help with: ${s.name}.`)} variant="wa" icon="whatsapp">WhatsApp us</ButtonLink>
              </div>
            </div>
            <div className="req-card pe-glass">
              <h2 className="card-h">What’s included</h2>
              <ul className="check-list">
                {s.includes.map((i) => (
                  <li key={i}><Icon name="check" size={16} /> {i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <JsonLd data={serviceSchema({ name: s.name, description: s.metaDescription, path: `/services/${s.slug}` })} />
      </section>

      <section className="section-tight">
        <div className="wrap">
          <SectionHead eyebrow="How it works" title={`${s.name}: the steps`} />
          <Steps steps={s.steps} />
        </div>
      </section>

      <section className="section section-tint">
        <div className="wrap">
          <SectionHead eyebrow="By destination" title="Choose your country" intro="Each destination has its own rules. Pick one to see costs and requirements." />
          <ul className="chip-strip wrap-strip">
            {countries.map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}`} className="pe-flag-chip pe-glass pe-shine">
                  <Flag code={c.flag} size={32} /> Study in {c.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap faq-wrap">
          <SectionHead eyebrow="FAQ" title="Common questions" />
          <FAQList items={s.faqs} openFirst />
        </div>
        <JsonLd data={faqSchema(s.faqs)} />
      </section>

      <section className="section" id="assessment">
        <div className="wrap assess-grid">
          <div>
            <SectionHead eyebrow="Free assessment" title="Get started" intro="Send your details and a counsellor will reply on WhatsApp." />
            <p className="other-services">
              Other services:{' '}
              {others.map((o, i) => (
                <span key={o.slug}>
                  <Link href={`/services/${o.slug}`}>{o.name}</Link>
                  {i < others.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </p>
          </div>
          <LeadForm source={`service-${s.slug}`} />
        </div>
      </section>
    </>
  );
}
