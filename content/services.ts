// Services offered. TODO: client to confirm this list matches what Prime Edge actually provides.

export type IconName = 'arrow' | 'send' | 'cap' | 'visa' | 'award' | 'home' | 'chat' | 'check' | 'whatsapp' | 'compass' | 'book' | 'plane';

export type Service = {
  slug: string;
  name: string;
  icon: IconName;
  short: string; // one-line card description
  cta: string; // card link label, says where the link goes
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  includes: string[];
  steps: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: 'counselling',
    cta: 'Book a counselling session',
    name: 'Career counselling',
    icon: 'chat',
    short: 'A one-to-one session to match your grades, budget and goals to the right country and course.',
    metaTitle: 'Study Abroad Counselling in Pakistan | Prime Edge',
    metaDescription: 'Free one-to-one study abroad counselling for Pakistani students. Compare countries, courses and total costs before you apply.',
    h1: 'Study abroad counselling that starts with your budget and goals',
    intro:
      'Most students come to us with a country in mind and a lot of questions. In the first session we look at your marks, your budget for fees and living costs, and the career you want. Then we tell you honestly which options are realistic and which are not.',
    includes: [
      'Profile review of your transcripts, gaps and English test status',
      'Side-by-side comparison of countries by total cost, not just tuition',
      'Course and career-path advice, including post-study work options',
      'A written shortlist you can discuss with your family',
    ],
    steps: [
      { title: 'Share your documents', text: 'Send your latest transcripts and passport details on WhatsApp or bring them to the office.' },
      { title: 'Talk it through', text: 'A counsellor walks you and your parents through two or three realistic plans.' },
      { title: 'Get your shortlist', text: 'You leave with a shortlist of universities, intakes and an estimated budget.' },
    ],
    faqs: [
      // TODO: client to confirm the fee policy; the site promises a free first assessment throughout.
      { q: 'Is the first counselling session free?', a: 'Yes. The first assessment is free and there is no obligation to apply through us.' },
      { q: 'Can my parents join the session?', a: 'Yes, and we encourage it. Most decisions about study abroad are family decisions, so we explain costs and timelines to everyone at once.' },
      { q: 'Do you counsel students with a study gap?', a: 'Yes. A gap is not the end of the road. We look at how to explain it in your application and which universities are more flexible about it.' },
    ],
  },
  {
    slug: 'admission',
    cta: 'How admission works',
    name: 'University admission',
    icon: 'cap',
    short: 'We shortlist universities, prepare your application and follow up until the offer arrives.',
    metaTitle: 'University Admission Support Abroad | Prime Edge',
    metaDescription: 'Admission support for Pakistani students applying abroad: university shortlisting, SOP review, applications and offer letters.',
    h1: 'University admission support from shortlist to offer letter',
    intro:
      'A strong application is more than a form. We help you choose universities where your profile fits, prepare each document to the standard admissions teams expect, and track every application so nothing is missed.',
    includes: [
      'University and programme shortlisting based on your profile',
      'Statement of purpose and CV review',
      'Reference letter guidance for teachers and employers',
      'Application submission and follow-up with the university',
      'Help accepting your offer and paying the deposit safely',
    ],
    steps: [
      { title: 'Shortlist', text: 'We agree on three to six universities together.' },
      { title: 'Prepare documents', text: 'Transcripts, SOP, CV, references and English test results are checked before anything is sent.' },
      { title: 'Apply and track', text: 'We submit or guide each application and chase the university for updates.' },
      { title: 'Accept your offer', text: 'We explain the conditions in your offer and the next step towards your visa.' },
    ],
    faqs: [
      { q: 'How many universities should I apply to?', a: 'Usually three to six. Fewer can be risky; many more wastes application fees and makes each application weaker.' },
      { q: 'Will you write my statement of purpose?', a: 'No. Admissions teams and visa officers expect it to be your own work. We guide the structure and review your drafts until they are clear and honest.' },
      { q: 'What documents do I need to start?', a: 'Your passport, academic transcripts and certificates, an English test result or proof of English-medium study, and a CV if you have work experience.' },
    ],
  },
  {
    slug: 'test-preparation',
    cta: 'Which test to take',
    name: 'English test guidance',
    icon: 'book',
    short: 'Advice on IELTS, PTE or Duolingo: which test each university accepts and the score you need.',
    metaTitle: 'IELTS, PTE & Duolingo Guidance for Study Abroad | Prime Edge',
    metaDescription: 'Find out which English test your university and visa accept, the score you need and how to book it from Pakistan.',
    h1: 'English test guidance: IELTS, PTE and Duolingo',
    intro:
      'Different countries, universities and visas accept different English tests. Booking the wrong one costs money and time. We check exactly which test and score your chosen universities and visa route accept before you book.',
    includes: [
      'Which test to take for your universities and visa (for example IELTS for UKVI for UK visas)',
      'Target scores for each university on your shortlist',
      'Guidance on English-medium waivers where universities accept them',
      'Booking advice and test-day preparation tips',
    ],
    steps: [
      { title: 'Check requirements', text: 'We list the accepted tests and minimum scores for every university on your shortlist.' },
      { title: 'Book the right test', text: 'You book the version your visa route accepts, at a date that fits the intake.' },
      { title: 'Use your result', text: 'We attach your score to applications and plan around any conditions.' },
    ],
    faqs: [
      // TODO: client to confirm whether Prime Edge runs in-house IELTS/PTE classes; if so, add a FAQ saying so.
      { q: 'Can I study abroad without IELTS?', a: 'Sometimes. Some universities accept PTE, Duolingo or an English-medium letter instead. Visa rules differ by country, so we check both before you decide.' },
    ],
  },
  {
    slug: 'scholarships',
    cta: 'Find scholarships',
    name: 'Scholarships',
    icon: 'award',
    short: 'We match your profile to merit and government scholarships and help you apply on time.',
    metaTitle: 'Scholarships for Pakistani Students Abroad | Prime Edge',
    metaDescription: 'Find merit, university and government scholarships for Pakistani students in the UK, USA, Europe, Turkey, China and more.',
    h1: 'Scholarships for Pakistani students studying abroad',
    intro:
      'Scholarships can cut your costs a lot, but deadlines are early and competition is real. We look for university merit awards and government scholarships you actually qualify for, and help you apply before the deadlines close.',
    includes: [
      'Scholarship search matched to your grades and course',
      'University merit discounts and early-payment offers',
      'Government schemes such as Türkiye Scholarships and the Chinese Government (CSC) Scholarship',
      'Essay and document review for scholarship applications',
    ],
    steps: [
      { title: 'Match', text: 'We list scholarships where your profile meets the criteria.' },
      { title: 'Plan deadlines', text: 'Many scholarships close months before the intake, so we build your timeline backwards from them.' },
      { title: 'Apply', text: 'We review essays and documents before you submit.' },
    ],
    faqs: [
      { q: 'Can you guarantee a scholarship?', a: 'No one honestly can. Scholarships are decided by universities and governments. What we can do is find the ones you qualify for and help you submit a strong application on time.' },
      { q: 'Are fully funded scholarships available?', a: 'Yes, a few, such as Türkiye Scholarships and the CSC Scholarship in China. They are very competitive, so we usually apply for a funded scholarship and a partial merit award in parallel.' },
    ],
  },
  {
    slug: 'visa',
    cta: 'See the visa process',
    name: 'Visa file preparation',
    icon: 'visa',
    short: 'Document checklist, financial evidence, appointment booking and interview practice.',
    metaTitle: 'Student Visa Filing Support in Pakistan | Prime Edge',
    metaDescription: 'Student visa file preparation for the UK, USA, Australia, Schengen, Turkey, China and Malaysia. Checklists, bank statements and interview prep.',
    h1: 'Student visa file preparation, checked before you submit',
    intro:
      'Most visa refusals come from avoidable problems: missing documents, unclear funds or weak answers at interview. We prepare your file against the official checklist for your country and practise the interview with you.',
    includes: [
      'Country-specific document checklist based on the official guidance',
      'Review of bank statements and sponsor documents',
      'Help with HEC and IBCC attestation where your university or visa needs it',
      'Online application form review and appointment booking',
      'Mock visa interview',
    ],
    steps: [
      { title: 'Checklist', text: 'You get the exact list for your country and visa type.' },
      { title: 'Collect and review', text: 'We review every document, including financial evidence, before submission.' },
      { title: 'Apply', text: 'We help you complete the form and book biometrics or an interview.' },
      { title: 'Prepare', text: 'You practise the interview questions most likely to come up.' },
    ],
    faqs: [
      { q: 'Can you guarantee my visa?', a: 'No. Only the embassy or immigration authority decides. Anyone promising a guaranteed visa is not being honest with you.' },
      { q: 'How early should I start my visa file?', a: 'As soon as you accept an offer. Some documents, such as attested degrees and bank statements covering a set period, take weeks to arrange.' },
    ],
  },
  {
    slug: 'accommodation',
    cta: 'Plan your arrival',
    name: 'Accommodation & departure',
    icon: 'home',
    short: 'Help finding a hostel or flat, plus a pre-departure briefing so your first week is calm.',
    metaTitle: 'Student Accommodation & Pre-Departure Help | Prime Edge',
    metaDescription: 'Student accommodation guidance and pre-departure briefings for Pakistani students moving abroad for university.',
    h1: 'Accommodation and pre-departure support',
    intro:
      'Once the visa is approved, the practical questions start: where to live, what to pack, how to get from the airport. We help you book safe student housing and brief you on your first weeks.',
    includes: [
      'University hostel or private student housing guidance',
      'Pre-departure briefing: packing, money, SIM cards and registration',
      'Airport pickup guidance where the university offers it',
      'Contacts of other Pakistani students where available',
    ],
    steps: [
      { title: 'Choose housing', text: 'We compare university halls and private options by cost and distance.' },
      { title: 'Book safely', text: 'We explain contracts and deposits so you only pay verified providers.' },
      { title: 'Get briefed', text: 'A short session on your first two weeks: registration, bank, residence permit.' },
    ],
    faqs: [
      { q: 'Should I book university housing or a private flat?', a: 'For your first year, university housing is usually simpler and safer. You can move to a shared flat later when you know the city.' },
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
