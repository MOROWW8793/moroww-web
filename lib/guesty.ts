import type { GuestyListing, GuestyListResponse } from "@/types/guesty";
import { createClient } from "@supabase/supabase-js";

const BASE_URL = "https://open-api.guesty.com/v1";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

async function fetchFreshToken(): Promise<string> {
  if (!process.env.GUESTY_CLIENT_ID || !process.env.GUESTY_CLIENT_SECRET) {
    throw new Error("Guesty credentials niet ingesteld");
  }

  const response = await fetch("https://open-api.guesty.com/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope: "open-api",
      client_id: process.env.GUESTY_CLIENT_ID,
      client_secret: process.env.GUESTY_CLIENT_SECRET,
    }).toString(),
    cache: "no-store",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Token request failed: ${response.status} ${JSON.stringify(error)}`);
  }

  const data = await response.json();
  return data.access_token as string;
}

export async function getGuestyToken(): Promise<string> {
  const supabase = getSupabase();

  // 1. Probeer geldig gecached token uit Supabase
  const { data: cached } = await supabase
    .from("guesty_token_cache")
    .select("access_token, expires_at")
    .eq("id", "singleton")
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();

  if (cached?.access_token) {
    return cached.access_token as string;
  }

  // 2. Token ontbreekt of verlopen — haal nieuw op
  const token = await fetchFreshToken();

  const expiresAt = new Date(Date.now() + 23 * 60 * 60 * 1000).toISOString();

  await supabase.from("guesty_token_cache").upsert(
    { id: "singleton", access_token: token, expires_at: expiresAt },
    { onConflict: "id" }
  );

  return token;
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
    return getMockListings();
  }

  try {
    const token = await getGuestyToken();
    const response = await fetch(
      `${BASE_URL}/listings?limit=25`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) return getMockListings();

    const data: GuestyListResponse = await response.json();
    return data.results ?? getMockListings();
  } catch (error) {
    console.error("[guesty] fetch failed:", error);
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
