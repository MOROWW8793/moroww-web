import type { GuestyListing, GuestyListResponse } from "@/types/guesty";

const BASE_URL = "https://open-api.guesty.com/v1";

function getToken(): string {
  const token = process.env.GUESTY_API_TOKEN;
  if (!token || token === "placeholder_vervang_dit_later") {
    console.warn("[guesty] GUESTY_API_TOKEN is a placeholder — using mock data");
    return "";
  }
  return token;
}

async function guestyFetch<T>(path: string): Promise<T | null> {
  const token = getToken();
  if (!token) return null;

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.error(`[guesty] ${path} → ${res.status} ${res.statusText}`);
      return null;
    }
    return res.json() as Promise<T>;
  } catch (err) {
    console.error("[guesty] fetch error:", err);
    return null;
  }
}

// ── Mock data for development ──────────────────────────────────────────────
const MOCK_LISTINGS: GuestyListing[] = [
  {
    _id: "mock-1",
    title: "Villa aan de Kust",
    nickname: "Kust Villa",
    address: { city: "Knokke-Heist", country: "Belgium" },
    bedrooms: 4,
    bathrooms: 2,
    accommodates: 8,
    picture: {
      thumbnail: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
      regular: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80",
    },
    prices: { basePrice: 395, currency: "EUR" },
    publicDescription: {
      summary: "Een uitzonderlijke villa op wandelafstand van zee. Elk detail zorgvuldig gekozen voor een verblijf dat klopt.",
    },
    amenities: ["WiFi", "Parking", "Pool", "Garden", "Kitchen"],
    active: true,
  },
  {
    _id: "mock-2",
    title: "Ardennen Retreat",
    nickname: "Forest House",
    address: { city: "Durbuy", country: "Belgium" },
    bedrooms: 3,
    bathrooms: 2,
    accommodates: 6,
    picture: {
      thumbnail: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
      regular: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80",
    },
    prices: { basePrice: 280, currency: "EUR" },
    publicDescription: {
      summary: "Midden in de Ardennen, omgeven door bos. Rust die je echt voelt. Een verblijf dat je onthoudt.",
    },
    amenities: ["WiFi", "Fireplace", "Hot Tub", "Garden", "Kitchen"],
    active: true,
  },
  {
    _id: "mock-3",
    title: "Heuvelland Boerderij",
    nickname: "Heuvelland",
    address: { city: "Beernem", country: "Belgium" },
    bedrooms: 5,
    bathrooms: 3,
    accommodates: 10,
    picture: {
      thumbnail: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800&q=80",
      regular: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=1200&q=80",
    },
    prices: { basePrice: 450, currency: "EUR" },
    publicDescription: {
      summary: "Gerestaureerde hoeve midden in het Heuvelland. Groot, authentiek, perfect voor families die écht samen willen zijn.",
    },
    amenities: ["WiFi", "Parking", "Garden", "Fireplace", "Kitchen", "BBQ"],
    active: true,
  },
];

export async function getListings(): Promise<GuestyListing[]> {
  const data = await guestyFetch<GuestyListResponse>("/listings?limit=20&active=true");
  if (!data) return MOCK_LISTINGS;
  return data.results ?? MOCK_LISTINGS;
}

export async function getListingById(id: string): Promise<GuestyListing | null> {
  if (id.startsWith("mock-")) {
    return MOCK_LISTINGS.find(l => l._id === id) ?? null;
  }
  return guestyFetch<GuestyListing>(`/listings/${id}`);
}

export function getCoverImage(listing: GuestyListing): string {
  return (
    listing.pictures?.[0]?.original ??
    listing.picture?.regular ??
    listing.picture?.thumbnail ??
    "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80"
  );
}

export function getRegion(city?: string): string {
  if (!city) return "België";
  const c = city.toLowerCase();
  if (["knokke", "oostende", "de haan", "blankenberge"].some(k => c.includes(k))) return "Kust";
  if (["durbuy", "spa", "ardennen", "malmedy"].some(k => c.includes(k))) return "Ardennen";
  if (["beernem", "aalter", "heuvelland"].some(k => c.includes(k))) return "Heuvelland";
  return city;
}
