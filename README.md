# Prime Edge Overseas Education — website

Multi-page marketing site for **Prime Edge Overseas Education (Pvt Ltd)**, a Pakistan-based study-abroad consultancy. Built with Next.js (App Router, TypeScript). Every page is statically generated, so all content ships as crawlable HTML.

- **Home** (`/`): hero with a WebGL globe. It spins in, decelerates, lands over Europe and Asia, then pops in glass pins for the eight destinations with arcs from Lahore. A crawlable flag dock sits under the globe.
- **Eight country landing pages** (`/study-in-uk`, `/study-in-usa`, `/study-in-australia`, `/study-in-europe`, `/study-in-turkey`, `/study-in-kyrgyzstan`, `/study-in-china`, `/study-in-malaysia`), all generated from one template and one data file.
- **Services** (`/services` + six service pages), **About**, **Contact**, **Blog** index (ready for posts), **Privacy policy**.
- **SEO:** per-page metadata and canonical URLs, generated Open Graph images (flag + H1), and JSON-LD (`EducationalOrganization`/`LocalBusiness`, `BreadcrumbList`, `FAQPage`, `Service`). Also `sitemap.xml` and `robots.txt`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all pages prerendered)
npm start          # serve the production build
npm run typecheck
```

Node 20+ is required. The build downloads Montserrat and Inter from Google Fonts once via `next/font` and self-hosts them.

### Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production origin, e.g. `https://www.primeedge.pk`. Used for canonical URLs, the sitemap and Open Graph. |
| `NEXT_PUBLIC_LEAD_ENDPOINT` | URL that receives assessment-form leads as a JSON `POST`: Formspree, a Google Apps Script web app writing to Sheets, or a CRM webhook. **If unset, the form opens WhatsApp with the lead's details pre-filled**, so no lead is lost. |

## Deploy

**Vercel (recommended):** import the repo, set the two environment variables above, and deploy. No other configuration is needed.

**Any Node host:** run `npm run build`, then `npm start`.

## Edit content

All copy and business data live in `/content`. No component changes are needed for routine edits.

| File | What it holds |
| --- | --- |
| `content/site.ts` | Company name, WhatsApp numbers, address, email, social links, trust-bar numbers, testimonials, lead endpoint |
| `content/countries.ts` | Everything on the eight landing pages: H1, meta, costs, requirements, universities, process, FAQs, WhatsApp message, globe pin |
| `content/services.ts` | The six services and their pages |
| `content/home.ts` | Home page copy and FAQs |

- **Add a testimonial:** push an object to `testimonials` in `content/site.ts`, with `country` set to the landing-page slug. Placeholder cards disappear automatically. Use only real students who have given written permission.
- **Trust-bar numbers:** fill `site.stats`. While a value is `null`, the site shows a visible `{{PLACEHOLDER}}` so nothing invented ships.
- **Fees and visa rules:** each figure marked `verify: true` shows an "indicative" asterisk and links to its official source. Re-check them every intake.
- **Add a destination:** add an entry to `content/countries.ts`, add its flag SVG to `public/flags/`, add its ISO numeric id to the highlight list in `scripts/build-globe-data.mjs`, then run `npm run globe-data`.

### Globe data

`npm run globe-data` regenerates three things from the `world-atlas` and `flag-icons` packages:
- `public/data/land-dots.json`: H3 cell centres over land, precomputed so the browser does no hex-binning;
- `public/data/world-dots.svg`: the no-WebGL fallback map;
- `public/flags/*.svg`.

It is only needed when the map or the flags change.

## How the globe behaves

- The H1 and CTAs render first as static HTML. three.js loads afterwards through `next/dynamic` (`ssr: false`) during browser idle time.
- `prefers-reduced-motion`: no spin; the globe appears at its final view and the pins appear together.
- No WebGL, or a very low-end device (≤2 cores, ≤1 GB memory, or Save-Data on): a static dotted world map with the eight flags as links.
- **Desktop:** drag to rotate. Hovering a dock chip turns the globe to that country; clicking a pin zooms in, then navigates.
- **Touch screens:** the globe stays still so it never traps page scrolling. Pins show flags only and the dock scrolls sideways.
- Far-side pins (for example USA and Australia) fade out when they face away from the camera.
- `three/webgpu` and `three/tsl` are aliased to stubs in `next.config.ts` because the globe never uses them. This removes about 700 KB of JavaScript.

## Design system

Tokens and the glass components were ported from the supplied glass UI kit onto colours sampled from the logo:
- navy `#0B1C3E`
- azure `#1B7EC1` (a darker `#156BA8` for small text)
- sky `#039CEC`

`styles/kit.css` mirrors the published Prime Edge design system. `styles/site.css` handles page layout. The kit's muted grey was darkened to `#5F6A8C` to pass WCAG AA on the page background.

Logo files are in `public/brand/`:
- full-colour lockup for light grounds;
- white knockout for navy and blue-glass grounds;
- shield mark on its own.

All were cut from the supplied artwork, not redrawn.

## QA status (at handover)

- `npm run build` and `tsc` pass. All 35 routes are prerendered.
- Checked in headless Chromium:
  - intro, pin pop-in and far-side fade;
  - pin click routes to the right page;
  - all eight dock links return 200 with one unique H1;
  - reduced-motion path;
  - no-WebGL fallback;
  - mega-menu;
  - 390px and 1440px layouts.
- Every page's meta title is ≤ 60 characters and every meta description ≤ 155. JSON-LD parses on every page.
- Lighthouse (mobile), measured in a CI container with software WebGL:

  | Page | Performance | Accessibility | Best practices | SEO |
  | --- | --- | --- | --- | --- |
  | Country pages | 91–92 | 100 | 100 | 100 |
  | Home | about 61 | 100 | 100 | 100 |

  CLS is 0 on all pages. The home score is held back by a single WebGL start-up task, which runs on the CPU in a container without a GPU. **Re-measure the home page on a real phone with PageSpeed Insights** before deciding whether to defer the globe further on mobile.
- Still to do after deployment: validate the schema in Google's Rich Results Test.

## Client TODOs before launch

The site contains no invented facts. Everything below is a visible placeholder, a code comment, or a figure flagged for verification.

**Business details (`content/site.ts`)**
- [ ] Production domain (`NEXT_PUBLIC_SITE_URL`)
- [ ] Email address
- [ ] Office street address, city, postal code; confirm region (Punjab)
- [ ] Office hours
- [ ] Year established (`foundedYear`, and `stats.yearEstablished`)
- [ ] Google Maps embed URL for the Contact page
- [ ] Social links: Facebook, Instagram, LinkedIn, YouTube, TikTok
- [ ] Trust-bar numbers: `{{STUDENTS_PLACED}}`, `{{PARTNER_UNIVERSITIES}}`, `{{YEAR_ESTABLISHED}}`
- [ ] Real testimonials: name, programme, university, destination, written permission, optional photo
- [ ] Lead endpoint (`NEXT_PUBLIC_LEAD_ENDPOINT`): Google Sheets, email or CRM

**Claims to confirm**
- [ ] The free first assessment / fee policy (promised site-wide)
- [ ] The service list (`content/services.ts`), including whether in-house IELTS/PTE classes are offered
- [ ] "Why us" points on each country page (`whyUs` in `content/countries.ts`) and on the home page (`home.why`)
- [ ] Which Schengen countries Prime Edge actively handles (Europe page lists Germany, France, Italy, Hungary, Netherlands, Poland)
- [ ] Kyrgyzstan partner universities (Ala-Too International University; University of South Asia, Bishkek Campus; IUK-ISM; KSMA): current partnership status, plus a WDOMS link for each
- [ ] About page: founder story, team names and photos, SECP registration number
- [ ] Privacy policy: legal review and effective date

**Figures to verify against official sources (50 items flagged `verify: true` in `content/countries.ts`)**
- [ ] **UK:** visa fee (£524), IHS (£776/yr), maintenance funds (£1,483 / £1,136 per month), tuition ranges, Graduate Route length and the announced 18-month change
- [ ] **USA:** SEVIS fee ($350), MRV fee ($185), status of the 2025 visa integrity fee, tuition and living ranges, OPT/STEM OPT
- [ ] **Australia:** visa fee (AUD 2,000), living-cost figure (AUD 29,710), tuition ranges, subclass 485 terms, work-hour limit
- [ ] **Europe:** German blocked account (€11,904 for 2025; check the current year), French and Italian public fees, D-visa fee
- [ ] **Turkey:** public/private fee ranges, living costs, residence-permit steps
- [ ] **Kyrgyzstan:** tuition and hostel ranges, programme length, current PM&DC rules (MDCAT, minimum marks, NLE)
- [ ] **China:** tuition ranges, CSC timeline, HSK requirement for MBBS
- [ ] **Malaysia:** tuition ranges, EMGS steps, student work rights

## Project structure

```
app/                      routes (App Router); [slug] = country landing pages
components/               Navbar, Footer, LeadForm, UI kit (ui.tsx), globe/
content/                  all editable copy and data
lib/                      SEO helpers, OG image renderer, build stubs
public/brand|flags|data   logos, flag-icons SVGs, globe data
scripts/build-globe-data.mjs
styles/kit.css            design-system glass components
styles/site.css           page layout
```

Credits: flags from [flag-icons](https://github.com/lipis/flag-icons) (MIT). Country shapes from [world-atlas](https://github.com/topojson/world-atlas) (Natural Earth, public domain). Globe by [react-globe.gl](https://github.com/vasturiano/react-globe.gl).
