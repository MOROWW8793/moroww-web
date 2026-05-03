"use client";

import { CheckCircle, EyeOff, Shield } from "lucide-react";
import { motion } from "framer-motion";

const pillars = [
  {
    icon: CheckCircle,
    label: "Fysiek geïnspecteerd",
    body: "Elk pand persoonlijk bezocht vóór opname in de collectie.",
  },
  {
    icon: EyeOff,
    label: "Invisible high-touch",
    body: "Temperatuur, licht, geur en muziek staan klaar. Geen receptie, geen gedoe.",
  },
  {
    icon: Shield,
    label: "Eén label. Nul gokjes.",
    body: "Elk moroww-pand draagt een kwaliteitsgarantie. Wie de standaard niet haalt, verlaat de collectie.",
  },
];

export function TrustBar() {
  return (
    <section className="bg-moroww-blush py-16 md:py-24 px-6 md:px-16 lg:px-24 w-full">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {pillars.map(({ icon: Icon, label, body }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.08 }}
              className="flex flex-col gap-3 bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-moroww-blush flex items-center justify-center">
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
