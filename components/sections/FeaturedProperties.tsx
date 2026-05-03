import Link from "next/link";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { getListings } from "@/lib/guesty";

export async function FeaturedProperties() {
  const listings = await getListings();
  const featured = listings.slice(0, 3);

  return (
    <section className="bg-moroww-blush py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-moroww-orange mb-2">De collectie</p>
            <h2 className="font-bold text-moroww-black text-4xl md:text-5xl leading-tight">
              Uit de collectie
            </h2>
          </div>
          <Link
            href="/collectie"
            className="shrink-0 text-sm font-semibold text-moroww-black/60 hover:text-moroww-black underline underline-offset-4 transition-colors"
          >
            Bekijk alle woningen →
          </Link>
        </div>

        {featured.length === 0 ? (
          <p className="text-center text-moroww-black/40 py-16">Collectie wordt geladen…</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {featured.map(l => <PropertyCard key={l._id} listing={l} />)}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/collectie"
            className="inline-flex items-center rounded-full bg-moroww-orange hover:bg-moroww-orange-dark text-white font-semibold px-8 py-4 transition-colors duration-200"
          >
            Bekijk alle woningen
          </Link>
        </div>
      </div>
    </section>
  );
}
