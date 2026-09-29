import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { LeadForm } from '@/components/LeadForm';
import { Breadcrumbs, JsonLd } from '@/components/seo';
import { ButtonLink, CTABanner, FAQList, Flag, SectionHead, ServiceCard, StatCard, Steps, TestimonialCard, UniversityCard } from '@/components/ui';
import { Icon } from '@/components/Icon';
import { countries, countryBySlug, type Fact } from '@/content/countries';
import { serviceBySlug } from '@/content/services';
import { placeholder, site, testimonials, waLink } from '@/content/site';
import { faqSchema, pageMetadata, serviceSchema } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return countries.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = countryBySlug(slug);
  if (!c) return {};
  return pageMetadata({ title: c.metaTitle, description: c.metaDescription, path: `/${c.slug}`, ogImage: `/${c.slug}/opengraph-image` });
}

const LANDING_SERVICES = ['admission', 'visa', 'scholarships', 'accommodation'] as const;

function FactList({ items }: { items: Fact[] }) {
  return (
    <dl className="fact-list">
      {items.map((f) => (
        <div key={f.label} className="fact-row">
          <dt>{f.label}</dt>
          <dd>
            {f.value}
            {f.verify && (
              <abbr className="fact-flag" title="Indicative figure. We confirm the current amount during your assessment.">
                *
              </abbr>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = countryBySlug(slug);
  if (!c) notFound();

  const others = countries.filter((o) => o.slug !== c.slug);
  const countryTestimonials = testimonials.filter((t) => t.country === c.slug);

  return (
    <>
      {/* 2. Hero — above the fold, form in the hero */}
      <section className="hero-land" aria-labelledby="land-h1">
        <div className="wrap">
          <Breadcrumbs
            items={[
              { name: 'Home', path: '/' },
              { name: 'Destinations', path: '/#dest-h' },
              { name: `Study in ${c.inName}`, path: `/${c.slug}` },
            ]}
          />
          <div className="hero-land-grid">
            <div className="hero-copy">
              <div className="land-badge pe-glass">
                <Flag code={c.flag} size={40} />
                <span>{c.preHeadline}</span>
              </div>
              <h1 id="land-h1" className="hero-title land-title">
                {c.h1}
              </h1>
              <p className="hero-sub">{c.sub}</p>
              <div className="hero-actions">
                <ButtonLink href={waLink(c.waMessage)} variant="wa" icon="whatsapp">
                  WhatsApp a counsellor
                </ButtonLink>
                <ButtonLink href="#costs" variant="frost" iconRight="arrow">
                  See costs
                </ButtonLink>
              </div>
              <div className="land-visual pe-blue-glass" aria-label={`${c.name} at a glance`}>
                <div className="land-visual-flag">
                  <Flag code={c.flag} size={72} />
                </div>
                <dl>
                  {c.heroFacts.map((f) => (
                    <div key={f.label}>
                      <dt>{f.label}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div id="assessment" className="hero-form">
              <LeadForm defaultCountry={c.formLabel} title={`Free ${c.short} assessment`} compact source={c.slug} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Trust bar */}
      <section className="section-tight" aria-label="Prime Edge in numbers">
        <div className="wrap stats-row">
          <StatCard value={placeholder(site.stats.studentsPlaced, 'STUDENTS_PLACED')} label="Students placed" />
          <StatCard value={placeholder(site.stats.partnerUniversities, 'PARTNER_UNIVERSITIES')} label="Partner universities" />
          <StatCard value={placeholder(site.stats.yearEstablished, 'YEAR_ESTABLISHED')} label="Established" />
        </div>
      </section>

      {/* Overview (intro under the hero) */}
      <section className="section-tight" aria-labelledby="overview-h">
        <div className="wrap narrow">
          <h2 id="overview-h" className="section-title">
            Why study in {c.inName}?
          </h2>
          <p className="lead-text">{c.overview}</p>
        </div>
      </section>

      {/* 4. Services */}
      <section className="section" aria-labelledby="svc-h">
        <div className="wrap">
          <SectionHead id="svc-h" eyebrow="Our services" title={`How we help you study in ${c.inName}`} />
          <div className="card-grid card-grid-4">
            {LANDING_SERVICES.map((s) => {
              const svc = serviceBySlug(s)!;
              return (
                <ServiceCard key={s} icon={svc.icon} title={svc.name} href={`/services/${svc.slug}`} linkLabel="How it works">
                  {svc.short}
                </ServiceCard>
              );
            })}
          </div>
        </div>
        <JsonLd data={serviceSchema({ name: `Study in ${c.inName} consultancy`, description: c.metaDescription, path: `/${c.slug}`, area: c.name })} />
      </section>

      {/* 5. Cost & scholarships — answer cost first */}
      <section className="section section-tint" id="costs" aria-labelledby="cost-h">
        <div className="wrap">
          <SectionHead id="cost-h" eyebrow="Costs & scholarships" title={`How much does it cost to study in ${c.inName}?`} intro={c.costs.intro} />
          <div className="cost-grid">
            <div className="cost-card pe-glass">
              <h3>
                <Icon name="cap" size={20} /> Tuition
              </h3>
              <FactList items={c.costs.tuition} />
            </div>
            <div className="cost-card pe-glass">
              <h3>
                <Icon name="home" size={20} /> Living costs
              </h3>
              <FactList items={c.costs.living} />
            </div>
            <div className="cost-card pe-glass">
              <h3>
                <Icon name="visa" size={20} /> Visa & fixed fees
              </h3>
              <FactList items={c.costs.visaFees} />
            </div>
          </div>
          <p className="fact-note">
            <abbr className="fact-flag" title="Indicative">*</abbr> Indicative figures. Fees and visa rules change, so we confirm current amounts for your course during your assessment. Official sources:{' '}
            {c.costs.sources.map((s, i) => (
              <span key={s.url}>
                <a href={s.url} target="_blank" rel="noopener nofollow">
                  {s.label}
                </a>
                {i < c.costs.sources.length - 1 ? ', ' : '.'}
              </span>
            ))}
          </p>
          <h3 className="sub-title">Scholarships to look at</h3>
          <div className="card-grid">
            {c.costs.scholarships.map((s) => (
              <article key={s.name} className="pe-card pe-glass scholarship">
                <span className="scholarship-icon" aria-hidden="true">
                  <Icon name="award" size={20} />
                </span>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Eligibility / requirements */}
      <section className="section" aria-labelledby="req-h">
        <div className="wrap">
          <SectionHead id="req-h" eyebrow="Requirements" title={`Requirements to study in ${c.inName}`} />
          <div className="req-grid">
            <div className="req-card pe-glass">
              <h3>Documents you’ll need</h3>
              <ul className="check-list">
                {c.requirements.documents.map((d) => (
                  <li key={d}>
                    <Icon name="check" size={16} /> {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="req-side">
              <div className="req-card pe-glass">
                <h3>Tests</h3>
                <ul className="check-list">
                  {c.requirements.tests.map((d) => (
                    <li key={d}>
                      <Icon name="check" size={16} /> {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="req-card pe-glass">
                <h3>Academic requirements</h3>
                <p>{c.requirements.academics}</p>
              </div>
              <div className="req-card pe-glass">
                <h3>Intakes and deadlines</h3>
                <div className="chip-row">
                  {c.requirements.intakes.map((i) => (
                    <span key={i} className="pe-chip">
                      {i}
                    </span>
                  ))}
                </div>
                <p>{c.requirements.deadlines}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Destinations / universities */}
      <section className="section section-tint" aria-labelledby="dest-h2">
        <div className="wrap">
          <SectionHead id="dest-h2" eyebrow="Where to study" title={c.destinations.title} intro={c.destinations.intro.replace(/\s*TODO:.*$/, '')} />
          <div className="card-grid">
            {c.destinations.items.map((d) => (
              <UniversityCard key={d.name} initials={d.initials} name={d.name} chips={d.chips} href="#assessment" linkLabel="Ask about this option">
                {d.text}
              </UniversityCard>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Process */}
      <section className="section" aria-labelledby="process-h">
        <div className="wrap">
          <SectionHead id="process-h" eyebrow="Process" title={`Your path to ${c.inName}, step by step`} />
          <Steps steps={c.process} />
        </div>
      </section>

      {/* 9. Why us */}
      <section className="section section-tint" aria-labelledby="whyus-h">
        <div className="wrap">
          <SectionHead id="whyus-h" eyebrow="Why Prime Edge" title={`Why students choose us for ${c.inName}`} />
          <div className="card-grid">
            {c.whyUs.map((w) => (
              <article key={w.title} className="pe-card pe-glass">
                <span className="why-check" aria-hidden="true">
                  <Icon name="check" size={18} />
                </span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Testimonials */}
      <section className="section" aria-labelledby="t-h">
        <div className="wrap">
          <SectionHead id="t-h" eyebrow="Student stories" title={`Students we helped with ${c.inName}`} />
          <div className="card-grid">
            {countryTestimonials.length > 0
              ? countryTestimonials.map((t) => <TestimonialCard key={t.name} quote={t.quote} name={t.name} role={`${t.programme} · ${t.university}`} />)
              : [1, 2].map((n) => (
                  <TestimonialCard key={n} placeholder quote={`TODO: real testimonial from a student Prime Edge placed in ${c.inName}, with written permission.`} name="TODO: student name" role="Programme · University · City" />
                ))}
          </div>
        </div>
      </section>

      {/* 11. FAQ */}
      <section className="section section-tint" aria-labelledby="faq-h2">
        <div className="wrap faq-wrap">
          <SectionHead id="faq-h2" eyebrow="FAQ" title={`Studying in ${c.inName}: your questions answered`} />
          <FAQList items={c.faqs} openFirst />
        </div>
        <JsonLd data={faqSchema(c.faqs)} />
      </section>

      {/* 12. Final CTA */}
      <section className="section-tight">
        <div className="wrap">
          <CTABanner title={c.cta.title} text={c.cta.text}>
            <ButtonLink href={waLink(c.waMessage)} variant="on-blue" icon="whatsapp">
              WhatsApp us now
            </ButtonLink>
            <ButtonLink href="#assessment" variant="ghost-blue">
              Back to the form
            </ButtonLink>
          </CTABanner>
        </div>
      </section>

      {/* Other destinations strip */}
      <section className="section-tight other-dest" aria-labelledby="other-h">
        <div className="wrap">
          <h2 id="other-h" className="other-title">
            Other destinations
          </h2>
          <ul className="chip-strip">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/${o.slug}`} className="pe-flag-chip pe-glass pe-shine">
                  <Flag code={o.flag} size={32} />
                  Study in {o.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
