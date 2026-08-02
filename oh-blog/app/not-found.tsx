import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="section">
      <div className="wrap">
        <p className="eyebrow mb-4">404</p>
        <h1 className="display mb-8">Page not found</h1>
        <p className="text-lg text-ink-muted mb-10">
          The page you&rsquo;re looking for doesn&rsquo;t exist, or moved.
        </p>
        <Link
          href="/"
          className="meta border-b border-ink pb-1 hover:text-accent hover:border-accent transition-colors"
        >
          Back home →
        </Link>
      </div>
    </main>
  );
}
