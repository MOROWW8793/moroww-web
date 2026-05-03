import Image from "next/image";
import { Zap, Shield, Star } from "lucide-react";
import { LeadForm } from "@/components/ui/LeadForm";

export const metadata = {
  title: "Founding Partner — moroww",
  description: "moroww beheert een gesloten collectie premium vakantiewoningen in België. Founding Partners instappen nu.",
};

const benefits = [
  {
    icon: Zap,
    title: "Passief. Echt passief.",
    body: "Sleutelloze toegang, geluidsmonitoring, energiebeheer en gastcommunicatie — volledig geautomatiseerd. Jij krijgt maandelijks een rapport. Meer hoef je niet te doen.",
  },
  {
    icon: Shield,
    title: "Jouw eigendom is beschermd.",
    body: "Slimme sensoren bewaken decibels, klimaat en waterlek. Gastscreening vóór elke boeking. Exit-clausule in beide richtingen. We behandelen jouw pand alsof het ons eigen is.",
  },
  {
    icon: Star,
    title: "Founding Partner — nu instappen.",
    body: "De eerste 10 hosts krijgen een preferentieel commissietarief dat vergrendeld blijft voor de volledige eerste contractcyclus. Geen verrassing. Geen indexering. Gewoon de beste deal die we ooit geven.",
  },
];

const pricingRows = [
  { label: "Commissie via Airbnb/Booking", founding: "18%", standard: "22%" },
  { label: "Commissie direct boeken",      founding: "10%", standard: "12%" },
  { label: "Onboarding fee",               founding: "€2.500 (forfait)", standard: "€1.500 – €3.000" },
  { label: "Tech & monitoring",            founding: "€75 – 150/maand", standard: "€75 – 150/maand" },
  { label: "Geurabonnement",               founding: "€35 – 55/maand", standard: "€35 – 55/maand" },
  { label: "Contractduur",                 founding: "1 jaar, stilzwijgend verlengd", standard: "1 jaar" },
];

export default function EigenaarWordenPage() {
  return (
    <div className="bg-moroww-blush min-h-screen">
      {/* Hero */}
      <div className="relative bg-moroww-black py-32 px-6 text-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=80"
          alt=""
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-moroww-orange mb-4">Voor eigenaars</p>
          <h1 className="font-bold text-white text-4xl md:text-6xl leading-tight mb-6">
            Jouw woning verdient<br className="hidden md:block" /> een partner, geen platform.
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-xl mx-auto">
            moroww beheert een gesloten collectie premium vakantiewoningen in België.
            We zoeken eigenaars die hun asset serieus nemen. Founding Partners instappen nu.
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="grid gap-8 md:grid-cols-3 mb-20">
          {benefits.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-white rounded-2xl p-8">
              <div className="w-10 h-10 rounded-full bg-moroww-blush flex items-center justify-center mb-5">
                <Icon size={18} className="text-moroww-orange" />
              </div>
              <h3 className="font-semibold text-moroww-black text-base mb-3">{title}</h3>
              <p className="text-sm text-moroww-black/55 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* Pricing table */}
        <div className="mb-20">
          <div className="overflow-x-auto rounded-2xl border border-moroww-border">
            <table className="w-full text-sm bg-white">
              <thead>
                <tr className="border-b border-moroww-border">
                  <th className="text-left px-6 py-4 font-medium text-moroww-black/40 w-1/2"></th>
                  <th className="px-6 py-4 text-center">
                    <span className="inline-block rounded-full bg-moroww-orange text-white text-xs font-semibold px-3 py-1 mb-1.5">
                      Eerste 10 hosts
                    </span>
                    <p className="font-semibold text-moroww-black">Founding Partner</p>
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-moroww-black/50">
                    Standaard
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-moroww-border">
                {pricingRows.map(({ label, founding, standard }) => (
                  <tr key={label}>
                    <td className="px-6 py-4 text-moroww-black/70">{label}</td>
                    <td className="px-6 py-4 text-center font-semibold text-moroww-black">{founding}</td>
                    <td className="px-6 py-4 text-center text-moroww-black/40">{standard}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-moroww-black/40 leading-relaxed max-w-2xl">
            Tech-apparatuur blijft eigendom van moroww en wordt bij contracteinde verwijderd.
            Geen restwaarde-discussie, geen installatieplicht voor de host.
          </p>
        </div>

        {/* Form section */}
        <div className="grid lg:grid-cols-[1fr_480px] gap-12 items-start">
          <div>
            <h2 className="font-bold text-moroww-black text-3xl md:text-4xl leading-tight mb-5">
              Klaar om te starten?
            </h2>
            <p className="text-moroww-black/60 text-base leading-relaxed mb-6">
              We nemen binnen 48u contact op. Elke woning wordt persoonlijk beoordeeld —
              we zeggen nee als het niet past, ja als het klopt.
            </p>
            <p className="text-sm text-moroww-black/40 italic mb-8">
              &ldquo;A stay that works, so you don&apos;t have to.&rdquo;
            </p>
            <p className="text-sm text-moroww-black/55 leading-relaxed border-l-2 border-moroww-orange pl-4">
              moroww inspecteert elk pand fysiek vóór onboarding.
              We zeggen vaker nee dan ja. Dat is precies waarom jouw pand
              erbij willen horen, de moeite waard is.
            </p>
          </div>
          <LeadForm />
        </div>
      </div>
    </div>
  );
}
