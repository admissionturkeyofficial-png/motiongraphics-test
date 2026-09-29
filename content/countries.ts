// One data file drives all eight landing pages (app/[slug]/page.tsx).
//
// FACT POLICY: figures below are indicative ranges or rules taken from official sources as last
// known. Every item with `verify: true` must be re-checked against the linked official source
// before launch and whenever a new intake opens. Rules change often. See README "Client TODOs".

export type Fact = { label: string; value: string; verify?: boolean };
export type Faq = { q: string; a: string };
export type Card = { name: string; initials: string; chips: string[]; text: string };
export type Step = { title: string; text: string };

export type Country = {
  slug: string;
  name: string; // "United Kingdom"
  short: string; // "UK" — used in "Study in the UK"
  inName: string; // "the UK" — reads naturally after "in"
  flag: string; // flag-icons code, /public/flags/<flag>.svg
  formLabel: string; // value pre-selected in the lead form
  pin: { lat: number; lng: number };
  highlightIds: string[]; // ISO 3166 numeric ids lit up on the globe (mirrored in scripts/build-globe-data.mjs — rerun npm run globe-data after changing)
  metaTitle: string; // <= 60 chars
  metaDescription: string; // <= 155 chars
  preHeadline: string;
  h1: string;
  sub: string;
  cardLine: string; // one-line value prop for the destinations grid
  heroFacts: Fact[];
  overview: string;
  costs: {
    intro: string;
    tuition: Fact[];
    living: Fact[];
    visaFees: Fact[];
    scholarships: { name: string; text: string }[];
    sources: { label: string; url: string }[];
  };
  requirements: {
    documents: string[];
    tests: string[];
    academics: string;
    intakes: string[];
    deadlines: string;
  };
  destinations: { title: string; intro: string; items: Card[] };
  process: Step[];
  whyUs: { title: string; text: string }[]; // TODO: client to confirm every claim is accurate
  faqs: Faq[];
  cta: { title: string; text: string };
  waMessage: string;
};

// Schengen members (ISO numeric) lit up as one group for the Europe page.
export const SCHENGEN_IDS = [
  '040', '056', '100', '191', '203', '208', '233', '246', '250', '276', '300', '348', '352', '380', '428',
  '438', '440', '442', '470', '528', '578', '616', '620', '642', '703', '705', '724', '752', '756',
];

export const PAKISTAN = { name: 'Lahore', lat: 31.52, lng: 74.36 };

export const countries: Country[] = [
  // ---------------------------------------------------------------- UK
  {
    slug: 'study-in-uk',
    name: 'United Kingdom',
    short: 'UK',
    inName: 'the UK',
    flag: 'gb',
    formLabel: 'United Kingdom',
    pin: { lat: 52.5, lng: -1.5 },
    highlightIds: ['826'],
    metaTitle: 'Study in the UK from Pakistan | CAS & Visa Help',
    metaDescription: 'Study in the UK from Pakistan: university admission, CAS, Student visa filing and scholarships. Get a free assessment from Prime Edge on WhatsApp.',
    preHeadline: 'UK universities · September & January intakes',
    h1: 'Study in the UK from Pakistan: admission, CAS and Student visa support',
    sub: 'One-year master’s degrees, three-year bachelor’s degrees and a post-study work route. We help you choose the right university, secure your CAS and prepare a visa file that holds up.',
    cardLine: 'Short degrees, global names and a post-study work route.',
    heroFacts: [
      { label: 'Master’s length', value: 'Usually 1 year' },
      { label: 'Main intakes', value: 'September · January' },
      { label: 'Post-study work', value: 'Graduate Route', verify: true },
    ],
    overview:
      'The UK suits students who want a well-known degree in less time. Most taught master’s courses finish in twelve months, which keeps the total cost of tuition and living lower than in many other countries. After you graduate, the Graduate Route lets you stay and work for a set period without a job offer.',
    costs: {
      intro: 'Your two big costs are tuition and living expenses. The visa also has fixed government fees, including the Immigration Health Surcharge, which you pay upfront.',
      tuition: [
        { label: 'Bachelor’s (per year)', value: '£13,000 – £30,000+', verify: true },
        { label: 'Taught master’s (full course)', value: '£14,000 – £35,000', verify: true },
        { label: 'Medicine & MBA', value: 'Higher; ask for a quote', verify: true },
      ],
      living: [
        { label: 'Funds to show: London', value: '£1,483 per month (up to 9 months)', verify: true },
        { label: 'Funds to show: outside London', value: '£1,136 per month (up to 9 months)', verify: true },
      ],
      visaFees: [
        { label: 'Student visa application', value: '£524', verify: true },
        { label: 'Immigration Health Surcharge', value: '£776 per year of visa', verify: true },
        { label: 'TB test (required for Pakistani applicants)', value: 'Paid at an approved clinic', verify: true },
      ],
      scholarships: [
        { name: 'Chevening Scholarships', text: 'UK government awards for one-year master’s degrees, covering tuition and living costs. Applications usually open in August for the following year.' },
        { name: 'Commonwealth Scholarships', text: 'For master’s and PhD study, open to citizens of eligible Commonwealth countries including Pakistan.' },
        { name: 'University merit awards', text: 'Many universities give automatic or competitive fee discounts to international students with strong grades.' },
      ],
      sources: [
        { label: 'GOV.UK: Student visa', url: 'https://www.gov.uk/student-visa' },
        { label: 'GOV.UK: Immigration Health Surcharge', url: 'https://www.gov.uk/healthcare-immigration-application' },
        { label: 'Chevening', url: 'https://www.chevening.org/' },
      ],
    },
    requirements: {
      documents: [
        'Valid passport',
        'CAS (Confirmation of Acceptance for Studies) from a licensed student sponsor',
        'Bank statements showing tuition balance plus living funds, held for 28 consecutive days',
        'Academic transcripts and degrees used to get your offer',
        'TB test certificate from an approved clinic in Pakistan',
        'ATAS certificate if your subject needs one (some science and engineering postgraduate courses)',
      ],
      tests: [
        'IELTS for UKVI or another Secure English Language Test when your university or course asks for one',
        'Many universities accept PTE Academic, or an English-medium waiver for degree-level study',
      ],
      academics: 'Undergraduate entry usually needs strong A-Level or FSc results, sometimes with a foundation year. Postgraduate entry usually needs a relevant bachelor’s degree; the grade required depends on the university.',
      intakes: ['September (largest choice of courses)', 'January', 'May (limited courses)'],
      deadlines: 'Apply 6 to 9 months before your intake. Popular courses and scholarships fill early.',
    },
    destinations: {
      title: 'Where Pakistani students study in the UK',
      intro: 'Each city has a different cost of living and a different mix of universities. We help you weigh both.',
      items: [
        { name: 'London', initials: 'LN', chips: ['Higher living costs', 'Business', 'Law'], text: 'The widest choice of universities and part-time work, with the highest rent.' },
        { name: 'Manchester', initials: 'MA', chips: ['Student city', 'Engineering'], text: 'A large student population and lower costs than London.' },
        { name: 'Birmingham', initials: 'BH', chips: ['Central England', 'Health'], text: 'Several universities and a large South Asian community.' },
        { name: 'Glasgow', initials: 'GL', chips: ['Scotland', 'Research'], text: 'Historic universities; Scottish bachelor’s degrees usually take four years.' },
      ],
    },
    process: [
      { title: 'Free assessment', text: 'We review your grades, English level and budget.' },
      { title: 'Shortlist and apply', text: 'Three to six universities, with SOP and document review.' },
      { title: 'Offer and CAS', text: 'Meet your offer conditions, pay the deposit and receive your CAS.' },
      { title: 'Visa file', text: 'TB test, funds held for 28 days, IHS payment and online application.' },
      { title: 'Fly out', text: 'Pre-departure briefing and accommodation guidance.' },
    ],
    whyUs: [
      { title: 'We check your funds early', text: 'The 28-day bank balance rule causes many refusals. We plan it with your family before you apply.' },
      { title: 'CAS interview practice', text: 'Many universities interview applicants before issuing a CAS. We practise with you.' },
      { title: 'Attestation help', text: 'We guide you through HEC and IBCC attestation when your university needs it.' },
    ],
    faqs: [
      { q: 'How much does it cost to study in the UK from Pakistan?', a: 'Plan for tuition of roughly £13,000 to £35,000 a year depending on the course, plus the living funds the visa requires: £1,483 a month in London or £1,136 outside London for up to nine months. Add the visa fee and the Immigration Health Surcharge. We confirm the current figures for your course during your assessment.' },
      { q: 'Can I study in the UK without IELTS?', a: 'Sometimes. Many universities accept PTE or an English-medium letter for degree-level study. If your course or visa route needs a Secure English Language Test, you will need IELTS for UKVI or another approved test.' },
      { q: 'What is a CAS and when do I get it?', a: 'A CAS is an electronic reference number your university issues once you have an unconditional offer and have paid any required deposit. You need it before you can apply for the Student visa.' },
      { q: 'Can I work while studying in the UK?', a: 'Degree-level students can usually work up to 20 hours a week in term time and full time in official vacations. Your visa sticker and BRP or eVisa state your exact limit.' },
      { q: 'How long is the Graduate Route?', a: 'It has been two years for bachelor’s and master’s graduates and three for PhD graduates. The UK government has announced a cut to 18 months for new applications from 2027, so check the current rule before you plan.' },
      { q: 'Can I bring my family on a UK Student visa?', a: 'Since January 2024 most taught master’s students cannot bring dependants. PhD and research master’s students usually still can.' },
      { q: 'When should I apply for the September intake?', a: 'Start between November and February. That leaves time for offers, the CAS, the 28-day funds rule and the visa itself.' },
    ],
    cta: { title: 'Planning the UK for September or January?', text: 'Send us your grades and budget. A counsellor replies on WhatsApp with realistic university options.' },
    waMessage: 'Hi Prime Edge, I want to study in the UK. Can you assess my profile?',
  },

  // ---------------------------------------------------------------- USA
  {
    slug: 'study-in-usa',
    name: 'United States',
    short: 'USA',
    inName: 'the USA',
    flag: 'us',
    formLabel: 'USA',
    pin: { lat: 39.5, lng: -98.5 },
    highlightIds: ['840'],
    metaTitle: 'Study in the USA from Pakistan | F-1 Visa & I-20',
    metaDescription: 'Study in the USA from Pakistan: university applications, I-20, SEVIS, DS-160 and F-1 visa interview preparation. Free assessment on WhatsApp.',
    preHeadline: 'US universities · Fall & Spring intakes',
    h1: 'Study in the USA: F-1 visa, I-20 and university admissions guidance',
    sub: 'Flexible degrees, research universities and OPT work experience after you graduate. We help you build a strong application, get your I-20 and walk into your visa interview prepared.',
    cardLine: 'Flexible degrees, research and OPT work experience.',
    heroFacts: [
      { label: 'Bachelor’s length', value: '4 years' },
      { label: 'Main intakes', value: 'Fall · Spring' },
      { label: 'Work after study', value: 'OPT, STEM OPT', verify: true },
    ],
    overview:
      'American universities let you explore subjects before choosing a major, and many offer scholarships or assistantships to strong applicants. The F-1 visa is decided at an interview, so your paperwork and your answers both matter. After graduation, Optional Practical Training (OPT) lets you work in your field.',
    costs: {
      intro: 'Costs vary more in the USA than anywhere else. A community college, a state university and a private university can differ by tens of thousands of dollars a year. Financial aid can close the gap.',
      tuition: [
        { label: 'Community college (per year)', value: '$8,000 – $15,000', verify: true },
        { label: 'Public university (per year)', value: '$20,000 – $45,000', verify: true },
        { label: 'Private university (per year)', value: '$35,000 – $65,000+', verify: true },
      ],
      living: [
        { label: 'Living costs (per year)', value: '$12,000 – $25,000 depending on city', verify: true },
      ],
      visaFees: [
        { label: 'SEVIS I-901 fee', value: '$350', verify: true },
        { label: 'Visa application (MRV) fee', value: '$185', verify: true },
        { label: 'Visa integrity fee', value: 'New fee passed in 2025; check if in force', verify: true },
      ],
      scholarships: [
        { name: 'Fulbright (USEFP)', text: 'Fully funded master’s and PhD awards run in Pakistan by the United States Educational Foundation in Pakistan.' },
        { name: 'University merit scholarships', text: 'Many US universities award partial scholarships to international undergraduates at admission.' },
        { name: 'Graduate assistantships', text: 'Teaching or research posts that can cover tuition and pay a stipend, mainly for master’s and PhD students.' },
      ],
      sources: [
        { label: 'U.S. Embassy & Consulates in Pakistan', url: 'https://pk.usembassy.gov/visas/' },
        { label: 'Study in the States (SEVIS)', url: 'https://studyinthestates.dhs.gov/' },
        { label: 'USEFP Fulbright', url: 'https://www.usefpakistan.org/' },
      ],
    },
    requirements: {
      documents: [
        'Valid passport',
        'Form I-20 from a SEVP-certified school',
        'SEVIS I-901 fee receipt',
        'DS-160 confirmation page and visa fee receipt',
        'Financial documents covering the cost of attendance on your I-20',
        'Transcripts, degrees and test scores',
      ],
      tests: [
        'English: TOEFL iBT, IELTS or Duolingo English Test, depending on the university',
        'SAT or ACT: optional at many universities, still required at some',
        'GRE or GMAT: required by some graduate programmes',
      ],
      academics: 'Undergraduate admission looks at your full record from grade 9 onward (O/A-Levels or Matric/FSc). Some universities ask for a one-year bachelor’s top-up for 14-year Pakistani degrees before a master’s.',
      intakes: ['Fall (August/September, main intake)', 'Spring (January)', 'Summer (limited)'],
      deadlines: 'For Fall, many deadlines fall between November and February. Scholarship deadlines are often earlier.',
    },
    destinations: {
      title: 'Popular US states for Pakistani students',
      intro: 'Location affects living costs, weather and the job market for internships. We factor all three into your shortlist.',
      items: [
        { name: 'Texas', initials: 'TX', chips: ['Lower living costs', 'Engineering'], text: 'Large public universities and a strong tech and energy job market.' },
        { name: 'New York', initials: 'NY', chips: ['Finance', 'Media'], text: 'Top universities and internships, with high rent in the city.' },
        { name: 'California', initials: 'CA', chips: ['Tech', 'Research'], text: 'Home to Silicon Valley and large public university systems.' },
        { name: 'Illinois', initials: 'IL', chips: ['Midwest', 'Business'], text: 'Chicago and strong state universities at moderate cost.' },
      ],
    },
    process: [
      { title: 'Free assessment', text: 'Profile, budget and test plan.' },
      { title: 'Applications', text: 'Essays, recommendation letters and financial aid forms.' },
      { title: 'I-20 and SEVIS', text: 'Accept your admission, receive the I-20 and pay the I-901 fee.' },
      { title: 'DS-160 and interview', text: 'We review your DS-160 and run mock interviews.' },
      { title: 'Pre-departure', text: 'Housing, travel dates and arrival checklist.' },
    ],
    whyUs: [
      { title: 'Interview practice', text: 'The F-1 decision happens in a short interview. We practise the questions that matter until your answers are clear and honest.' },
      { title: 'Financial aid planning', text: 'We look for universities that give international students aid, not just admission.' },
      { title: 'Document consistency', text: 'We check that your DS-160, I-20 and financial documents tell the same story.' },
    ],
    faqs: [
      { q: 'How much does it cost to study in the USA from Pakistan?', a: 'Tuition ranges from about $8,000 a year at a community college to over $60,000 at some private universities, plus $12,000 to $25,000 a year for living costs. Scholarships and assistantships can reduce this. Your I-20 shows the exact amount you must prove.' },
      { q: 'Where do Pakistani students have their F-1 visa interview?', a: 'At the U.S. Embassy in Islamabad or the Consulate General in Karachi. Check the embassy website for current appointment options.' },
      { q: 'Is the SAT required?', a: 'Many universities are test-optional, but some require the SAT or ACT, and a good score can help with scholarships. We check each university on your list.' },
      { q: 'What is OPT?', a: 'Optional Practical Training lets F-1 students work in their field for up to 12 months after graduation. Graduates in approved STEM fields can apply for a further 24 months.' },
      { q: 'Can my 14-year bachelor’s degree get me into a US master’s?', a: 'Some universities accept it, others need 16 years of education. We shortlist universities that accept your degree or suggest a path to meet the requirement.' },
      { q: 'Why are F-1 visas refused?', a: 'Common reasons are unclear study plans, weak ties to Pakistan, or funds that do not match the I-20. Most of these can be fixed with preparation.' },
    ],
    cta: { title: 'Aiming for a US Fall intake?', text: 'Start early. Tell us your grades and test plans and we will map your deadlines.' },
    waMessage: 'Hi Prime Edge, I want to study in the USA. Can you help me with admission and the F-1 visa?',
  },

  // ---------------------------------------------------------------- Australia
  {
    slug: 'study-in-australia',
    name: 'Australia',
    short: 'Australia',
    inName: 'Australia',
    flag: 'au',
    formLabel: 'Australia',
    pin: { lat: -25.3, lng: 133.8 },
    highlightIds: ['036'],
    metaTitle: 'Study in Australia from Pakistan | Subclass 500 Visa',
    metaDescription: 'Study in Australia from Pakistan: university admission, CoE, OSHC and Subclass 500 student visa with the Genuine Student requirement explained.',
    preHeadline: 'Australian universities · February & July intakes',
    h1: 'Study in Australia: Subclass 500 visa and university admissions',
    sub: 'High-quality universities, part-time work rights and a post-study work visa. We guide you from offer letter to CoE and prepare your Genuine Student statement.',
    cardLine: 'Work rights while studying and a post-study work visa.',
    heroFacts: [
      { label: 'Visa', value: 'Student (subclass 500)' },
      { label: 'Main intakes', value: 'February · July' },
      { label: 'Post-study work', value: 'Subclass 485', verify: true },
    ],
    overview:
      'Australia combines well-ranked universities with a clear student visa process run online. The Genuine Student requirement asks you to explain why this course, this university and Australia make sense for you. Graduates can apply for the Temporary Graduate visa to gain work experience.',
    costs: {
      intro: 'Australia asks you to show funds for tuition, living costs and travel. The living-cost figure is set by the Department of Home Affairs and changes from time to time.',
      tuition: [
        { label: 'Bachelor’s (per year)', value: 'AUD 22,000 – 50,000', verify: true },
        { label: 'Master’s (per year)', value: 'AUD 25,000 – 55,000', verify: true },
      ],
      living: [
        { label: 'Living funds to show (per year)', value: 'AUD 29,710', verify: true },
      ],
      visaFees: [
        { label: 'Student visa application', value: 'AUD 2,000', verify: true },
        { label: 'OSHC health cover', value: 'Required for your whole stay', verify: true },
      ],
      scholarships: [
        { name: 'Australia Awards', text: 'Australian government scholarships for postgraduate study, offered in Pakistan in selected fields.' },
        { name: 'Destination Australia', text: 'Government-funded scholarships for study at regional campuses.' },
        { name: 'University merit awards', text: 'Partial tuition scholarships of 10% to 50% are common for strong applicants.' },
      ],
      sources: [
        { label: 'Home Affairs: Student visa (500)', url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500' },
        { label: 'Study Australia', url: 'https://www.studyaustralia.gov.au/' },
        { label: 'Australia Awards Pakistan', url: 'https://www.australiaawardspakistan.org/' },
      ],
    },
    requirements: {
      documents: [
        'Valid passport',
        'Confirmation of Enrolment (CoE) from your university',
        'Genuine Student statement answering the visa questions',
        'Evidence of funds for tuition, living costs and travel',
        'Overseas Student Health Cover (OSHC)',
        'Academic documents and English test result',
      ],
      tests: [
        'IELTS Academic, PTE Academic or TOEFL iBT at the score your course and the visa require',
        'Health examination and police certificate if requested',
      ],
      academics: 'Bachelor’s entry typically needs good FSc or A-Level results; some students start with a foundation or diploma. Master’s entry needs a recognised bachelor’s degree, and some universities ask for 16 years of education.',
      intakes: ['February (main)', 'July', 'November (some universities)'],
      deadlines: 'Apply 4 to 6 months ahead. Visa processing times vary, so leave room after receiving your CoE.',
    },
    destinations: {
      title: 'Cities and regions to consider',
      intro: 'Big cities have more jobs and higher rent. Regional campuses can mean lower costs and extra post-study work time.',
      items: [
        { name: 'Sydney', initials: 'SY', chips: ['New South Wales', 'Business'], text: 'Australia’s largest city, with high rent and many part-time jobs.' },
        { name: 'Melbourne', initials: 'ME', chips: ['Victoria', 'Student city'], text: 'Large international student community and strong universities.' },
        { name: 'Brisbane', initials: 'BR', chips: ['Queensland', 'Warm climate'], text: 'Lower costs than Sydney or Melbourne.' },
        { name: 'Adelaide', initials: 'AD', chips: ['South Australia', 'Regional benefits'], text: 'Classed as regional for migration purposes, with lower living costs.' },
      ],
    },
    process: [
      { title: 'Free assessment', text: 'Course fit, budget and English score.' },
      { title: 'Offer letter', text: 'We apply to your shortlisted universities.' },
      { title: 'Accept and get your CoE', text: 'Pay the deposit, buy OSHC and receive your CoE.' },
      { title: 'Visa application', text: 'Genuine Student statement, funds and online lodgement in ImmiAccount.' },
      { title: 'Arrival', text: 'Accommodation, tax file number and first-week checklist.' },
    ],
    whyUs: [
      { title: 'Genuine Student statements', text: 'We help you explain your study plan clearly and truthfully, in your own words.' },
      { title: 'Regional options', text: 'We show you regional campuses that can lower costs.' },
      { title: 'Funds planning', text: 'We check your financial evidence against the current living-cost figure.' },
    ],
    faqs: [
      { q: 'How much money do I need to study in Australia?', a: 'You need your first year of tuition, the living-cost amount set by Home Affairs (AUD 29,710 a year at the last update), travel costs and OSHC. Tuition is usually AUD 22,000 to 55,000 a year. We confirm current figures during your assessment.' },
      { q: 'What is the Genuine Student requirement?', a: 'It replaced the old GTE in 2024. You answer questions about your background, your course choice and how it fits your future. Clear, honest answers backed by documents are what matter.' },
      { q: 'Can I work while studying in Australia?', a: 'Student visa holders can work up to 48 hours per fortnight during study periods and unlimited hours during official breaks.' },
      { q: 'What IELTS score do I need for Australia?', a: 'Your university sets its own minimum, often 6.0 to 6.5 overall. The visa also has a minimum; check the current score with us before you book.' },
      { q: 'How long can I stay after graduating?', a: 'The Temporary Graduate visa (subclass 485) usually allows two years for bachelor’s and master’s graduates and more for PhD graduates, with possible extra time for regional study.' },
      { q: 'What is OSHC?', a: 'Overseas Student Health Cover is compulsory health insurance for student visa holders. You buy it before applying and keep it for your whole stay.' },
    ],
    cta: { title: 'Considering Australia for February or July?', text: 'Share your grades and budget and we will suggest universities, including regional options.' },
    waMessage: 'Hi Prime Edge, I want to study in Australia. Can you assess my profile?',
  },

  // ---------------------------------------------------------------- Europe (Schengen)
  {
    slug: 'study-in-europe',
    name: 'Europe (Schengen)',
    short: 'Europe',
    inName: 'Europe',
    flag: 'eu',
    formLabel: 'Europe (Schengen)',
    pin: { lat: 50.5, lng: 10.0 },
    highlightIds: SCHENGEN_IDS,
    metaTitle: 'Study in Europe from Pakistan | Schengen Student Visa',
    metaDescription: 'Study in Germany, France, Italy and more from Pakistan. Low or no tuition options, national D study visas and blocked account guidance.',
    preHeadline: 'Germany · France · Italy · Hungary and more',
    h1: 'Study in Europe: Schengen student visas for Germany, France, Italy and more',
    sub: 'Low-tuition public universities, English-taught master’s programmes and the freedom to travel across the Schengen area. We help you pick the country that fits your budget and handle the national study visa.',
    cardLine: 'Low or no tuition at public universities, English-taught options.',
    heroFacts: [
      { label: 'Visa type', value: 'National (D) study visa' },
      { label: 'Main intake', value: 'Winter semester (Sep/Oct)' },
      { label: 'Tuition', value: 'Low or none at many public universities', verify: true },
    ],
    overview:
      'A long-stay student visa issued by one Schengen country lets you live there and travel across the Schengen area for short trips. Each country runs its own visa and admission rules, so Germany, France and Italy all work differently. Public universities in several countries charge low tuition or none at all.',
    costs: {
      intro: 'In Europe the living budget often matters more than tuition. Germany, for example, asks most students to open a blocked account holding a year of living costs.',
      tuition: [
        { label: 'Germany: public universities', value: 'No tuition in most states; semester fee about €150 – €400', verify: true },
        { label: 'France: public universities (non-EU)', value: 'About €2,900 bachelor · €3,900 master per year', verify: true },
        { label: 'Italy: public universities', value: 'Often under €4,000 per year; income-based', verify: true },
      ],
      living: [
        { label: 'Germany blocked account', value: '€11,904 per year (2025 figure)', verify: true },
        { label: 'Typical living costs', value: '€700 – €1,200 per month by city', verify: true },
      ],
      visaFees: [
        { label: 'National (D) visa fee', value: 'Around €75; varies by country', verify: true },
      ],
      scholarships: [
        { name: 'DAAD (Germany)', text: 'German government scholarships, mostly for postgraduate study and research.' },
        { name: 'Italian regional (DSU) grants', text: 'Need-based grants from Italian regions that can cover fees, meals and housing.' },
        { name: 'Stipendium Hungaricum', text: 'Hungarian government scholarship covering tuition, a monthly stipend and housing support for eligible countries including Pakistan.' },
        { name: 'Erasmus Mundus', text: 'Fully funded joint master’s degrees taught across two or more European universities.' },
      ],
      sources: [
        { label: 'German Missions in Pakistan', url: 'https://pakistan.diplo.de/' },
        { label: 'Campus France Pakistan', url: 'https://www.pakistan.campusfrance.org/' },
        { label: 'Study in Italy', url: 'https://studyinitaly.esteri.it/' },
        { label: 'Stipendium Hungaricum', url: 'https://stipendiumhungaricum.hu/' },
      ],
    },
    requirements: {
      documents: [
        'Valid passport',
        'University admission letter',
        'Proof of funds (blocked account for Germany, bank statements or sponsor letters elsewhere)',
        'Health insurance valid in the Schengen area',
        'Accommodation proof or plan',
        'Attested academic documents; some countries ask for legalisation by the embassy',
      ],
      tests: [
        'IELTS or TOEFL for English-taught programmes',
        'German (TestDaF, DSH) or French (DELF/DALF) only for programmes taught in those languages',
      ],
      academics: 'Master’s programmes usually need a relevant bachelor’s degree, often 16 years of education. For bachelor’s entry, some countries ask Pakistani students to complete a foundation year (Studienkolleg in Germany) or one year of university first.',
      intakes: ['Winter semester (September/October, main)', 'Summer semester (March/April, fewer programmes)'],
      deadlines: 'Many German and Italian programmes close between January and May for the winter semester. Visa appointments can take weeks, so book early.',
    },
    destinations: {
      title: 'Schengen countries we can guide you to',
      intro: 'Each country has its own strengths. TODO: client to confirm which Schengen countries Prime Edge actively handles.',
      items: [
        { name: 'Germany', initials: 'DE', chips: ['No tuition (most states)', 'Engineering'], text: 'Tuition-free public universities and an 18-month job-search permit after graduation.' },
        { name: 'France', initials: 'FR', chips: ['Campus France', 'Business'], text: 'Applications go through Campus France; strong business schools and public universities.' },
        { name: 'Italy', initials: 'IT', chips: ['Low fees', 'Regional grants'], text: 'Affordable public universities and need-based regional grants.' },
        { name: 'Hungary', initials: 'HU', chips: ['Stipendium Hungaricum', 'Medicine'], text: 'Government scholarships and English-taught medical programmes.' },
        { name: 'Netherlands', initials: 'NL', chips: ['English-taught', 'Research'], text: 'Many programmes fully in English, with higher fees than Germany or Italy.' },
        { name: 'Poland', initials: 'PL', chips: ['Affordable', 'Central Europe'], text: 'Moderate fees and living costs with a growing range of English courses.' },
      ],
    },
    process: [
      { title: 'Free assessment', text: 'Budget, academic record and the countries that fit.' },
      { title: 'Choose a country', text: 'We compare fees, living costs and post-study options side by side.' },
      { title: 'Apply', text: 'University or portal applications (uni-assist, Campus France, Universitaly).' },
      { title: 'Funds and documents', text: 'Blocked account, insurance, accommodation and attestations.' },
      { title: 'Visa appointment', text: 'Embassy file review and interview preparation.' },
    ],
    whyUs: [
      { title: 'Country comparison', text: 'We lay out total costs for each country so you can choose on facts.' },
      { title: 'Portal applications', text: 'We guide you through uni-assist, Campus France and Universitaly procedures.' },
      { title: 'Document legalisation', text: 'We explain which HEC, IBCC and embassy attestations each country needs.' },
    ],
    faqs: [
      { q: 'Is studying in Europe free for Pakistani students?', a: 'In some places, nearly. Most German states charge no tuition at public universities, only a semester fee. Italy and France charge low fees at public universities. You still need to show living funds, which is the larger cost.' },
      { q: 'What is a Schengen student visa?', a: 'For study longer than 90 days you need a national long-stay (D) visa from the country where you will study. It also lets you travel within the Schengen area for short visits.' },
      { q: 'How much is the German blocked account?', a: 'It was €11,904 a year for 2025, which is €992 a month. The amount is reviewed regularly, so check the German Missions in Pakistan website before you open one.' },
      { q: 'Do I need to learn German or French?', a: 'Not for English-taught programmes. Learning the basics still helps with part-time work and daily life, and some countries reward it in job-search permits.' },
      { q: 'Can I work after graduating in Europe?', a: 'Most countries offer a job-search permit after graduation. Germany gives up to 18 months; France and Italy also have post-study options for graduates.' },
      { q: 'Which is the cheapest country in Europe to study?', a: 'Germany is usually cheapest for tuition. Italy, Hungary and Poland can be cheaper overall because living costs are lower. We compare total cost, not just fees.' },
    ],
    cta: { title: 'Not sure which European country fits your budget?', text: 'We compare Germany, France, Italy and more for your profile, in PKR, on one page.' },
    waMessage: 'Hi Prime Edge, I want to study in Europe. Which Schengen country suits my profile?',
  },

  // ---------------------------------------------------------------- Turkey
  {
    slug: 'study-in-turkey',
    name: 'Turkey (Türkiye)',
    short: 'Turkey',
    inName: 'Turkey',
    flag: 'tr',
    formLabel: 'Turkey',
    pin: { lat: 39.0, lng: 35.0 },
    highlightIds: ['792'],
    metaTitle: 'Study in Turkey from Pakistan | Admission & Residence',
    metaDescription: 'Study in Turkey from Pakistan: English-taught degrees at public and private universities, Türkiye Scholarships and student residence permit support.',
    preHeadline: 'Istanbul · Ankara · Izmir',
    h1: 'Study in Turkey: affordable English-taught degrees and residence permit support',
    sub: 'Modern campuses, reasonable fees and a culture that feels familiar. We help you choose between public and private universities and sort out your student residence permit after you land.',
    cardLine: 'Affordable English-taught degrees close to home.',
    heroFacts: [
      { label: 'Flight from Pakistan', value: 'About 6 hours' },
      { label: 'Main intake', value: 'September' },
      { label: 'Top scholarship', value: 'Türkiye Scholarships' },
    ],
    overview:
      'Turkey has both public universities with low fees and private (foundation) universities with more English-taught programmes and simpler admission. Istanbul alone has dozens of universities. After arrival, every student applies for a student residence permit, which we help you prepare.',
    costs: {
      intro: 'Turkey is one of the more affordable options on our list, especially at public universities. Private university fees vary widely by programme.',
      tuition: [
        { label: 'Public universities (per year)', value: 'About $500 – $4,000', verify: true },
        { label: 'Private universities (per year)', value: 'About $3,000 – $20,000', verify: true },
        { label: 'Medicine & dentistry (private)', value: 'Higher; ask for a quote', verify: true },
      ],
      living: [
        { label: 'Living costs (per month)', value: 'About $400 – $800; Istanbul is higher', verify: true },
      ],
      visaFees: [
        { label: 'Student visa and residence permit', value: 'Fees set by the embassy and migration office', verify: true },
      ],
      scholarships: [
        { name: 'Türkiye Scholarships (Türkiye Bursları)', text: 'Government scholarship covering tuition, a monthly stipend, accommodation, health insurance and a Turkish language year. Applications usually open early in the year.' },
        { name: 'Private university discounts', text: 'Many foundation universities offer 25% to 100% merit discounts based on your grades or SAT score.' },
      ],
      sources: [
        { label: 'Türkiye Scholarships', url: 'https://www.turkiyeburslari.gov.tr/' },
        { label: 'Study in Türkiye', url: 'https://www.studyinturkiye.gov.tr/' },
        { label: 'Presidency of Migration Management', url: 'https://en.goc.gov.tr/' },
      ],
    },
    requirements: {
      documents: [
        'Valid passport',
        'Acceptance letter from a Turkish university',
        'Student visa from the Turkish Embassy or Consulate in Pakistan',
        'Attested transcripts and certificates, and an equivalence certificate where required',
        'Health insurance and proof of address for the residence permit',
      ],
      tests: [
        'IELTS or TOEFL for English-taught programmes, or the university’s own English exam',
        'YÖS or SAT for some public universities',
        'Turkish proficiency (TÖMER) only for Turkish-taught programmes',
      ],
      academics: 'Bachelor’s entry uses your FSc or A-Level results; public universities are more competitive. Master’s programmes need a relevant bachelor’s degree and sometimes ALES or GRE scores.',
      intakes: ['September (main)', 'February (some private universities)'],
      deadlines: 'Private universities often accept applications until summer. Public university and Türkiye Scholarships deadlines are earlier in the year.',
    },
    destinations: {
      title: 'Student cities in Turkey',
      intro: 'Where you study changes your costs and your experience. We help you compare cities as well as universities.',
      items: [
        { name: 'Istanbul', initials: 'IS', chips: ['Most universities', 'Higher costs'], text: 'The largest choice of public and private universities, with the highest rent.' },
        { name: 'Ankara', initials: 'AN', chips: ['Capital', 'Engineering'], text: 'Home to several leading public universities and a calmer student life.' },
        { name: 'Izmir', initials: 'IZ', chips: ['Aegean coast', 'Lower costs'], text: 'A coastal city with good universities and lower living costs than Istanbul.' },
        { name: 'Konya', initials: 'KO', chips: ['Affordable', 'Conservative city'], text: 'Low living costs and a large student population.' },
      ],
    },
    process: [
      { title: 'Free assessment', text: 'Public or private, city and budget.' },
      { title: 'Apply', text: 'University applications and scholarship applications.' },
      { title: 'Acceptance letter', text: 'Pay the deposit where required and receive your letter.' },
      { title: 'Student visa', text: 'Embassy application with attested documents.' },
      { title: 'Residence permit', text: 'After arrival, we guide your student residence permit application.' },
    ],
    whyUs: [
      { title: 'Public vs private advice', text: 'We explain the real difference in fees, admission and teaching language.' },
      { title: 'Residence permit guidance', text: 'We help you prepare the permit application after you arrive.' },
      { title: 'Türkiye Scholarships applications', text: 'We review your application and interview preparation.' },
    ],
    faqs: [
      { q: 'How much does it cost to study in Turkey from Pakistan?', a: 'Public universities charge roughly $500 to $4,000 a year and private universities about $3,000 to $20,000, depending on the programme. Living costs are usually $400 to $800 a month, more in Istanbul. We confirm current fees for your course.' },
      { q: 'Are Turkish degrees recognised in Pakistan?', a: 'Degrees from universities recognised by Turkey’s Council of Higher Education (YÖK) can be attested and recognised by HEC. We check your university before you apply.' },
      { q: 'Is IELTS required for Turkey?', a: 'For English-taught programmes most universities ask for IELTS or TOEFL, but many accept their own English exam or a preparatory year instead.' },
      { q: 'What is the student residence permit?', a: 'After you arrive, you apply for a student residence permit (ikamet) with the Presidency of Migration Management. It lets you stay for your studies and is renewed each year.' },
      { q: 'Can I work while studying in Turkey?', a: 'Undergraduate students need a work permit and have limited rights. Postgraduate students have more options. Do not plan to fund your studies through work.' },
      { q: 'Who can apply for Türkiye Scholarships?', a: 'Students of most nationalities, including Pakistanis, who meet the grade and age limits. The scholarship is competitive and applications open once a year.' },
    ],
    cta: { title: 'Thinking about Turkey for September?', text: 'Tell us your grades and budget. We will compare public and private options for you.' },
    waMessage: 'Hi Prime Edge, I want to study in Turkey. Can you suggest universities for me?',
  },

  // ---------------------------------------------------------------- Kyrgyzstan (MBBS)
  {
    slug: 'study-in-kyrgyzstan',
    name: 'Kyrgyzstan',
    short: 'Kyrgyzstan',
    inName: 'Kyrgyzstan',
    flag: 'kg',
    formLabel: 'Kyrgyzstan',
    pin: { lat: 41.2, lng: 74.8 },
    highlightIds: ['417'],
    metaTitle: 'MBBS in Kyrgyzstan for Pakistani Students | Prime Edge',
    metaDescription: 'MBBS in Kyrgyzstan from Pakistan: WDOMS-listed medical universities in Bishkek, fee guidance, PM&DC and NLE rules, admission and visa support.',
    preHeadline: 'MBBS / MD · Bishkek',
    h1: 'MBBS in Kyrgyzstan: recognised medical universities for Pakistani students',
    sub: 'English-taught medical degrees in Bishkek at a fraction of private-college fees in Pakistan. We help you choose a university listed in WDOMS and explain the PM&DC rules before you apply.',
    cardLine: 'English-taught MBBS at WDOMS-listed universities.',
    heroFacts: [
      { label: 'Degree', value: 'MBBS / MD, about 6 years', verify: true },
      { label: 'Teaching', value: 'English-medium' },
      { label: 'Intake', value: 'September' },
    ],
    overview:
      'Kyrgyzstan is one of the most popular MBBS destinations for Pakistani students because of lower fees, English-taught programmes and a short flight home. Before you choose, check two things: that the university is listed in the World Directory of Medical Schools, and that you meet the current PM&DC rules for foreign medical graduates, including the National Licensing Examination (NLE) you take back in Pakistan.',
    costs: {
      intro: 'Tuition is paid in US dollars and differs between universities. Ask for the full six-year cost, including hostel and visa extensions, not just the first-year fee.',
      tuition: [
        { label: 'MBBS tuition (per year)', value: 'About $3,500 – $6,000', verify: true },
        { label: 'Hostel (per year)', value: 'About $600 – $1,200', verify: true },
      ],
      living: [
        { label: 'Food and living (per month)', value: 'About $150 – $300', verify: true },
      ],
      visaFees: [
        { label: 'Student visa and registration', value: 'Arranged through the university invitation', verify: true },
      ],
      scholarships: [
        { name: 'University fee concessions', text: 'Some universities offer discounts for high FSc marks or early payment. Ask us which apply this year.' },
      ],
      sources: [
        { label: 'World Directory of Medical Schools', url: 'https://search.wdoms.org/' },
        { label: 'Pakistan Medical & Dental Council', url: 'https://pmdc.pk/' },
      ],
    },
    requirements: {
      documents: [
        'Valid passport',
        'Matric and FSc (Pre-Medical) certificates and transcripts, or O/A-Level equivalence from IBCC',
        'MDCAT result, if required by current PM&DC rules for studying medicine abroad',
        'University admission letter and visa invitation',
        'Medical certificate and passport photos',
      ],
      tests: [
        'No IELTS required by most universities; an English interview or test may apply',
        'MDCAT: check the current PM&DC requirement before applying',
      ],
      academics: 'FSc Pre-Medical (or equivalent) with the minimum marks set by PM&DC for students going abroad. We check the current percentage with you before applying.',
      intakes: ['September (main)', 'February (some universities)'],
      deadlines: 'Seats fill from spring to summer. Start in early spring to leave time for invitations and visas.',
    },
    destinations: {
      title: 'Our partner medical universities in Bishkek',
      intro: 'We work with these universities. TODO: client to confirm current partnership status and add each university’s WDOMS listing link.',
      items: [
        { name: 'Ala-Too International University', initials: 'AT', chips: ['MBBS / MD', 'Bishkek', 'English-taught'], text: 'Private university with an English-taught medical faculty in the capital.' },
        { name: 'University of South Asia (Bishkek Campus)', initials: 'SA', chips: ['MBBS / MD', 'Bishkek'], text: 'Bishkek campus offering medical education for international students.' },
        { name: 'International University of Kyrgyzstan (IUK-ISM)', initials: 'IU', chips: ['MBBS / MD', 'International School of Medicine'], text: 'Medical school with a long record of teaching international students in English.' },
        { name: 'Kyrgyz State Medical Academy (KSMA)', initials: 'KS', chips: ['MBBS / MD', 'Public'], text: 'The country’s main public medical academy, named after I. K. Akhunbaev.' },
      ],
    },
    process: [
      { title: 'Eligibility check', text: 'FSc marks, MDCAT and PM&DC rules, checked first.' },
      { title: 'Choose a university', text: 'We compare the partner universities on fees, hostel and clinical training.' },
      { title: 'Admission letter', text: 'We apply and receive your admission letter and visa invitation.' },
      { title: 'Visa and travel', text: 'Embassy visa, flights and arrival in Bishkek.' },
      { title: 'After arrival', text: 'Registration, hostel check-in and support contacts.' },
    ],
    whyUs: [
      { title: 'Recognition checked first', text: 'We confirm WDOMS listing and current PM&DC rules before recommending any university.' },
      { title: 'Full six-year costs', text: 'We give you the total cost in writing, not just the first-year fee.' },
      { title: 'Direct partner universities', text: 'We work with the four universities listed on this page.' },
    ],
    faqs: [
      { q: 'Is MBBS from Kyrgyzstan valid in Pakistan?', a: 'It can be, if the university is listed in the World Directory of Medical Schools and you meet PM&DC rules. Foreign medical graduates must pass the National Licensing Examination (NLE) to practise in Pakistan. We check your university against the current rules before you apply.' },
      { q: 'How much does MBBS in Kyrgyzstan cost?', a: 'Tuition is usually about $3,500 to $6,000 a year, plus hostel and living costs of a few hundred dollars a month. We give you a written six-year estimate for each university.' },
      { q: 'How long is MBBS in Kyrgyzstan?', a: 'Most programmes for international students last about six years, including clinical years. The exact length depends on the university.' },
      { q: 'Do I need MDCAT to study MBBS abroad?', a: 'PM&DC has set MDCAT and minimum-mark rules for Pakistani students who study medicine abroad and want to practise in Pakistan. The rules have changed several times, so check the current requirement with us before applying.' },
      { q: 'Is the teaching in English?', a: 'Yes, the programmes we recommend are taught in English. You will also learn basic Russian or Kyrgyz to talk to patients during clinical training.' },
      { q: 'Is Kyrgyzstan safe for Pakistani students?', a: 'Thousands of Pakistani students study in Bishkek. Like any city, it needs sensible precautions. We share safety guidance and student contacts before you travel.' },
      { q: 'Is IELTS required for MBBS in Kyrgyzstan?', a: 'Most universities do not require IELTS. They may test your English in an interview.' },
    ],
    cta: { title: 'Want to study MBBS in Kyrgyzstan?', text: 'Send your FSc and MDCAT details. We check your eligibility and share partner university options.' },
    waMessage: 'Hi Prime Edge, I want to study MBBS in Kyrgyzstan. Can you check my eligibility?',
  },

  // ---------------------------------------------------------------- China
  {
    slug: 'study-in-china',
    name: 'China',
    short: 'China',
    inName: 'China',
    flag: 'cn',
    formLabel: 'China',
    pin: { lat: 35.9, lng: 104.2 },
    highlightIds: ['156'],
    metaTitle: 'Study in China from Pakistan | CSC Scholarship & MBBS',
    metaDescription: 'Study in China from Pakistan: CSC scholarship applications, English-taught MBBS, JW202 and X1 student visa guidance. Free assessment on WhatsApp.',
    preHeadline: 'CSC scholarships · MBBS · engineering',
    h1: 'Study in China: CSC scholarships, MBBS and the X1 student visa',
    sub: 'Large universities, government scholarships and English-taught MBBS programmes. We help you apply for the CSC scholarship and get the admission letter, JW form and X1 visa in order.',
    cardLine: 'Government scholarships and English-taught MBBS.',
    heroFacts: [
      { label: 'Visa', value: 'X1 (long-term study)' },
      { label: 'Main intake', value: 'September' },
      { label: 'Scholarship', value: 'CSC (Chinese Government)' },
    ],
    overview:
      'China offers fully funded government scholarships and a wide range of programmes in engineering, medicine and business. For long-term study you enter on an X1 visa and convert it to a residence permit after arrival. MBBS students should choose from universities approved to teach medicine in English.',
    costs: {
      intro: 'Tuition in China is moderate, and a CSC scholarship can cover it completely. Living costs depend heavily on the city.',
      tuition: [
        { label: 'Bachelor’s (per year)', value: 'About CNY 15,000 – 40,000', verify: true },
        { label: 'MBBS in English (per year)', value: 'About CNY 25,000 – 50,000', verify: true },
      ],
      living: [
        { label: 'Living costs (per month)', value: 'About CNY 1,500 – 3,500', verify: true },
      ],
      visaFees: [
        { label: 'X1 visa and residence permit', value: 'Set by the embassy and local bureau', verify: true },
      ],
      scholarships: [
        { name: 'Chinese Government Scholarship (CSC)', text: 'Covers tuition, housing, insurance and a monthly stipend for full scholarships. You apply through a Chinese university or the embassy route, usually between December and April.' },
        { name: 'Provincial and university scholarships', text: 'Partial or full awards offered by provinces, cities and individual universities.' },
      ],
      sources: [
        { label: 'Campus China (CSC)', url: 'https://www.campuschina.org/' },
        { label: 'Chinese Embassy in Pakistan', url: 'http://pk.china-embassy.gov.cn/eng/' },
        { label: 'Study in China', url: 'https://www.studyinchina.edu.cn/' },
      ],
    },
    requirements: {
      documents: [
        'Valid passport',
        'Admission letter from a Chinese university',
        'JW201 (scholarship) or JW202 (self-funded) visa application form',
        'Physical examination record for foreigners',
        'Police character certificate if requested',
        'Attested academic documents',
      ],
      tests: [
        'IELTS or TOEFL for English-taught programmes; some universities accept an English-medium letter',
        'HSK (Chinese proficiency) for Chinese-taught programmes; MBBS students must reach a set HSK level before clinical work',
      ],
      academics: 'Bachelor’s and MBBS entry usually need FSc or A-Level results with good marks in science subjects. Master’s entry needs a relevant bachelor’s degree and often two recommendation letters.',
      intakes: ['September (main)', 'March (some programmes)'],
      deadlines: 'CSC scholarship deadlines usually fall between January and April. Self-funded applications often stay open until June.',
    },
    destinations: {
      title: 'Student cities in China',
      intro: 'Coastal megacities cost more; inland cities often offer the same programmes for less.',
      items: [
        { name: 'Beijing', initials: 'BJ', chips: ['Capital', 'Research'], text: 'Many of China’s top universities, with higher living costs.' },
        { name: 'Shanghai', initials: 'SH', chips: ['Business', 'International'], text: 'An international city with strong business and engineering schools.' },
        { name: 'Wuhan', initials: 'WH', chips: ['Large student city', 'Medicine'], text: 'One of China’s biggest education hubs, with lower costs.' },
        { name: 'Nanjing', initials: 'NJ', chips: ['Historic', 'Engineering'], text: 'Well-known universities and moderate living costs.' },
      ],
    },
    process: [
      { title: 'Free assessment', text: 'Scholarship chances, programme and budget.' },
      { title: 'Applications', text: 'University and CSC applications with study plan and references.' },
      { title: 'Admission and JW form', text: 'Receive your admission letter and JW201 or JW202.' },
      { title: 'X1 visa', text: 'Physical exam, embassy application and travel.' },
      { title: 'Residence permit', text: 'Convert your X1 into a residence permit after arrival.' },
    ],
    whyUs: [
      { title: 'CSC application support', text: 'We help you write a clear study plan and choose the right route.' },
      { title: 'MBBS university checks', text: 'We recommend only universities approved to teach MBBS in English.' },
      { title: 'Visa paperwork', text: 'We check your JW form, admission letter and medical form before submission.' },
    ],
    faqs: [
      { q: 'How can I get a CSC scholarship from Pakistan?', a: 'You apply through the Campus China portal, either via a Chinese university (Type B) or the embassy route (Type A), usually between December and April. A strong academic record and a clear study plan make the difference.' },
      { q: 'How much does MBBS in China cost?', a: 'English-taught MBBS usually costs about CNY 25,000 to 50,000 a year in tuition, plus accommodation and living costs. We share current fees for each university.' },
      { q: 'What is the difference between JW201 and JW202?', a: 'JW201 is issued to scholarship students and JW202 to self-funded students. You need one of them, with your admission letter, to apply for an X1 visa.' },
      { q: 'Do I need to learn Chinese?', a: 'Not for English-taught programmes, but you will study Chinese as part of your degree. MBBS students must reach a required HSK level before clinical placements.' },
      { q: 'Is MBBS from China recognised in Pakistan?', a: 'Graduates of recognised Chinese medical universities can practise in Pakistan after passing the NLE. We check your university against current PM&DC rules.' },
      { q: 'When is the intake in China?', a: 'September is the main intake. A few programmes also start in March.' },
    ],
    cta: { title: 'Aiming for a CSC scholarship?', text: 'Deadlines come early. Send us your transcripts and we will plan your applications.' },
    waMessage: 'Hi Prime Edge, I want to study in China. Can you help with admission and the CSC scholarship?',
  },

  // ---------------------------------------------------------------- Malaysia
  {
    slug: 'study-in-malaysia',
    name: 'Malaysia',
    short: 'Malaysia',
    inName: 'Malaysia',
    flag: 'my',
    formLabel: 'Malaysia',
    pin: { lat: 4.2, lng: 101.9 },
    highlightIds: ['458'],
    metaTitle: 'Study in Malaysia from Pakistan | EMGS Student Pass',
    metaDescription: 'Study in Malaysia from Pakistan: branch campuses of UK and Australian universities, affordable fees, EMGS student pass and Visa Approval Letter help.',
    preHeadline: 'Kuala Lumpur · branch campuses · affordable fees',
    h1: 'Study in Malaysia: EMGS student pass and top university admissions',
    sub: 'British and Australian degrees at branch campuses for a lower total cost, in an English-speaking, Muslim-majority country. We handle your application and guide your EMGS student pass.',
    cardLine: 'UK and Australian degrees at lower cost.',
    heroFacts: [
      { label: 'Visa route', value: 'EMGS student pass' },
      { label: 'Intakes', value: 'Jan/Feb · May · Sep' },
      { label: 'Branch campuses', value: 'UK & Australian universities' },
    ],
    overview:
      'Malaysia hosts campuses of well-known UK and Australian universities, alongside respected public and private Malaysian universities. Visa processing runs through Education Malaysia Global Services (EMGS): your university applies for you and you receive a Visa Approval Letter before you travel.',
    costs: {
      intro: 'Malaysia’s appeal is value. Branch-campus degrees cost less than studying in the UK or Australia, and living costs are moderate.',
      tuition: [
        { label: 'Private universities (per year)', value: 'About RM 20,000 – 45,000', verify: true },
        { label: 'Branch campuses (per year)', value: 'About RM 40,000 – 90,000', verify: true },
        { label: 'Public universities (per year)', value: 'Lower; varies by programme', verify: true },
      ],
      living: [
        { label: 'Living costs (per month)', value: 'About RM 1,500 – 2,500', verify: true },
      ],
      visaFees: [
        { label: 'EMGS application and student pass', value: 'Paid through your university', verify: true },
      ],
      scholarships: [
        { name: 'University merit scholarships', text: 'Most private universities and branch campuses offer partial tuition scholarships for strong grades.' },
        { name: 'Malaysia International Scholarship (MIS)', text: 'Government scholarship for postgraduate study; check whether it is open in your year.' },
      ],
      sources: [
        { label: 'Education Malaysia Global Services', url: 'https://educationmalaysia.gov.my/' },
        { label: 'EMGS application tracker', url: 'https://visa.educationmalaysia.gov.my/' },
      ],
    },
    requirements: {
      documents: [
        'Valid passport with at least 12 months’ validity',
        'Offer letter from a Malaysian institution',
        'Academic transcripts and certificates',
        'Passport photos and a pre-arrival medical examination',
        'Visa Approval Letter (VAL) issued through EMGS before travel',
      ],
      tests: [
        'IELTS, TOEFL, PTE or MUET at the level your programme requires',
        'Post-arrival medical screening, usually within a week of arrival',
      ],
      academics: 'Foundation programmes accept students after O-Levels or Matric; degree programmes need FSc, A-Levels or a foundation year. Master’s programmes need a recognised bachelor’s degree.',
      intakes: ['January/February', 'May', 'September'],
      deadlines: 'Apply 3 to 4 months ahead. EMGS processing takes several weeks after your university submits.',
    },
    destinations: {
      title: 'Where to study in Malaysia',
      intro: 'Most international students live in and around Kuala Lumpur, but branch campuses are spread across the country.',
      items: [
        { name: 'Kuala Lumpur', initials: 'KL', chips: ['Capital', 'Most universities'], text: 'The main study hub, with good transport and international food.' },
        { name: 'Selangor', initials: 'SE', chips: ['Branch campuses', 'Suburban'], text: 'Home to several branch and private campuses near KL.' },
        { name: 'Penang', initials: 'PE', chips: ['Island city', 'Engineering'], text: 'A historic island state with a strong public university.' },
        { name: 'Johor', initials: 'JH', chips: ['Near Singapore', 'Branch campuses'], text: 'Southern state with international branch campuses.' },
      ],
    },
    process: [
      { title: 'Free assessment', text: 'Programme, budget and campus preferences.' },
      { title: 'Apply and get an offer', text: 'We apply to your shortlisted universities.' },
      { title: 'EMGS application', text: 'Your university submits your student pass application.' },
      { title: 'Visa Approval Letter', text: 'Receive your VAL and single-entry visa, then book travel.' },
      { title: 'Arrival', text: 'Medical screening and student pass endorsement in your passport.' },
    ],
    whyUs: [
      { title: 'Branch campus comparison', text: 'We compare branch campuses and local universities on cost and degree awarded.' },
      { title: 'EMGS tracking', text: 'We follow your EMGS application and tell you what each stage means.' },
      { title: 'Foundation pathways', text: 'We help O-Level and Matric students choose a foundation programme.' },
    ],
    faqs: [
      { q: 'How much does it cost to study in Malaysia from Pakistan?', a: 'Private universities usually charge about RM 20,000 to 45,000 a year and branch campuses about RM 40,000 to 90,000. Living costs are around RM 1,500 to 2,500 a month. We confirm fees for your chosen programme.' },
      { q: 'What is EMGS?', a: 'Education Malaysia Global Services processes student pass applications for international students. Your university submits the application for you.' },
      { q: 'What is a Visa Approval Letter?', a: 'The VAL is issued once EMGS approves your application. You use it to get a single-entry visa and enter Malaysia as a student.' },
      { q: 'Can I work while studying in Malaysia?', a: 'Student pass holders have limited work rights, usually part-time during semester breaks in approved sectors. Do not plan your budget around work.' },
      { q: 'Are branch campus degrees the same as the main campus?', a: 'Usually the degree is awarded by the parent university in the UK or Australia. We check exactly what your certificate will say before you apply.' },
      { q: 'Is Malaysia good for Pakistani students?', a: 'Many Pakistani families like Malaysia because it is English-speaking, Muslim-majority and affordable, with halal food everywhere.' },
    ],
    cta: { title: 'Want a UK or Australian degree for less?', text: 'Ask us about branch campuses in Malaysia. We reply on WhatsApp.' },
    waMessage: 'Hi Prime Edge, I want to study in Malaysia. Can you suggest universities for me?',
  },
];

export const countryBySlug = (slug: string) => countries.find((c) => c.slug === slug);
