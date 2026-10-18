import { NextRequest, NextResponse } from "next/server";
import { createQuote, GuestyBookingError } from "@/lib/guesty-booking";
import { boekbareWoning, isIsoDatum, offerteVan } from "@/lib/boeking";

export async function POST(req: NextRequest) {
  const { woningId, aankomst, vertrek, gasten, kortingscode } = await req.json();

  const woning = boekbareWoning(woningId);
  if (!woning) return NextResponse.json({ error: "onbekende woning" }, { status: 404 });
  if (!isIsoDatum(aankomst) || !isIsoDatum(vertrek) || aankomst >= vertrek) {
    return NextResponse.json({ error: "ongeldige data" }, { status: 400 });
  }
  if (!Number.isInteger(gasten) || gasten < 1 || gasten > woning.maxGasten) {
    return NextResponse.json({ error: "ongeldig aantal gasten" }, { status: 400 });
  }
  const code = typeof kortingscode === "string" ? kortingscode.trim().toUpperCase() : "";
  if (code && !/^[A-Z0-9_-]{2,40}$/.test(code)) {
    return NextResponse.json({ error: "ongeldige kortingscode" }, { status: 422 });
  }

  try {
    const quote = await createQuote({
      listingId: woning.listingId,
      checkIn: aankomst,
      checkOut: vertrek,
      guestsCount: gasten,
      coupon: code || undefined,
    });
    const offerte = offerteVan(quote);
    // Guesty kan een onbekende code stil negeren; dan is er geen korting.
    if (code && offerte.korting === null) {
      return NextResponse.json({ error: "ongeldige kortingscode" }, { status: 422 });
    }
    return NextResponse.json(offerte);
  } catch (err) {
    // Guesty weigert een offerte bij niet-beschikbare data of min-nachten;
    // die fout gaat als 409 terug zodat de UI andere data kan vragen.
    // 429 is Guesty die ons afremt, niet een probleem met de aanvraag.
    if (err instanceof GuestyBookingError && err.status === 429) {
      console.error("[boeking]", err.message);
      return NextResponse.json({ error: "even niet beschikbaar" }, { status: 503 });
    }
    // De data zijn al zonder code beschikbaar bevonden; een weigering mét
    // code ligt dus aan de code.
    if (code && err instanceof GuestyBookingError && err.status < 500) {
      console.error("[boeking/offerte] kortingscode", err.message);
      return NextResponse.json({ error: "ongeldige kortingscode" }, { status: 422 });
    }
    if (err instanceof GuestyBookingError && err.status < 500) {
      console.error("[boeking/offerte]", err.message);
      return NextResponse.json({ error: "niet beschikbaar" }, { status: 409 });
    }
    throw err;
  }
}
