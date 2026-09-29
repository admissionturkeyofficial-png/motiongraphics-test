import { Breadcrumbs } from '@/components/seo';
import { site } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Privacy Policy | Prime Edge Overseas Education',
  description: 'How Prime Edge Overseas Education collects, uses and protects the personal information you share through our website and WhatsApp.',
  path: '/privacy-policy',
});

export default function PrivacyPage() {
  return (
    <section className="section page-hero" aria-labelledby="pp-h1">
      <div className="wrap narrow prose">
        <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Privacy policy', path: '/privacy-policy' }]} />
        <h1 id="pp-h1" className="hero-title">Privacy policy</h1>
        <p className="todo-block">TODO: have this policy reviewed by the client’s legal adviser and add the effective date.</p>
        <h2>Who we are</h2>
        <p>{site.legalName} (“Prime Edge”, “we”) is a study abroad consultancy in Pakistan. This policy explains how we handle the personal information you share with us.</p>
        <h2>What we collect</h2>
        <p>When you fill in our assessment form or message us, we collect your name, phone or WhatsApp number, email address, target country, qualification, preferred intake and any message you choose to send. When you become a client, we also handle documents you give us, such as your passport, transcripts and financial documents.</p>
        <h2>How we use it</h2>
        <ul>
          <li>To contact you about your enquiry and give you study abroad advice.</li>
          <li>To prepare university, scholarship and visa applications you ask us to make.</li>
          <li>To keep records required by law or by our partner institutions.</li>
        </ul>
        <p>We do not sell your personal information.</p>
        <h2>Who we share it with</h2>
        <p>With your consent, we share your information with the universities, scholarship bodies and visa authorities you apply to. We may use service providers (for example email, form or messaging tools) who process data on our behalf.</p>
        <h2>How long we keep it</h2>
        <p>We keep enquiry details for as long as needed to respond and follow up, and client files for as long as required by law or our partner agreements.</p>
        <h2>Your choices</h2>
        <p>You can ask us to show, correct or delete the information we hold about you, or to stop contacting you, by messaging us on WhatsApp at {site.whatsapp[0].label}.</p>
        <h2>Cookies</h2>
        <p>This website does not use advertising cookies. If analytics are added later, this section will be updated.</p>
      </div>
    </section>
  );
}
