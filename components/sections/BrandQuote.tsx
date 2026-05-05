import Link from "next/link";

export function BrandQuote() {
  return (
    <section className="bg-moroww-blush py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <blockquote className="font-bold italic text-moroww-black text-3xl md:text-5xl leading-tight mb-8">
          &ldquo;A stay that works,<br className="hidden md:block" /> so you don&apos;t have to.&rdquo;
        </blockquote>
        <p className="text-moroww-black/55 text-base md:text-lg mb-4 leading-relaxed">
          Opgericht door Brent en Noam - twee ondernemers<br className="hidden md:block" />
          die de vakantieloterij beu waren.
        </p>
        <p className="text-moroww-black/35 text-sm font-normal mb-12">
          No worries for the day of moroww.
        </p>
        <Link
          href="/over-moroww"
          className="inline-flex items-center rounded-full border-2 border-moroww-black text-moroww-black hover:bg-moroww-black hover:text-white font-semibold px-8 py-3.5 transition-colors duration-200 text-sm"
        >
          Ons verhaal
        </Link>
      </div>
    </section>
  );
}
