import Link from 'next/link';
import { Breadcrumbs } from '@/components/seo';
import { Flag, SectionHead } from '@/components/ui';
import { countries } from '@/content/countries';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Study Abroad Blog for Pakistani Students | Prime Edge',
  description: 'Guides on costs, visas, scholarships and university choices for Pakistani students planning to study abroad.',
  path: '/blog',
});

// Blog index, ready for posts. Add posts as MDX or a CMS later; see README.
const posts: { slug: string; title: string; excerpt: string; date: string }[] = [];

export default function BlogPage() {
  return (
    <>
      <section className="section page-hero" aria-labelledby="blog-h1">
        <div className="wrap">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }]} />
          <p className="pe-eyebrow">Blog</p>
          <h1 id="blog-h1" className="hero-title">Study abroad guides for Pakistani students</h1>
          <p className="hero-sub">Plain-language guides on costs, visas and scholarships. New articles are on the way.</p>
        </div>
      </section>
      <section className="section-tight">
        <div className="wrap">
          {posts.length === 0 ? (
            <div className="empty-state pe-glass">
              <h2 className="card-h">Articles coming soon</h2>
              <p>In the meantime, our destination guides answer the most common questions about costs, requirements and visas.</p>
              <ul className="chip-strip wrap-strip">
                {countries.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/${c.slug}`} className="pe-flag-chip pe-glass pe-shine">
                      <Flag code={c.flag} size={32} /> Study in {c.short}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <>
              <SectionHead title="Latest articles" />
              <ul className="card-grid">
                {posts.map((p) => (
                  <li key={p.slug} className="pe-card pe-glass">
                    <h3>{p.title}</h3>
                    <p>{p.excerpt}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
    </>
  );
}
