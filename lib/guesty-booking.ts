import { createClient } from "@supabase/supabase-js";

// Guesty Booking Engine API. Los van de Open API in lib/guesty.ts: eigen
// instance, eigen credentials, eigen token. Guesty staat maar 3 nieuwe
// tokens per 24u toe per instance — daarom altijd via de Supabase-cache.
// Betalingen lopen via het Stripe-account dat in Guesty aan de panden hangt;
// de client maakt een PaymentMethod aan, Guesty valideert en rekent aan.

const BASE_URL = "https://booking.guesty.com/api";
const TOKEN_CACHE_ID = "booking_engine";

export class GuestyBookingError extends Error {
  constructor(
    public status: number,
    public body: unknown,
  ) {
    super(`Guesty BE API ${status}: ${JSON.stringify(body)}`);
  }
}

// guesty_token_cache staat op "service role only": met de anon-key lukt
// lezen noch schrijven, en haalt elke koude serverinstantie een nieuw token
// tot Guesty 429 geeft. Daarom de service-role-key, die enkel server-side
// bestaat.
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
}

async function fetchFreshToken(): Promise<string> {
  const res = await fetch("https://booking.guesty.com/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope: "booking_engine:api",
      client_id: process.env.GUESTY_BE_CLIENT_ID!,
      client_secret: process.env.GUESTY_BE_CLIENT_SECRET!,
    }).toString(),
    cache: "no-store",
  });
  if (!res.ok) throw new GuestyBookingError(res.status, await res.json());
  const data = await res.json();
  return data.access_token as string;
}

// Eerste laag: per serverinstantie. Spaart Supabase-roundtrips en houdt
// lokale dev (zonder geldige Supabase-key) onder de tokenlimiet.
let geheugen: { token: string; verloopt: number } | null = null;

async function getToken(): Promise<string> {
  if (geheugen && geheugen.verloopt > Date.now()) return geheugen.token;
  const supabase = getSupabase();
  const { data: cached } = await supabase
    .from("guesty_token_cache")
    .select("access_token, expires_at")
    .eq("id", TOKEN_CACHE_ID)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();
  if (cached?.access_token) {
    geheugen = {
      token: cached.access_token as string,
      verloopt: Date.parse(cached.expires_at as string),
    };
    return geheugen.token;
  }

  const token = await fetchFreshToken();
  // Token leeft 24u; 23u marge zodat een request nooit op een net-verlopen
  // token landt.
  const verloopt = Date.now() + 23 * 60 * 60 * 1000;
  geheugen = { token, verloopt };
  const { error } = await supabase.from("guesty_token_cache").upsert(
    { id: TOKEN_CACHE_ID, access_token: token, expires_at: new Date(verloopt).toISOString() },
    { onConflict: "id" },
  );
  if (error) console.error("[guesty-booking] token niet gecachet:", error.message);
  return token;
}

async function be<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = await getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      ...init.headers,
    },
    cache: "no-store",
  });
  const body = await res.json();
  if (!res.ok) throw new GuestyBookingError(res.status, body);
  return body as T;
}

// ── Types (enkel de velden die we gebruiken) ──────────────────────────────

export interface GuestyCalendarDay {
  date: string;
  status: "available" | "unavailable" | "reserved" | "booked";
  minNights: number;
  cta: boolean;
  ctd: boolean;
}

export interface GuestyInvoiceItem {
  title: string;
  amount: number;
  currency: string;
  type: string;
  normalType: string;
}

export interface GuestyRatePlan {
  ratePlan: {
    _id: string;
    name: string;
    money: {
      currency: string;
      fareAccommodation: number;
      subTotalPrice: number;
      totalTaxes: number;
      invoiceItems: GuestyInvoiceItem[];
    };
  };
}

export interface GuestyQuote {
  _id: string;
  expiresAt: string;
  rates: { ratePlans: GuestyRatePlan[] };
}

export interface GuestyGuest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface GuestyReservation {
  _id: string;
  confirmationCode: string;
  status: string;
}

// ── Endpoints ─────────────────────────────────────────────────────────────

export function getCalendar(listingId: string, from: string, to: string) {
  const q = new URLSearchParams({ from, to });
  return be<GuestyCalendarDay[]>(`/listings/${listingId}/calendar?${q}`);
}

export function createQuote(input: {
  listingId: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
}) {
  return be<GuestyQuote>("/reservations/quotes", {
    method: "POST",
    body: JSON.stringify({
      listingId: input.listingId,
      checkInDateLocalized: input.checkIn,
      checkOutDateLocalized: input.checkOut,
      guestsCount: input.guestsCount,
    }),
  });
}

export function getQuote(quoteId: string) {
  return be<GuestyQuote>(`/reservations/quotes/${quoteId}`);
}

export function createInstantReservation(
  quoteId: string,
  input: { ratePlanId: string; ccToken: string; guest: GuestyGuest },
) {
  return be<GuestyReservation>(`/reservations/quotes/${quoteId}/instant`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}
