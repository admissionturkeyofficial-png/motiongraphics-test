import { OG_SIZE, ogCard } from '@/lib/og';
import { home } from '@/content/home';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Prime Edge Overseas Education — study abroad from Pakistan';

export default async function Image() {
  return ogCard({ title: home.h1, eyebrow: 'Study abroad from Pakistan', flag: 'pk' });
}
