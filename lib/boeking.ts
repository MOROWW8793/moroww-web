import { liveWoningen, type Woning } from "@/lib/woningen";
import type { GuestyQuote } from "@/lib/guesty-booking";

// Gedeeld tussen de boekings-API-routes. Client components importeren
// alleen de types hieronder, nooit lib/guesty-booking.

export interface KalenderDag {
  datum: string;
  vrij: boolean;
  minNachten: number;
  geenAankomst: boolean;
  geenVertrek: boolean;
}

export interface Offerte {
  quoteId: string;
  ratePlanId: string;
  valuta: string;
  totaal: number;
  regels: { code: string; titel: string; bedrag: number }[];
}

const ISO_DATUM = /^\d{4}-\d{2}-\d{2}$/;

export function isIsoDatum(s: unknown): s is string {
  return typeof s === "string" && ISO_DATUM.test(s) && !Number.isNaN(Date.parse(s));
}

/** Alleen live panden met een Guesty-listing zijn boekbaar. De id komt uit
 *  `boekUrl` zodat er één bron blijft voor de koppeling met Guesty. */
export function listingIdVoor(w: Woning): string | null {
  const m = w.boekUrl.match(/properties\/([a-f0-9]+)/i);
  return m ? m[1] : null;
}

/** Guesty's eigen boekingspagina. Enkel als uitweg wanneer de Booking
 *  Engine API niet antwoordt, zodat een gast altijd kan boeken. */
export function boekPaginaUrl(listingId: string, locale: string): string {
  return `https://book.moroww.com/${locale}/properties/${listingId}?minOccupancy=1`;
}

export function boekbareWoning(
  id: unknown,
): (Woning & { listingId: string; maxGasten: number }) | null {
  if (typeof id !== "string") return null;
  const w = liveWoningen().find((x) => x.id === id);
  if (!w || w.comingSoon || !w.maxGasten) return null;
  const listingId = listingIdVoor(w);
  return listingId ? { ...w, listingId, maxGasten: w.maxGasten } : null;
}

export function offerteVan(quote: GuestyQuote): Offerte {
  const plan = quote.rates.ratePlans[0].ratePlan;
  const regels = plan.money.invoiceItems.map((i) => ({
    code: i.normalType,
    titel: i.title,
    bedrag: i.amount,
  }));
  return {
    quoteId: quote._id,
    ratePlanId: plan._id,
    valuta: plan.money.currency,
    totaal: regels.reduce((s, r) => s + r.bedrag, 0),
    regels,
  };
}
