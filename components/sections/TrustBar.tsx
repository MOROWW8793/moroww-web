"use client";

import { CheckCircle, PhoneOff, Shield, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const pillars = [
  {
    icon: CheckCircle,
    label: "Fysiek geïnspecteerd",
    body: "Elk pand persoonlijk bezocht vóór opname in de collectie.",
  },
  {
    icon: PhoneOff,
    label: "Geen telefoontjes om middernacht.",
    body: "Onze technologie bewaakt. Onze mensen staan stand-by. Jij geniet — wij lossen op.",
  },
  {
    icon: Shield,
    label: "Eén label. Nul gokjes.",
    body: "Elk moroww-pand draagt een kwaliteitsgarantie. Wie de standaard niet haalt, verlaat de collectie.",
  },
  {
    icon: Sparkles,
    label: "Klaar voor je aankomst.",
    body: "Temperatuur, geur en licht zijn ingesteld voor je de deur opendoet. Geen briefing, geen sleutelafspraak. Gewoon aankomen.",
  },
];

export function TrustBar() {
  return (
    <section className="bg-moroww-blush py-16 md:py-24 px-6 md:px-16 lg:px-24 w-full">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {pillars.map(({ icon: Icon, label, body }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.08 }}
              className="flex flex-col gap-3 bg-white rounded-2xl p-6 shadow-sm h-full"
            >
              <div className="w-10 h-10 rounded-full bg-moroww-blush flex items-center justify-center shrink-0">
                <Icon size={18} className="text-moroww-orange" />
              </div>
              <h3 className="font-semibold text-moroww-black text-base">{label}</h3>
              <p className="text-sm text-moroww-black/55 leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
