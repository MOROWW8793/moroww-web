import { NextRequest, NextResponse } from "next/server";
import { PARTNER_COOKIE, isPartner, leesPartnerCookie, zetPartnerCookie } from "@/lib/partner";
import { TOESTEMMING_COOKIE, TOESTEMMING_DAGEN, isDoel, maakToestemming } from "@/lib/toestemming";

// Bewaart de cookiekeuze. Ook de partnercookie zet of wist de server hier:
// een cookie uit document.cookie leeft in Safari maar 7 dagen.
export async function POST(req: NextRequest) {
  const { doelen, partner } = await req.json();
  if (!Array.isArray(doelen) || !doelen.every(isDoel)) {
    return NextResponse.json({ error: "ongeldige keuze" }, { status: 400 });
  }

  const res = new NextResponse(null, { status: 204 });
  res.cookies.set(TOESTEMMING_COOKIE, maakToestemming(doelen), {
    maxAge: TOESTEMMING_DAGEN * 24 * 60 * 60,
    path: "/",
    sameSite: "lax",
    secure: true,
  });

  if (!doelen.includes("partner")) {
    res.cookies.delete(PARTNER_COOKIE);
    return res;
  }
  const bestaand = leesPartnerCookie(req.cookies.get(PARTNER_COOKIE)?.value);
  if (bestaand) zetPartnerCookie(res, bestaand);
  else if (isPartner(partner)) zetPartnerCookie(res, { partner, aangekomenOp: new Date() });
  return res;
}
