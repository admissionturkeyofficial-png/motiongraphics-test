import Link from 'next/link';
import { GlobeStage } from '@/components/globe/GlobeStage';
import { LeadForm } from '@/components/LeadForm';
import { ButtonLink, CTABanner, FAQList, Flag, SectionHead, ServiceCard, StatCard, Steps, TestimonialCard } from '@/components/ui';
import { Icon } from '@/components/Icon';
import { JsonLd } from '@/components/seo';
import { countries } from '@/content/countries';
import { home } from '@/content/home';
import { services } from '@/content/services';
import { placeholder, site, testimonials, waLink } from '@/content/site';
import { faqSchema, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: home.metaTitle, description: home.metaDescription, path: '/' });

export default function HomePage() {
  return (
    <>
      {/* 1. Hero with globe */}
      <section className="hero-home" aria-labelledby="home-h1">
        <div className="wrap hero-home-grid">
          <div className="hero-copy">
            <p className="pe-eyebrow">{home.preHeadline}</p>
            <h1 id="home-h1" className="hero-title">
              Study abroad from Pakistan: <span className="grad">8 destinations</span>, one trusted team
            </h1>
            <p className="hero-sub">{home.sub}</p>
            <div className="hero-actions">
              <ButtonLink href="#assessment" size="lg" icon="send">
                Free assessment
              </ButtonLink>
              <ButtonLink href={waLink('Hi Prime Edge, I want to study abroad. Can you assess my profile?')} variant="wa" size="lg" icon="whatsapp">
                WhatsApp us
              </ButtonLink>
            </div>
            <p className="hero-note">
              <Icon name="check" size={16} /> Free first assessment · Admission · Visa · Scholarships
            </p>
          </div>
          <GlobeStage />
        </div>
      </section>

      {/* 2. Trust bar */}
      <section className="section-tight" aria-label="Prime Edge in numbers">
        <div className="wrap stats-row">
          <StatCard value={placeholder(site.stats.studentsPlaced, 'STUDENTS_PLACED')} label="Students placed" />
          <StatCard value={placeholder(site.stats.partnerUniversities, 'PARTNER_UNIVERSITIES')} label="Partner universities" />
          <StatCard value={site.stats.countries} label="Study destinations" />
          <StatCard value={placeholder(site.stats.yearEstablished, 'YEAR_ESTABLISHED')} label="Established" />
        </div>
      </section>

      {/* 3. Services */}
      <section className="section" aria-labelledby="services-h">
        <div className="wrap">
          <SectionHead id="services-h" eyebrow="What we do" title="Everything you need, from shortlist to visa" intro="Six services, one team. Use one or all of them." />
          <div className="card-grid">
            {services.map((s) => (
              <ServiceCard key={s.slug} icon={s.icon} title={s.name} href={`/services/${s.slug}`} linkLabel={s.cta}>
                {s.short}
              </ServiceCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Prime Edge */}
      <section className="section section-tint" aria-labelledby="why-h">
        <div className="wrap why-grid">
          <SectionHead id="why-h" eyebrow="Why Prime Edge" title="Straight answers for students and parents" intro="Studying abroad is a big family decision. We keep it clear, honest and on schedule." />
          <ul className="why-list">
            {home.why.map((w) => (
              <li key={w.title} className="pe-glass why-item">
                <span className="why-check" aria-hidden="true">
                  <Icon name="check" size={18} />
                </span>
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. How it works */}
      <section className="section" aria-labelledby="how-h">
        <div className="wrap">
          <SectionHead id="how-h" eyebrow="How it works" title="Five steps from first message to departure" />
          <Steps steps={home.steps} />
        </div>
      </section>

      {/* 6. Destinations grid */}
      <section className="section" aria-labelledby="dest-h">
        <div className="wrap">
          <SectionHead id="dest-h" eyebrow="Destinations" title="Where do you want to study?" intro="Each country page covers costs, requirements, universities and visa steps." />
          <ul className="dest-grid">
            {countries.map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}`} className="dest-card pe-glass pe-shine">
                  <Flag code={c.flag} size={48} />
                  <span className="dest-body">
                    <span className="dest-name">Study in {c.inName}</span>
                    <span className="dest-line">{c.cardLine}</span>
                  </span>
                  <span className="dest-arrow" aria-hidden="true">
                    <Icon name="arrow" size={18} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="section section-tint" aria-labelledby="testi-h">
        <div className="wrap">
          <SectionHead id="testi-h" eyebrow="Student stories" title="What our students say" />
          <div className="card-grid">
            {testimonials.length > 0
              ? testimonials.map((t) => <TestimonialCard key={t.name} quote={t.quote} name={t.name} role={`${t.programme} · ${t.university}`} />)
              : [1, 2, 3].map((n) => (
                  <TestimonialCard key={n} placeholder quote="TODO: real testimonial from a Prime Edge student, used with written permission." name="TODO: student name" role="Programme · University · City" />
                ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="section" aria-labelledby="faq-h">
        <div className="wrap faq-wrap">
          <SectionHead id="faq-h" eyebrow="FAQ" title="Questions families ask us first" />
          <FAQList items={home.faqs} openFirst />
        </div>
        <JsonLd data={faqSchema(home.faqs)} />
      </section>

      {/* 9. Free assessment form */}
      <section className="section" id="assessment" aria-labelledby="assess-h">
        <div className="wrap assess-grid">
          <div>
            <SectionHead id="assess-h" eyebrow="Free assessment" title="Tell us about you. We’ll suggest realistic options." intro="It takes two minutes. A counsellor replies on WhatsApp, usually the same working day." />
            <ul className="assess-points">
              <li>
                <Icon name="check" size={18} /> Countries and universities that match your grades
              </li>
              <li>
                <Icon name="check" size={18} /> Estimated total cost for your family
              </li>
              <li>
                <Icon name="check" size={18} /> Scholarships you can apply for
              </li>
            </ul>
          </div>
          <LeadForm source="home" />
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <CTABanner title="Not sure where to start?" text="Send us a message on WhatsApp. Tell us your grades, budget and dream country, and we’ll take it from there.">
            <ButtonLink href="#assessment" variant="on-blue">
              Free assessment
            </ButtonLink>
            <ButtonLink href={waLink('Hi Prime Edge, I want to study abroad.')} variant="ghost-blue" icon="whatsapp">
              Chat on WhatsApp
            </ButtonLink>
          </CTABanner>
        </div>
      </section>
    </>
  );
}
