import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isPartner } from "@/lib/partner";

// Telt een landing via een partnerlink. Bewust zonder IP, cookie of
// user-agent: zo blijft het buiten de toestemmingsvraag.
export async function POST(req: NextRequest) {
  const { partner } = await req.json();
  if (!isPartner(partner)) {
    return NextResponse.json({ error: "onbekende partner" }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
  const { error } = await supabase.from("partner_bezoeken").insert({ partner });
  if (error) {
    console.error("[partner/bezoek]", error.message);
    return NextResponse.json({ error: "niet geteld" }, { status: 500 });
  }
  return new NextResponse(null, { status: 204 });
}
