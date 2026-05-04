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
      <section className="-mt-16 relative w-full min-h-screen overflow-hidden flex flex-col md:flex-row">
        <Image
          src="/images/gradient-hero.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        {/* Overlay voor leesbaarheid */}
        <div className="absolute inset-0 bg-black/25 z-[1]" />

        {/* Linkerkolom — label bovenaan, headline onderaan */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" as const }}
          className="relative z-10 w-full md:w-1/2 flex flex-col justify-between pt-32 pb-12 px-6 md:pt-36 md:pb-16 md:pl-16 md:pr-0"
        >
          <p className="text-white/70 uppercase text-xs tracking-widest font-medium">
            founding partner programma
          </p>
          <h1
            className="text-white font-bold lowercase leading-none tracking-[-0.03em]"
            style={{ fontSize: "clamp(56px,8vw,120px)" }}
          >
            de eerste<br />tien tellen<br />het meest.
          </h1>
        </motion.div>

        {/* Rechterkolom — subline + counter onderaan */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" as const }}
          className="relative z-10 w-full md:w-1/2 flex flex-col justify-end pb-12 px-6 md:pb-16 md:pr-16 md:pl-0 md:items-end md:text-right"
        >
          <p className="text-white/80 font-normal text-xl max-w-sm leading-relaxed mb-8">
            De eerste tien eigenaars krijgen voorwaarden
            die we daarna nooit meer aanbieden.
          </p>
          <div className="border border-white/30 rounded-full px-6 py-3 inline-block">
            <p className="text-white font-medium text-sm">
              10 plaatsen · nog 10 beschikbaar
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── SECTIE 2: VERHAAL + FOTO ── */}
      <section className="w-full flex flex-col md:flex-row items-stretch">
        <motion.div
          {...fadeUp}
          className="w-full md:w-1/2 bg-white flex flex-col justify-center py-10 px-6 md:py-24 md:px-16 order-last md:order-first"
        >
          <p className="text-[#FEA05E] uppercase text-xs tracking-widest font-medium mb-4">
            waarom nu
          </p>
          <h2
            className="font-bold lowercase text-moroww-black leading-[1.05] tracking-[-0.02em] mb-6"
            style={{ fontSize: "clamp(2.25rem,3.5vw,3.25rem)" }}
          >
            een label in opbouw<br />heeft een andere<br />waarde dan<br />een label in bloei.
          </h2>
          <div className="text-gray-600 leading-relaxed space-y-4 max-w-sm" style={{ fontSize: 17 }}>
            <p>
              moroww staat aan het begin. We hebben de strategie,
              het systeem, de standaard en de partners.
              Wat we nu bouwen is de collectie.
            </p>
            <p>
              Als Founding Partner ben je niet zomaar een klant.
              Je bent deel van de basis waarop moroww gebouwd wordt.
              Je woning draagt het label vanaf dag één.
            </p>
          </div>
          <p
            className="font-bold text-moroww-black mt-8"
            style={{ fontSize: "clamp(20px,2vw,28px)" }}
          >
            Niet de korting. De positie.
          </p>
        </motion.div>
        <div className="relative w-full md:w-1/2 h-[280px] md:h-auto md:flex-1 overflow-hidden flex-shrink-0 order-first md:order-last">
          <img
            src="/images/fp-interieur-1.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center top" }}
          />
        </div>
      </section>

      {/* ── SECTIE A: FULLWIDTH FOTO MET OVERLAY ── */}
      <section className="relative w-full h-[60vh] overflow-hidden">
        <img
          src="/images/fp-exterieur.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center center" }}
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <motion.div {...fadeUp} className="text-center text-white px-8">
            <h2
              className="font-bold lowercase"
              style={{ fontSize: "clamp(36px,5vw,72px)" }}
            >
              meer dan beheer.
            </h2>
            <p className="font-normal text-xl opacity-80 mt-4 max-w-xl mx-auto">
              Technologie die bewaakt. Een protocol dat garandeert.
              Een team dat bereikbaar is.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SECTIE 4: 4 BLOKKEN ── */}
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

      {/* ── SECTIE B: FOTO LINKS + WIE WE ZOEKEN ── */}
      <section className="w-full flex flex-col md:flex-row md:items-stretch">
        <div className="relative w-full md:w-1/2 h-[280px] md:h-auto md:flex-1 overflow-hidden flex-shrink-0">
          <img
            src="/images/fp-interieur-2.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <motion.div
          {...fadeUp}
          className="w-full md:w-1/2 bg-white flex items-center px-6 py-10 md:px-16 md:py-16"
        >
          <div>
            <p className="text-[#FEA05E] uppercase text-xs tracking-widest font-medium mb-4">
              wie we zoeken
            </p>
            <h2
              className="font-bold lowercase text-moroww-black leading-tight mb-6"
              style={{ fontSize: "clamp(32px,4vw,52px)" }}
            >
              niet elke woning.<br />de juiste woning.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-sm">
              moroww inspecteert elk pand fysiek voor we een samenwerking
              aangaan. Minimum 100m², eigen parkeerplaats, rustige omgeving,
              lichtinval en sfeer die kloppen.<br /><br />
              We zeggen vaker nee dan ja. Dat is precies waarom jouw pand
              erbij willen horen, de moeite waard is.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── SECTIE C: FOUNDERS STRIP ── */}
      <section className="w-full flex flex-col md:flex-row md:items-stretch">
        <motion.div
          {...fadeUp}
          className="w-full md:w-1/2 bg-[#1A1A1A] flex items-center px-6 py-10 md:px-16 md:py-16 order-last md:order-first"
        >
          <div>
            <p className="text-[#FEA05E] uppercase text-xs tracking-widest font-medium mb-4">
              het team
            </p>
            <h2
              className="font-bold lowercase text-white leading-tight mb-6"
              style={{ fontSize: "clamp(32px,4vw,52px)" }}
            >
              je werkt met<br />Brent en Noam.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-sm">
              Geen callcenter. Geen tussenpersoon. In jaar 1 heb je directe
              toegang tot de oprichters. Jouw woning krijgt de aandacht
              die een investering verdient.
            </p>
          </div>
        </motion.div>
        <div className="relative w-full md:w-1/2 h-[280px] md:h-auto md:flex-1 overflow-hidden flex-shrink-0 order-first md:order-last">
          <img
            src="/images/fp-founders.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ── SECTIE 7: FORMULIER ── */}
      <section className="bg-moroww-blush py-16 md:py-24 px-6 md:px-16 lg:px-24 w-full">
        <motion.div {...fadeUp} className="max-w-xl mx-auto text-center">
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

          <p className="mt-6 text-xs text-moroww-black/40 leading-relaxed">
            Slechts 10 Founding Partner-plaatsen.
            Er zijn er nog <strong className="text-moroww-black/60">10</strong> beschikbaar.
          </p>
        </motion.div>
      </section>
    </>
  );
}
