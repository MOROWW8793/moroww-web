"use client";

// React 19 vervangt useFormState (react-dom) door useActionState (react).
// Same signature; enkel de import verschuift van react-dom naar react.
import { useActionState, useRef } from "react";
import { useLocale } from "next-intl";
import { submitLead } from "@/app/[locale]/eigenaar-worden/actions";
import type { LeadFormState } from "@/types/lead";
import { CheckCircle } from "lucide-react";

const initial: LeadFormState = { success: false };

const inputClass = "rounded-xl border border-moroww-brown/15 bg-moroww-blush/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-moroww-orange";
const labelClass = "flex flex-col gap-1.5";
const spanClass  = "text-xs font-semibold text-moroww-black/50 uppercase tracking-wide";

// Copy per taal. NL blijft de bestaande copy; EN krijgt de vertaling
// zonder next-intl messages, want de LeadForm zit in twee EigenaarContent-
// varianten en de tekststrings hier zijn allemaal formulier-labels
// (dun genoeg om inline te houden).
const copy = {
  nl: {
    successTitel: "Aanvraag ontvangen",
    successBody: "Bedankt. We nemen binnen 48u persoonlijk contact op. Elke woning wordt fysiek beoordeeld - dat is onze belofte.",
    formKop: "meld je woning aan",
    naamLabel: "Naam *",
    naamPlaceholder: "Jan Janssen",
    emailLabel: "E-mail *",
    emailPlaceholder: "jan@voorbeeld.be",
    telefoonLabel: "Telefoon",
    telefoonPlaceholder: "+32 470 00 00 00",
    beschrijvingLabel: "Beschrijf je woning",
    beschrijvingPlaceholder: "Type woning, ligging, capaciteit, wat maakt ze bijzonder…",
    regioLabel: "Regio",
    regioPlaceholder: "Kies een regio…",
    regioOpties: [
      { value: "Kust",             label: "Kust" },
      { value: "Vlaamse Ardennen", label: "Vlaamse Ardennen" },
      { value: "Ardennen",         label: "Ardennen" },
      { value: "Andere",           label: "Andere" },
    ],
    nachtenLabel: "Beschikbaar per jaar (nachten)",
    nachtenPlaceholder: "Schat het aantal nachten…",
    nachtenOpties: [
      { value: "<60",     label: "<60 nachten" },
      { value: "60-120",  label: "60 – 120 nachten" },
      { value: "120-180", label: "120 – 180 nachten" },
      { value: "180+",    label: "180+ nachten" },
    ],
    submit: "meld je woning aan",
  },
  en: {
    successTitel: "Application received",
    successBody: "Thank you. We will get in touch personally within 48h. Every home is assessed in person — that is our promise.",
    formKop: "list your home",
    naamLabel: "Name *",
    naamPlaceholder: "John Smith",
    emailLabel: "Email *",
    emailPlaceholder: "john@example.com",
    telefoonLabel: "Phone",
    telefoonPlaceholder: "+32 470 00 00 00",
    beschrijvingLabel: "Describe your home",
    beschrijvingPlaceholder: "Type of home, location, capacity, what makes it special…",
    regioLabel: "Region",
    regioPlaceholder: "Choose a region…",
    regioOpties: [
      { value: "Kust",             label: "Coast" },
      { value: "Vlaamse Ardennen", label: "Flemish Ardennes" },
      { value: "Ardennen",         label: "Ardennes" },
      { value: "Andere",           label: "Other" },
    ],
    nachtenLabel: "Available per year (nights)",
    nachtenPlaceholder: "Estimate the number of nights…",
    nachtenOpties: [
      { value: "<60",     label: "<60 nights" },
      { value: "60-120",  label: "60 – 120 nights" },
      { value: "120-180", label: "120 – 180 nights" },
      { value: "180+",    label: "180+ nights" },
    ],
    submit: "list your home",
  },
} as const;

export function LeadForm() {
  const [state, action] = useActionState(submitLead, initial);
  const formRef = useRef<HTMLFormElement>(null);
  const locale = useLocale();
  const t = locale === "en" ? copy.en : copy.nl;

  if (state.success) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center space-y-4">
        <div className="flex justify-center">
          <CheckCircle size={40} className="text-moroww-orange" />
        </div>
        <h3 className="font-bold text-xl text-moroww-black">{t.successTitel}</h3>
        <p className="text-moroww-black/60 text-sm leading-relaxed max-w-xs mx-auto">
          {t.successBody}
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={action} className="rounded-2xl bg-white p-8 md:p-10 space-y-5 shadow-sm">
      <h3 className="font-bold text-xl text-moroww-black mb-2">{t.formKop}</h3>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          <span className={spanClass}>{t.naamLabel}</span>
          <input name="name" required placeholder={t.naamPlaceholder} className={inputClass} />
        </label>
        <label className={labelClass}>
          <span className={spanClass}>{t.emailLabel}</span>
          <input name="email" type="email" required placeholder={t.emailPlaceholder} className={inputClass} />
        </label>
      </div>

      <label className={labelClass}>
        <span className={spanClass}>{t.telefoonLabel}</span>
        <input name="phone" type="tel" placeholder={t.telefoonPlaceholder} className={inputClass} />
      </label>

      <label className={labelClass}>
        <span className={spanClass}>{t.beschrijvingLabel}</span>
        <textarea
          name="property_description"
          rows={4}
          placeholder={t.beschrijvingPlaceholder}
          className={`${inputClass} resize-none`}
        />
      </label>

      <label className={labelClass}>
        <span className={spanClass}>{t.regioLabel}</span>
        <select name="region" className={inputClass}>
          <option value="">{t.regioPlaceholder}</option>
          {t.regioOpties.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </label>

      <label className={labelClass}>
        <span className={spanClass}>{t.nachtenLabel}</span>
        <select name="nights_per_year" className={inputClass}>
          <option value="">{t.nachtenPlaceholder}</option>
          {t.nachtenOpties.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </label>

      {state.error && (
        <p className="text-sm text-red-600 rounded-lg bg-red-50 px-4 py-3">{state.error}</p>
      )}

      <button
        type="submit"
        className="w-full rounded-full bg-moroww-orange hover:bg-moroww-orange/85 text-white font-semibold py-4 transition-colors duration-200"
      >
        {t.submit}
      </button>
    </form>
  );
}
