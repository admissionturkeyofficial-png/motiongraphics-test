import type { Metadata } from 'next';
import { site } from '@/content/site';

export const absoluteUrl = (path = '/') => new URL(path, site.url).toString();

export function pageMetadata({ title, description, path, ogImage = '/opengraph-image' }: { title: string; description: string; path: string; ogImage?: string }): Metadata {
  // Routes with their own opengraph-image file (home, country pages) override this default.
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'en_PK',
      url: path,
      siteName: site.name,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  };
}

// ---------- JSON-LD builders ----------

const orgId = () => absoluteUrl('/#organization');

export function organizationSchema() {
  const a = site.address;
  const real = (v: string) => (v && !v.startsWith('TODO') ? v : undefined);
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    '@id': orgId(),
    name: site.legalName,
    alternateName: site.name,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/brand/primeedge-logo-full.png'),
    image: absoluteUrl('/brand/primeedge-logo-full.png'),
    description: site.description,
    telephone: site.phoneE164,
    ...(real(site.email) ? { email: site.email } : {}),
    address: {
      '@type': 'PostalAddress',
      ...(real(a.street) ? { streetAddress: a.street } : {}),
      ...(real(a.city) ? { addressLocality: a.city } : {}),
      ...(a.region ? { addressRegion: a.region } : {}),
      ...(a.postalCode ? { postalCode: a.postalCode } : {}),
      addressCountry: a.country,
    },
    areaServed: { '@type': 'Country', name: 'Pakistan' },
    contactPoint: site.whatsapp.map((w) => ({ '@type': 'ContactPoint', telephone: `+${w.number}`, contactType: 'customer service', availableLanguage: ['English', 'Urdu'] })),
    ...(site.foundedYear ? { foundingDate: String(site.foundedYear) } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function serviceSchema({ name, description, path, area }: { name: string; description: string; path: string; area?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: absoluteUrl(path),
    serviceType: name,
    provider: { '@id': orgId() },
    areaServed: { '@type': 'Country', name: 'Pakistan' },
    ...(area ? { audience: { '@type': 'EducationalAudience', educationalRole: 'student', geographicArea: { '@type': 'Place', name: area } } } : {}),
  };
}
