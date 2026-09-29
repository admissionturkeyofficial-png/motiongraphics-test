import { countries, countryBySlug } from '@/content/countries';
import { OG_SIZE, ogCard } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Prime Edge Overseas Education';

export function generateStaticParams() {
  return countries.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = countryBySlug(slug)!;
  return ogCard({ title: c.h1, eyebrow: `Study in ${c.inName} from Pakistan`, flag: c.flag });
}
