"use client";

import { useState } from "react";
import type { GuestyListing } from "@/types/guesty";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { getRegion } from "@/lib/guesty";

const REGIONS = ["Alles", "Kust", "Ardennen", "Heuvelland"];

export function CollectieClient({ listings }: { listings: GuestyListing[] }) {
  const [filter, setFilter] = useState("Alles");

  const filtered = filter === "Alles"
    ? listings
    : listings.filter(l => getRegion(l.address?.city) === filter);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Filter chips */}
      <div className="flex gap-2 flex-wrap mb-10">
        {REGIONS.map(r => (
          <button
            key={r}
            onClick={() => setFilter(r)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-150 ${
              filter === r
                ? "bg-moroww-black text-white"
                : "bg-white text-moroww-black/60 hover:text-moroww-black border border-moroww-border"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="py-24 text-center text-moroww-black/40">
          <p className="text-lg">Geen woningen gevonden voor deze regio.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map(l => <PropertyCard key={l._id} listing={l} />)}
        </div>
      )}
    </div>
  );
}
