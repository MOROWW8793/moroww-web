import Image from "next/image";
import { Shield, TrendingUp, Eye } from "lucide-react";
import { LeadForm } from "@/components/ui/LeadForm";

export const metadata = {
  title: "Eigenaar worden — moroww",
  description: "Laat moroww jouw vakantiewoning beheren. Passief inkomen zonder operationele last.",
};

const benefits = [
  {
    icon: TrendingUp,
    title: "Passief inkomen zonder operationele last",
    body: "Wij regelen alles — van reservaties tot check-out. Jij geniet van de opbrengst.",
  },
  {
    icon: Shield,
    title: "Jouw eigendom, onze standaard",
    body: "We beheren je woning met het zorgvuldigheid van een eigenaar. Geen compromissen.",
  },
  {
    icon: Eye,
    title: "Technologie die bewaakt, niet jij",
    body: "Slimme toegang, automatische rapportages, realtime inzichten. Altijd op de hoogte.",
  },
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
            Jouw woning verdient beter<br className="hidden md:block" /> dan de Airbnb-loterij.
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            moroww selecteert, beheert en optimaliseert. Jij opent de deuren.
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

        {/* Form */}
        <div className="grid lg:grid-cols-[1fr_480px] gap-12 items-start">
          <div>
            <h2 className="font-bold text-moroww-black text-3xl md:text-4xl leading-tight mb-5">
              Klaar om te starten?
            </h2>
            <p className="text-moroww-black/60 text-base leading-relaxed mb-6">
              We nemen binnen 48u contact op. Elke woning wordt persoonlijk beoordeeld —
              we zeggen nee als het niet past, ja als het klopt.
            </p>
            <p className="text-sm text-moroww-black/40 italic">
              &ldquo;A stay that works, so you don&apos;t have to.&rdquo;
            </p>
          </div>
          <LeadForm />
        </div>
      </div>
    </div>
  );
}
