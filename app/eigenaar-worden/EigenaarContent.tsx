"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LeadForm } from "@/components/ui/LeadForm";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

const voordelen = [
  {
    titel: "preferentiële voorwaarden",
    body: "Founding Partners stappen in op voorwaarden die contractueel vergrendeld worden voor de volledige eerste contractcyclus. Wat je vandaag afspreekt, blijft gelden. Geen indexering. Geen verrassing.",
  },
  {
    titel: "directe founder-toegang",
    body: "In jaar 1 werk je rechtstreeks met Brent en Noam. Geen tussenpersonen, geen callcenters. Jouw woning krijgt de aandacht die een investering verdient.",
  },
  {
    titel: "prioriteit in de collectie",
    body: "Founding Partner-woningen worden als eerste opgenomen in de collectie, als eerste gepromoot en als eerste gekoppeld aan onze gast-pipeline.",
  },
  {
    titel: "een label dat groeit",
    body: "Hoe sterker het moroww-label wordt, hoe meer jouw woning daarvan profiteert. Je groeit mee met een merk dat gebouwd is om te blijven.",
  },
];

export function EigenaarContent() {
  return (
    <>
      {/* ── SECTIE 1: HERO ── */}
      <section className="relative overflow-hidden py-40 px-6 md:px-16 lg:px-24 w-full">
        <Image
          src="/images/gradient-hero.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <p className="text-xs font-normal uppercase tracking-widest text-moroww-black mb-6">
            founding partner programma
          </p>
          <h1
            className="font-bold lowercase text-white leading-[1.05] tracking-[-0.02em] mb-8"
            style={{ fontSize: "clamp(3rem,6vw,5rem)" }}
          >
            de eerste tien<br />tellen het meest.
          </h1>
          <p className="text-moroww-black/70 font-normal leading-relaxed max-w-xl mx-auto" style={{ fontSize: 20 }}>
            moroww bouwt een gesloten collectie van premium vakantiewoningen.
            De eerste tien eigenaars die instappen krijgen voorwaarden die we
            daarna nooit meer aanbieden.
          </p>
        </motion.div>
      </section>

      {/* ── SECTIE 2: HET VERHAAL ── */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-16 lg:px-24 w-full">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto">
          <p className="text-xs font-normal uppercase tracking-widest text-moroww-orange mb-4">
            waarom nu
          </p>
          <h2
            className="font-bold lowercase text-moroww-black leading-[1.05] tracking-[-0.02em] mb-8"
            style={{ fontSize: "clamp(2rem,3.5vw,3rem)" }}
          >
            een label in opbouw<br />heeft een andere waarde<br />dan een label in bloei.
          </h2>
          <div className="space-y-5 text-moroww-black/60 leading-relaxed" style={{ fontSize: 18 }}>
            <p>
              moroww staat aan het begin. We hebben de strategie, het systeem,
              de standaard en de partners. Wat we nu bouwen is de collectie —
              en die begint met eigenaars die begrijpen wat vroeg instappen betekent.
            </p>
            <p>
              Als Founding Partner ben je niet zomaar een klant. Je bent deel van
              de basis waarop moroww gebouwd wordt. Je woning draagt het label
              vanaf dag één. Je relatie met ons begint op het moment dat wij het
              meest gemotiveerd zijn om te bewijzen wat we waard zijn.
            </p>
          </div>
          <p
            className="font-bold text-moroww-black mt-8"
            style={{ fontSize: "clamp(20px,2vw,28px)" }}
          >
            Dat is de waarde van vroeg instappen. Niet de korting. De positie.
          </p>
        </motion.div>
      </section>

      {/* ── SECTIE 3: WAT JE KRIJGT ── */}
      <section className="bg-moroww-blush py-16 md:py-24 px-6 md:px-16 lg:px-24 w-full">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <p className="text-xs font-normal uppercase tracking-widest text-moroww-orange mb-4">
              wat founding partners krijgen
            </p>
            <h2
              className="font-bold lowercase text-moroww-black leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2rem,4vw,3rem)" }}
            >
              meer dan beheer.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {voordelen.map(({ titel, body }, i) => (
              <motion.div
                key={titel}
                {...fadeUp}
                transition={{ duration: 0.4, ease: "easeOut" as const, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-8 shadow-sm flex flex-col gap-3"
              >
                <h3 className="font-semibold text-moroww-black text-base lowercase">{titel}</h3>
                <p className="text-sm text-moroww-black/55 leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTIE 4: DE STANDAARD ── */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-16 lg:px-24 w-full">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-normal uppercase tracking-widest text-moroww-orange mb-4">
            wie we zoeken
          </p>
          <h2
            className="font-bold lowercase text-moroww-black leading-[1.05] tracking-[-0.02em] mb-8"
            style={{ fontSize: "clamp(2rem,3.5vw,3rem)" }}
          >
            niet elke woning.<br />de juiste woning.
          </h2>
          <div className="space-y-5 text-moroww-black/60 leading-relaxed text-left" style={{ fontSize: 18 }}>
            <p>
              moroww inspecteert elk pand fysiek voor we een samenwerking aangaan.
              We toetsen aan een set niet-onderhandelbare criteria: minimum 100m²,
              eigen parkeerplaats, rustige of natuurlijke omgeving, lichtinval en
              sfeer die kloppen.
            </p>
            <p>
              We zeggen vaker nee dan ja. Dat is precies waarom jouw pand erbij
              willen horen, de moeite waard is.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── SECTIE 5: FORMULIER ── */}
      <section className="bg-moroww-blush py-16 md:py-24 px-6 md:px-16 lg:px-24 w-full">
        <motion.div {...fadeUp} className="max-w-xl mx-auto">
          <p className="text-xs font-normal uppercase tracking-widest text-moroww-orange mb-4">
            klaar om in te stappen?
          </p>
          <h2
            className="font-bold lowercase text-moroww-black leading-[1.05] tracking-[-0.02em] mb-4"
            style={{ fontSize: "clamp(2rem,3.5vw,3rem)" }}
          >
            meld je aan.
          </h2>
          <p className="text-moroww-black/60 leading-relaxed mb-10" style={{ fontSize: 17 }}>
            We nemen binnen 48u persoonlijk contact op.
            Elke woning wordt fysiek beoordeeld.
          </p>

          <LeadForm />

          <p className="mt-6 text-xs text-moroww-black/40 text-center leading-relaxed">
            Slechts 10 Founding Partner-plaatsen beschikbaar.
            Op dit moment zijn er nog <strong className="text-moroww-black/60">10</strong> vrij.
          </p>
        </motion.div>
      </section>
    </>
  );
}
