import { getListings } from "@/lib/guesty";
import { CollectieClient } from "./CollectieClient";

export const revalidate = 3600;

export const metadata = {
  title: "Collectie — moroww",
  description: "Ontdek onze gecureerde selectie vakantiewoningen in België.",
};

export default async function CollectiePage() {
  const listings = await getListings();
  return (
    <div className="min-h-screen bg-moroww-blush">
      {/* Page header */}
      <div className="bg-white border-b border-moroww-border px-6 py-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-moroww-orange mb-3">Gecureerde selectie</p>
        <h1 className="font-bold text-moroww-black text-4xl md:text-6xl">De collectie</h1>
        <p className="mt-4 text-moroww-black/55 text-lg max-w-md mx-auto">
          Elk verblijf fysiek geïnspecteerd. Elk detail gecheckt.
        </p>
      </div>

      <CollectieClient listings={listings} />
    </div>
  );
}
