import { NextRequest, NextResponse } from "next/server";
import { createInstantReservation, getQuote, GuestyBookingError } from "@/lib/guesty-booking";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function tekst(s: unknown, max = 100): s is string {
  return typeof s === "string" && s.trim().length > 0 && s.length <= max;
}

export async function POST(req: NextRequest) {
  const { quoteId, ccToken, gast } = await req.json();

  if (!tekst(quoteId, 64) || !tekst(ccToken, 200)) {
    return NextResponse.json({ error: "ongeldige aanvraag" }, { status: 400 });
  }
  if (
    !gast ||
    !tekst(gast.voornaam) ||
    !tekst(gast.achternaam) ||
    !tekst(gast.telefoon, 40) ||
    !tekst(gast.email, 200) ||
    !EMAIL.test(gast.email)
  ) {
    return NextResponse.json({ error: "ongeldige gastgegevens" }, { status: 400 });
  }

  try {
    // Rate plan opnieuw uit de offerte halen in plaats van de client te
    // vertrouwen: de offerte is de enige bron voor prijs en voorwaarden.
    const quote = await getQuote(quoteId);
    const ratePlanId = quote.rates.ratePlans[0].ratePlan._id;
    const reservatie = await createInstantReservation(quoteId, {
      ratePlanId,
      ccToken,
      guest: {
        firstName: gast.voornaam.trim(),
        lastName: gast.achternaam.trim(),
        email: gast.email.trim(),
        phone: gast.telefoon.trim(),
      },
    });
    return NextResponse.json({ code: reservatie.confirmationCode });
  } catch (err) {
    if (err instanceof GuestyBookingError && err.status < 500) {
      console.error("[boeking/reservatie]", err.message);
      return NextResponse.json({ error: "reservatie mislukt" }, { status: 409 });
    }
    throw err;
  }
}
