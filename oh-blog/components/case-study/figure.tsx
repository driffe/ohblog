interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

/** Hairline-bordered image with a .meta caption, matching the hero-image pattern in app/work/[slug]/page.tsx. */
export function Figure({ src, alt, caption, className = "" }: FigureProps) {
  return (
    <figure className={`my-8 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full border border-rule" loading="lazy" />
      {caption && <figcaption className="meta mt-3">{caption}</figcaption>}
    </figure>
  );
}
