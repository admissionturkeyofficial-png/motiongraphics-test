import type { Metadata, Viewport } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { JsonLd } from '@/components/seo';
import { organizationSchema } from '@/lib/seo';
import { site } from '@/content/site';
import '@/styles/kit.css';
import '@/styles/site.css';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-display', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Study Abroad from Pakistan`, template: `%s | ${site.shortName}` },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0b1c3e',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PK" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="pe-canvas">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  );
}
