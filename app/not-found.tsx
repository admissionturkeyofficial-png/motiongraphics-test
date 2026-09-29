import { ButtonLink } from '@/components/ui';

export default function NotFound() {
  return (
    <section className="section page-hero">
      <div className="wrap narrow center">
        <p className="pe-eyebrow">404</p>
        <h1 className="hero-title">This page took a different flight</h1>
        <p className="hero-sub">The page you’re looking for doesn’t exist. Try one of our destinations instead.</p>
        <div className="hero-actions center">
          <ButtonLink href="/" iconRight="arrow">
            Back to home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
