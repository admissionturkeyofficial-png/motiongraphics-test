import { Breadcrumbs, JsonLd } from '@/components/seo';
import { ButtonLink, CTABanner, SectionHead, ServiceCard, Steps } from '@/components/ui';
import { home } from '@/content/home';
import { services } from '@/content/services';
import { waLink } from '@/content/site';
import { pageMetadata, serviceSchema } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Study Abroad Services for Pakistani Students | Prime Edge',
  description: 'Counselling, university admission, English test guidance, scholarships, visa filing and accommodation help for Pakistani students going abroad.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <section className="section page-hero" aria-labelledby="svc-h1">
        <div className="wrap">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]} />
          <p className="pe-eyebrow">Services</p>
          <h1 id="svc-h1" className="hero-title">Study abroad services, from first question to first day on campus</h1>
          <p className="hero-sub">Use the full service or just the part you need. Every service starts with a free assessment.</p>
        </div>
      </section>
      <section className="section-tight">
        <div className="wrap card-grid">
          {services.map((s) => (
            <ServiceCard key={s.slug} icon={s.icon} title={s.name} href={`/services/${s.slug}`} linkLabel={s.cta}>
              {s.short}
            </ServiceCard>
          ))}
        </div>
        <JsonLd data={services.map((s) => serviceSchema({ name: s.name, description: s.metaDescription, path: `/services/${s.slug}` }))} />
      </section>
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="How it works" title="Five steps from first message to departure" />
          <Steps steps={home.steps} />
        </div>
      </section>
      <section className="section-tight">
        <div className="wrap">
          <CTABanner title="Start with a free assessment" text="Tell us your grades, budget and preferred country. We reply on WhatsApp.">
            <ButtonLink href="/#assessment" variant="on-blue">Free assessment</ButtonLink>
            <ButtonLink href={waLink('Hi Prime Edge, I would like to know more about your services.')} variant="ghost-blue" icon="whatsapp">Chat on WhatsApp</ButtonLink>
          </CTABanner>
        </div>
      </section>
    </>
  );
}
