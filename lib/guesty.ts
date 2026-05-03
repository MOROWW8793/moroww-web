import type { GuestyListing, GuestyListResponse } from "@/types/guesty";

const AUTH_URL = "https://auth.guesty.com/oauth2/token";
const BASE_URL = "https://open-api.guesty.com/v1";

async function getGuestyToken(): Promise<string> {
  const response = await fetch(AUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope: "open-api",
      client_id: process.env.GUESTY_CLIENT_ID!,
      client_secret: process.env.GUESTY_CLIENT_SECRET!,
    }),
    next: { revalidate: 82800 }, // token 23u cachen
  });

  if (!response.ok) {
    console.error("[guesty] token request failed:", response.status);
    return "";
  }

  const data = await response.json();
  return data.access_token ?? "";
}

// ── Mock data voor development ─────────────────────────────────────────────
function getMockListings(): GuestyListing[] {
  return [
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
}

export async function getListings(): Promise<GuestyListing[]> {
  if (
    !process.env.GUESTY_CLIENT_ID ||
    process.env.GUESTY_CLIENT_ID === "placeholder"
  ) {
    console.warn("[guesty] credentials niet ingesteld — mock data");
    return getMockListings();
  }

  const token = await getGuestyToken();
  if (!token) return getMockListings();

  try {
    const response = await fetch(
      `${BASE_URL}/listings?limit=25&skip=0`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      console.error("[guesty] API error:", response.status);
      return getMockListings();
    }

    const data: GuestyListResponse = await response.json();
    return data.results ?? [];
  } catch (err) {
    console.error("[guesty] fetch error:", err);
    return getMockListings();
  }
}

export async function getListingById(id: string): Promise<GuestyListing | null> {
  if (id.startsWith("mock-")) {
    return getMockListings().find((l) => l._id === id) ?? null;
  }

  if (
    !process.env.GUESTY_CLIENT_ID ||
    process.env.GUESTY_CLIENT_ID === "placeholder"
  ) {
    return getMockListings().find((l) => l._id === id) ?? null;
  }

  const token = await getGuestyToken();
  if (!token) return null;

  try {
    const response = await fetch(`${BASE_URL}/listings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;
    return response.json();
  } catch (err) {
    console.error("[guesty] getListingById error:", err);
    return null;
  }
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
  if (["knokke", "oostende", "de haan", "blankenberge", "kust"].some((k) => c.includes(k))) return "Kust";
  if (["durbuy", "spa", "ardennen", "malmedy", "dinant"].some((k) => c.includes(k))) return "Ardennen";
  if (["beernem", "aalter", "maldegem", "eeklo", "meetjesland"].some((k) => c.includes(k))) return "Meetjesland";
  if (["ronse", "geraardsbergen", "vlaamse ardennen"].some((k) => c.includes(k))) return "Vlaamse Ardennen";
  return city;
}
