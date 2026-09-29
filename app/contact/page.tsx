import { LeadForm } from '@/components/LeadForm';
import { Breadcrumbs } from '@/components/seo';
import { Icon } from '@/components/Icon';
import { hasRealValue, site, waLink } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Contact Prime Edge | WhatsApp +92 311 0600230',
  description: 'Contact Prime Edge Overseas Education on WhatsApp at +92 311 0600230 or +92 309 4585114, or send the form for a free study abroad assessment.',
  path: '/contact',
});

export default function ContactPage() {
  const a = site.address;
  return (
    <section className="section page-hero" aria-labelledby="contact-h1">
      <div className="wrap">
        <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]} />
        <div className="assess-grid">
          <div>
            <p className="pe-eyebrow">Contact</p>
            <h1 id="contact-h1" className="hero-title">Talk to a counsellor</h1>
            <p className="hero-sub">WhatsApp is the fastest way to reach us. You can also send the form and we’ll get back to you.</p>
            <ul className="contact-list">
              {site.whatsapp.map((w) => (
                <li key={w.number} className="pe-glass contact-item">
                  <span className="contact-icon wa" aria-hidden="true"><Icon name="whatsapp" size={22} /></span>
                  <div>
                    <b>WhatsApp / phone</b>
                    <a href={waLink('Hi Prime Edge, I would like a free study abroad assessment.', site.whatsapp.indexOf(w))} target="_blank" rel="noopener">{w.label}</a>
                  </div>
                </li>
              ))}
              <li className="pe-glass contact-item">
                <span className="contact-icon" aria-hidden="true"><Icon name="chat" size={22} /></span>
                <div>
                  <b>Email</b>
                  {hasRealValue(site.email) ? <a href={`mailto:${site.email}`}>{site.email}</a> : <span className="todo">{site.email}</span>}
                </div>
              </li>
              <li className="pe-glass contact-item">
                <span className="contact-icon" aria-hidden="true"><Icon name="home" size={22} /></span>
                <div>
                  <b>Office</b>
                  <address className={hasRealValue(a.street) ? '' : 'todo'}>
                    {a.street}, {a.city}, Pakistan
                  </address>
                  <span className={hasRealValue(site.hours) ? '' : 'todo'}>{site.hours}</span>
                </div>
              </li>
            </ul>
            {site.mapEmbedUrl && (
              <iframe className="map" title="Prime Edge office on Google Maps" src={site.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            )}
          </div>
          <LeadForm source="contact" title="Send us your details" />
        </div>
      </div>
    </section>
  );
}
