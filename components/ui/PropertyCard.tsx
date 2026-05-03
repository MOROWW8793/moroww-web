import Link from "next/link";
import Image from "next/image";
import { BedDouble, Users } from "lucide-react";
import type { GuestyListing } from "@/types/guesty";
import { getCoverImage, getRegion } from "@/lib/guesty";

export function PropertyCard({ listing }: { listing: GuestyListing }) {
  const id     = listing._id;
  const cover  = getCoverImage(listing);
  const region = getRegion(listing.address?.city);
  const price  = listing.prices?.basePrice;

  return (
    <Link
      href={`/collectie/${id}`}
      className="group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={cover}
          alt={listing.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="text-xs font-medium text-moroww-orange mb-1">{region}</p>
        <h3 className="font-semibold text-moroww-black text-lg leading-tight mb-3">
          {listing.title}
        </h3>

        <div className="flex items-center gap-4 text-sm text-moroww-black/50 mb-4">
          {listing.bedrooms != null && (
            <span className="flex items-center gap-1.5">
              <BedDouble size={14} />
              {listing.bedrooms} {listing.bedrooms === 1 ? "kamer" : "kamers"}
            </span>
          )}
          {listing.accommodates != null && (
            <span className="flex items-center gap-1.5">
              <Users size={14} />
              {listing.accommodates} gasten
            </span>
          )}
        </div>

        {price != null && (
          <p className="text-moroww-black">
            <span className="font-bold text-xl">€ {price}</span>
            <span className="text-sm font-normal text-moroww-black/50"> / nacht</span>
          </p>
        )}
      </div>
    </Link>
  );
}
