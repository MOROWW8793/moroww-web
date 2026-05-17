"use client";

import { Leaf, BadgeCheck, KeyRound, QrCode, Gift, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const kaarten = [
  {
    icon: Leaf,
    titel: "Geur",
    tekst: "Elke woning heeft een eigen sensorisch profiel. Bij aankomst ruikt het goed. Niet toevallig.",
  },
  {
    icon: BadgeCheck,
    titel: "moroww label",
    tekst: "Alleen woningen die onze inspectie doorstaan dragen het label. Geen uitzonderingen.",
  },
  {
    icon: KeyRound,
    titel: "Slim slot",
    tekst: "Geen sleuteloverdracht. Geen wachten. Gasten komen aan op hun tempo, via een persoonlijke code.",
  },
  {
    icon: QrCode,
    titel: "Gastenpagina",
    tekst: "Een persoonlijke digitale gids per woning. Wifi, huisregels, lokale tips - alles op één plek via QR.",
  },
  {
    icon: Gift,
    titel: "Welkomstpakket",
    tekst: "geselecteerde badkamerproducten en verse linnens bij elke aankomst. de standaard is de standaard, elke keer.",
  },
  {
    icon: TrendingUp,
    titel: "linnen & verzorging",
    tekst: "elk verblijf start met vers opgemaakt bed, geselecteerde badkamerproducten en een schone lei. geen compromis.",
  },
];

export function StandaardDetail() {
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
            de standaard
          </p>
          <h2
            style={{ color: "#ffffff", fontSize: "clamp(28px,4vw,40px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}
          >
            wat elke moroww-woning meebrengt.
          </h2>
          <p style={{ color: "#999999", fontSize: 16, lineHeight: 1.6 }}>
            elk verblijf is het resultaat van een systeem. niet van toeval.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {kaarten.map(({ icon: Icon, titel, tekst }, i) => (
            <motion.div
              key={titel}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.06 }}
              className="group rounded-2xl p-7 flex flex-col gap-4 transition-colors duration-200"
              style={{ background: "#2A2A2A", border: "1px solid #3A3A3A", borderRadius: 16 }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#FEA05E")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "#3A3A3A")}
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
