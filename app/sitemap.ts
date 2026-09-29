import type { MetadataRoute } from 'next';
import { countries } from '@/content/countries';
import { services } from '@/content/services';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly' | 'yearly' = 'monthly') => ({ url: absoluteUrl(path), lastModified: now, changeFrequency, priority });
  return [
    entry('/', 1, 'weekly'),
    ...countries.map((c) => entry(`/${c.slug}`, 0.9, 'weekly')),
    entry('/services', 0.7),
    ...services.map((s) => entry(`/services/${s.slug}`, 0.6)),
    entry('/about', 0.5),
    entry('/contact', 0.6),
    entry('/blog', 0.4, 'weekly'),
    entry('/privacy-policy', 0.2, 'yearly'),
  ];
}
