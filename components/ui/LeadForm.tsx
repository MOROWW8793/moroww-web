"use client";

import { useFormState } from "react-dom";
import { useRef } from "react";
import { submitLead } from "@/app/eigenaar-worden/actions";
import type { LeadFormState } from "@/types/lead";
import { CheckCircle } from "lucide-react";

const initial: LeadFormState = { success: false };

export function LeadForm() {
  const [state, action] = useFormState(submitLead, initial);
  const formRef = useRef<HTMLFormElement>(null);

  if (state.success) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center space-y-4">
        <div className="flex justify-center">
          <CheckCircle size={40} className="text-moroww-orange" />
        </div>
        <h3 className="font-bold text-xl text-moroww-black">Aanvraag ontvangen</h3>
        <p className="text-moroww-black/60 text-sm leading-relaxed max-w-xs mx-auto">
          Bedankt! We nemen binnen 48u contact op om je woning persoonlijk te bespreken.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={action} className="rounded-2xl bg-white p-8 md:p-10 space-y-5 shadow-sm">
      <h3 className="font-bold text-xl text-moroww-black mb-2">Stuur je aanvraag</h3>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-moroww-black/50 uppercase tracking-wide">Naam *</span>
          <input
            name="name"
            required
            placeholder="Jan Janssen"
            className="rounded-xl border border-moroww-border bg-moroww-blush/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-moroww-orange"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-moroww-black/50 uppercase tracking-wide">E-mail *</span>
          <input
            name="email"
            type="email"
            required
            placeholder="jan@voorbeeld.be"
            className="rounded-xl border border-moroww-border bg-moroww-blush/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-moroww-orange"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-moroww-black/50 uppercase tracking-wide">Telefoon</span>
        <input
          name="phone"
          type="tel"
          placeholder="+32 470 00 00 00"
          className="rounded-xl border border-moroww-border bg-moroww-blush/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-moroww-orange"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-moroww-black/50 uppercase tracking-wide">Beschrijf je woning</span>
        <textarea
          name="property_description"
          rows={4}
          placeholder="Type woning, ligging, capaciteit, wat maakt ze bijzonder…"
          className="rounded-xl border border-moroww-border bg-moroww-blush/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-moroww-orange resize-none"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-moroww-black/50 uppercase tracking-wide">Regio</span>
        <select
          name="region"
          className="rounded-xl border border-moroww-border bg-moroww-blush/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-moroww-orange"
        >
          <option value="">Kies een regio…</option>
          <option value="Kust">Kust</option>
          <option value="Ardennen">Ardennen</option>
          <option value="Heuvelland">Heuvelland</option>
          <option value="Andere">Andere</option>
        </select>
      </label>

      {state.error && (
        <p className="text-sm text-red-600 rounded-lg bg-red-50 px-4 py-3">{state.error}</p>
      )}

      <button
        type="submit"
        className="w-full rounded-full bg-moroww-orange hover:bg-moroww-orange-dark text-white font-semibold py-4 transition-colors duration-200"
      >
        Stuur mijn aanvraag
      </button>
    </form>
  );
}
