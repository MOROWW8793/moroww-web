import { NextRequest, NextResponse } from "next/server";
import { getCalendar } from "@/lib/guesty-booking";
import { boekbareWoning, type KalenderDag } from "@/lib/boeking";

const DAGEN_VOORUIT = 365;

function iso(d: Date) {
  return d.toISOString().slice(0, 10);
}

export async function GET(req: NextRequest) {
  const woning = boekbareWoning(req.nextUrl.searchParams.get("woning"));
  if (!woning) return NextResponse.json({ error: "onbekende woning" }, { status: 404 });

  const van = new Date();
  const tot = new Date(van.getTime() + DAGEN_VOORUIT * 86_400_000);
  const dagen = await getCalendar(woning.listingId, iso(van), iso(tot));

  const kalender: KalenderDag[] = dagen.map((d) => ({
    datum: d.date,
    vrij: d.status === "available",
    minNachten: d.minNights,
    geenAankomst: d.cta,
    geenVertrek: d.ctd,
  }));

  return NextResponse.json(kalender, {
    headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=600" },
  });
}
