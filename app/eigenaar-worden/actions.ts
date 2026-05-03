"use server";

import { supabase } from "@/lib/supabase";
import type { LeadFormState } from "@/types/lead";

export async function submitLead(
  _prev: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const name                 = (formData.get("name") as string)?.trim();
  const email                = (formData.get("email") as string)?.trim();
  const phone                = (formData.get("phone") as string)?.trim() || null;
  const property_description = (formData.get("property_description") as string)?.trim() || null;
  const region               = (formData.get("region") as string) || null;
  const nights_per_year      = (formData.get("nights_per_year") as string) || null;

  if (!name || !email) {
    return { success: false, error: "Naam en e-mail zijn verplicht." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Vul een geldig e-mailadres in." };
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url || url === "placeholder_vervang_dit_later") {
    console.warn("[leads] Supabase not configured — lead not saved:", { name, email });
    return { success: true };
  }

  const { error } = await supabase.from("leads").insert({
    name,
    email,
    phone,
    property_description,
    region,
    source: "eigenaar-worden",
    // nights_per_year stored in property_description suffix for now (no schema change)
    ...(nights_per_year ? { property_description: [property_description, `Beschikbaar: ${nights_per_year} nachten/jaar`].filter(Boolean).join(" · ") } : {}),
  });

  if (error) {
    console.error("[leads] insert error:", error.message);
    return { success: false, error: "Er ging iets mis. Probeer het opnieuw." };
  }

  return { success: true };
}
