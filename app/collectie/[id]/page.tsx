import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Users, MapPin, Wifi, Car, Flame, Waves } from "lucide-react";
import { getListingById, getCoverImage, getRegion } from "@/lib/guesty";

export const revalidate = 3600;

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  WiFi: <Wifi size={14} />,
  Parking: <Car size={14} />,
  Fireplace: <Flame size={14} />,
  Pool: <Waves size={14} />,
};

interface Props { params: { id: string } }

export async function generateMetadata({ params }: Props) {
  const listing = await getListingById(params.id);
  return { title: listing ? `${listing.title} — moroww` : "Woning — moroww" };
}

export default async function PropertyDetailPage({ params }: Props) {
  const listing = await getListingById(params.id);
  if (!listing) notFound();

  const cover  = getCoverImage(listing);
  const region = getRegion(listing.address?.city);
  const price  = listing.prices?.basePrice;
  const desc   = listing.publicDescription?.summary ?? listing.publicDescription?.space;

  return (
    <div className="bg-moroww-blush min-h-screen">
      {/* Hero image */}
      <div className="relative w-full h-[60vh] bg-moroww-black">
        <Image src={cover} alt={listing.title} fill className="object-cover opacity-90" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-moroww-blush via-transparent to-transparent" />
      </div>

      <div className="mx-auto max-w-5xl px-6 -mt-20 relative z-10 pb-32">
        <div className="grid lg:grid-cols-[1fr_340px] gap-10 items-start">

          {/* Left: details */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-moroww-orange mb-2">{region}</p>
            <h1 className="font-bold text-moroww-black text-4xl md:text-5xl leading-tight mb-6">
              {listing.title}
            </h1>

            {/* Specs */}
            <div className="flex flex-wrap gap-5 text-sm text-moroww-black/60 mb-8">
              {listing.address?.city && (
                <span className="flex items-center gap-1.5"><MapPin size={15} />{listing.address.city}</span>
              )}
              {listing.bedrooms != null && (
                <span className="flex items-center gap-1.5"><BedDouble size={15} />{listing.bedrooms} slaapkamers</span>
              )}
              {listing.bathrooms != null && (
                <span className="flex items-center gap-1.5"><Bath size={15} />{listing.bathrooms} badkamers</span>
              )}
              {listing.accommodates != null && (
                <span className="flex items-center gap-1.5"><Users size={15} />Max {listing.accommodates} gasten</span>
              )}
            </div>

            {/* Description */}
            {desc && (
              <div className="max-w-prose mb-10">
                <h2 className="font-semibold text-lg text-moroww-black mb-3">Over dit verblijf</h2>
                <p className="text-moroww-black/65 leading-relaxed text-base">{desc}</p>
              </div>
            )}

            {/* Amenities */}
            {(listing.amenities?.length ?? 0) > 0 && (
              <div>
                <h2 className="font-semibold text-lg text-moroww-black mb-4">Voorzieningen</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {listing.amenities!.map(a => (
                    <div key={a} className="flex items-center gap-2 text-sm text-moroww-black/65">
                      <span className="text-moroww-orange">{AMENITY_ICONS[a] ?? "·"}</span>
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: booking CTA (sticky) */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-2xl bg-white shadow-sm p-7">
              {price != null && (
                <div className="mb-6">
                  <span className="font-bold text-3xl text-moroww-black">€ {price}</span>
                  <span className="text-moroww-black/50 text-sm ml-1">/ nacht</span>
                </div>
              )}
              <a
                href={listing.externalLinks?.[0]?.url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center rounded-full bg-moroww-orange hover:bg-moroww-orange-dark text-white font-semibold py-4 transition-colors duration-200"
              >
                Beschikbaarheid checken
              </a>
              <p className="text-xs text-moroww-black/40 text-center mt-4 leading-relaxed">
                Je wordt doorgestuurd naar onze boekingspagina.
              </p>
            </div>
            <div className="mt-4 text-center">
              <Link href="/collectie" className="text-xs text-moroww-black/40 hover:text-moroww-black transition-colors underline underline-offset-2">
                ← Terug naar collectie
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
