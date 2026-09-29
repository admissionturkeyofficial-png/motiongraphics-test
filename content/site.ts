// All editable business data lives here. Anything marked TODO must be supplied by the client
// before launch; placeholders render visibly on the site so nothing invented ever ships.

export const site = {
  name: 'Prime Edge Overseas Education',
  legalName: 'Prime Edge Overseas Education (Pvt Ltd)',
  shortName: 'Prime Edge',
  // TODO: set the production domain (used for canonical URLs, sitemap and Open Graph).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.primeedge.pk',
  tagline: 'Study abroad from Pakistan with one trusted team',
  description:
    'Prime Edge Overseas Education helps Pakistani students study in the UK, USA, Australia, Europe, Turkey, Kyrgyzstan, China and Malaysia: admission, visa filing and scholarships.',

  whatsapp: [
    { label: '+92 311 0600230', number: '923110600230' },
    { label: '+92 309 4585114', number: '923094585114' },
  ],
  phoneDisplay: '+92 311 0600230',
  phoneE164: '+923110600230',

  email: 'TODO: email address', // TODO: client email, e.g. info@primeedge.pk
  address: {
    street: 'TODO: street address', // TODO
    city: 'TODO: city', // TODO: e.g. Lahore
    region: 'Punjab', // TODO: confirm
    postalCode: '', // TODO
    country: 'PK',
  },
  hours: 'TODO: office hours', // TODO: e.g. Mon–Sat, 10:00–18:00
  foundedYear: null as number | null, // TODO: year established
  mapEmbedUrl: '', // TODO: Google Maps embed URL for the office

  social: {
    facebook: '', // TODO
    instagram: '', // TODO
    linkedin: '', // TODO
    youtube: '', // TODO
    tiktok: '', // TODO
  },

  // Trust-bar numbers. Leave null until the client supplies real figures;
  // null values render as a visible {{PLACEHOLDER}}.
  stats: {
    studentsPlaced: null as string | null, // TODO {{STUDENTS_PLACED}}
    partnerUniversities: null as string | null, // TODO {{PARTNER_UNIVERSITIES}}
    yearEstablished: null as string | null, // TODO {{YEAR_ESTABLISHED}}
    countries: '8', // true: the eight destinations on this site
  },

  // Lead form integration point. Set NEXT_PUBLIC_LEAD_ENDPOINT to a URL that accepts a JSON POST
  // (Formspree, a Google Apps Script web app writing to Sheets, or your CRM's webhook).
  // With no endpoint set, the form opens WhatsApp with the lead's details pre-filled instead.
  leadEndpoint: process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? '',
};

export type Testimonial = {
  name: string;
  programme: string;
  university: string;
  country: string; // landing page slug, e.g. 'study-in-uk'
  quote: string;
  photo?: string;
};

// Only real students who gave written permission. Empty until the client provides them;
// the page shows clearly marked placeholders in the meantime.
export const testimonials: Testimonial[] = []; // TODO: real testimonials

export function waLink(message: string, which = 0) {
  return `https://wa.me/${site.whatsapp[which].number}?text=${encodeURIComponent(message)}`;
}

export function placeholder(value: string | null, key: string) {
  return value ?? `{{${key}}}`;
}

export function hasRealValue(v: string | null | undefined) {
  return !!v && !v.startsWith('TODO');
}
