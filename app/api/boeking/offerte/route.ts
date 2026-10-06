import { NextRequest, NextResponse } from "next/server";
import { createQuote, GuestyBookingError } from "@/lib/guesty-booking";
import { boekbareWoning, isIsoDatum, offerteVan } from "@/lib/boeking";

export async function POST(req: NextRequest) {
  const { woningId, aankomst, vertrek, gasten } = await req.json();

  const woning = boekbareWoning(woningId);
  if (!woning) return NextResponse.json({ error: "onbekende woning" }, { status: 404 });
  if (!isIsoDatum(aankomst) || !isIsoDatum(vertrek) || aankomst >= vertrek) {
    return NextResponse.json({ error: "ongeldige data" }, { status: 400 });
  }
  if (!Number.isInteger(gasten) || gasten < 1 || gasten > woning.maxGasten) {
    return NextResponse.json({ error: "ongeldig aantal gasten" }, { status: 400 });
  }

  try {
    const quote = await createQuote({
      listingId: woning.listingId,
      checkIn: aankomst,
      checkOut: vertrek,
      guestsCount: gasten,
    });
    return NextResponse.json(offerteVan(quote));
  } catch (err) {
    // Guesty weigert een offerte bij niet-beschikbare data of min-nachten;
    // die fout gaat als 409 terug zodat de UI andere data kan vragen.
    if (err instanceof GuestyBookingError && err.status < 500) {
      console.error("[boeking/offerte]", err.message);
      return NextResponse.json({ error: "niet beschikbaar" }, { status: 409 });
    }
    throw err;
  }
}
