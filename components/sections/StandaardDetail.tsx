"use client";

import { Leaf, BadgeCheck, KeyRound, QrCode, Gift, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function StandaardDetail() {
  const t = useTranslations('standaard')

  const kaarten: Array<{ icon: LucideIcon; titel: string; tekst: string }> = [
    { icon: Leaf,       titel: t('card_geur_titel'),     tekst: t('card_geur_tekst') },
    { icon: BadgeCheck, titel: t('card_label_titel'),    tekst: t('card_label_tekst') },
    { icon: KeyRound,   titel: t('card_slot_titel'),     tekst: t('card_slot_tekst') },
    { icon: QrCode,     titel: t('card_qr_titel'),       tekst: t('card_qr_tekst') },
    { icon: Gift,       titel: t('card_aankomst_titel'), tekst: t('card_aankomst_tekst') },
  ]

  return (
    <section
      style={{ background: "#1A1A1A" }}
      className="py-16 md:py-24 px-6 md:px-16 lg:px-24 w-full"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-12"
        >
          <p style={{ color: "#C08D6E", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>
            {t('label')}
          </p>
          <h2
            style={{ color: "#ffffff", fontSize: "clamp(28px,4vw,40px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}
          >
            {t('title')}
          </h2>
          <p style={{ color: "#999999", fontSize: 16, lineHeight: 1.6 }}>
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {kaarten.map(({ icon: Icon, titel, tekst }, i) => (
            <motion.div
              key={titel}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.06 }}
              className={`group rounded-2xl p-7 flex flex-col gap-4 bg-[#2A2A2A] border border-[#3A3A3A] hover:border-[#FEA05E] transition-colors duration-200 lg:col-span-2${i === 3 ? " lg:col-start-2" : ""}`}
            >
              <div
                style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(254,160,94,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Icon size={20} style={{ color: "#FEA05E" }} />
              </div>
              <div>
                <p style={{ color: "#ffffff", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{titel}</p>
                <p style={{ color: "#999999", fontSize: 14, lineHeight: 1.7 }}>{tekst}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
