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

const systeem = [
  {
    nr: "01",
    titel: "smart lock",
    tekst: "Sleutelloze aankomst via unieke code per boeking. Geen sleuteloverdracht. Geen afspraken. De gast komt binnen. Je hoeft er niet bij te zijn.",
  },
  {
    nr: "02",
    titel: "geluidsmonitoring",
    tekst: "Een decibelsensor bewaakt je woning zonder in te breken op privacy. Overlast wordt gedetecteerd voor het een probleem wordt. Je vergunning blijft veilig.",
  },
  {
    nr: "03",
    titel: "sfeerautomatisering",
    tekst: "Licht, temperatuur en muziek staan klaar bij aankomst. De woning verwelkomt de gast. Zonder dat je er iets voor hoeft te doen.",
  },
  {
    nr: "04",
    titel: "geurverspreiding",
    tekst: "Elke collectie heeft een eigen signatuurgeur. De cartridges zijn moroww-eigendom. Wij leveren, vervangen en onderhouden. Je merkt er niets van.",
  },
  {
    nr: "05",
    titel: "incident-detectie",
    tekst: "Waterlek, rookontwikkeling, klimaatafwijking — je wordt gewaarschuwd voor er schade is. Een systeem dat waakt terwijl je slaapt.",
  },
  {
    nr: "06",
    titel: "host-dashboard",
    tekst: "Bezetting, boekingen, woningstatus en maandelijkse rapportage in real time. Altijd inzicht. Nooit administratieve last.",
  },
];

const voordelen = [
  {
    titel: "tariefvergrendeling",
    tekst: "Je commissie en abonnement worden contractueel vergrendeld voor de volledige eerste cyclus.",
  },
  {
    titel: "directe founder-toegang",
    tekst: "Je werkt rechtstreeks met Brent en Noam. Geen callcenter. Geen tussenpersoon.",
  },
  {
    titel: "prioriteit in de collectie",
    tekst: "Je woning wordt als eerste opgenomen, gepromoot en gekoppeld aan onze gast-pipeline.",
  },
  {
    titel: "een label dat groeit",
    tekst: "Hoe sterker het moroww-label wordt, hoe meer je woning daarvan profiteert.",
  },
];

const stappen = [
  {
    nr: "01",
    titel: "aanmelding & screening",
    tekst: "Je vult het formulier in. Wij nemen binnen 48u persoonlijk contact op. Elke woning wordt beoordeeld op locatie, oppervlakte en sfeer.",
  },
  {
    nr: "02",
    titel: "fysieke audit & installatie",
    tekst: "Ons team bezoekt je woning. We voeren de certificeringsaudit uit, geven interieuradvies en installeren de volledige tech-stack.",
  },
  {
    nr: "03",
    titel: "live in de collectie",
    tekst: "Je woning draagt het moroww-badge. We starten de distributie via alle kanalen én via book.moroww.com. Je volgt alles op via het host-dashboard.",
  },
];

export function EigenaarContent() {
  return (
    <>
      {/* ── SECTIE 1: HERO ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-screen -mt-16">
        {/* Links — tekst */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-center px-10 md:px-16 py-16 bg-[#1A1A1A]"
        >
          <div className="max-w-sm">
            <p className="text-xs uppercase tracking-widest text-[#FEA05E] mb-6">
              Voor eigenaars
            </p>
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] text-white">
              <span className="font-light">je woning.</span><br />
              ons systeem.<br />
              <span className="font-light">samen het</span> label.
            </h1>
            <p className="mt-8 text-base leading-relaxed text-white/60 max-w-xs">
              moroww installeert de technologie, bewaakt de
              standaard en regelt de boeking. Je beheert je
              eigen woning.
            </p>
            <div className="mt-8">
              <span className="text-sm text-white/40 border border-white/15 rounded-full px-4 py-2">
                founding partner plaatsen zijn beperkt
              </span>
            </div>
          </div>
        </motion.div>

        {/* Rechts — foto */}
        <div className="relative overflow-hidden min-h-[60vh] md:min-h-full">
          <Image
            src="/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-115.jpg"
            alt="moroww woning"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* ── SECTIE 2: WAT MOROWW INSTALLEERT ── */}
      <section className="w-full bg-[#1A1A1A] py-28">
        <div className="relative z-10">
          <motion.div {...fadeUp} className="max-w-4xl mx-auto px-6 md:px-16 mb-20">
            <p className="text-xs uppercase tracking-widest text-[#FEA05E] mb-5">
              De tech-stack
            </p>
            <h2 className="text-[clamp(2.5rem,5.5vw,5rem)] font-bold leading-[1.1] text-white">
              <span className="font-light">technologie die</span><br />
              bewaakt. levert.<br />
              <span className="font-light">en beschermt.</span>
            </h2>
            <p className="mt-5 text-lg text-[#9CA3AF] max-w-lg leading-relaxed">
              moroww installeert de volledige tech-stack in je woning.
              Je hebt er geen beheer over. Dat is de bedoeling.
            </p>
          </motion.div>

          {systeem.map((item, i) => (
            <motion.div
              key={item.nr}
              {...fadeUp}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.06 }}
              className="w-full border-t border-white/10"
            >
              <div className="max-w-4xl mx-auto px-6 md:px-16 py-10 flex items-start gap-8 md:gap-20">
                <span
                  className="font-bold leading-none text-[#FEA05E] select-none hidden md:block"
                  style={{ fontSize: "clamp(3.5rem,8vw,6rem)", opacity: 0.15 }}
                >
                  {item.nr}
                </span>
                <div className="flex-1 pt-1">
                  <p className="text-xs uppercase tracking-widest text-[#FEA05E] mb-2 md:hidden">{item.nr}</p>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.titel}</h3>
                  <p className="text-base leading-relaxed text-[#9CA3AF]">{item.tekst}</p>
                </div>
              </div>
            </motion.div>
          ))}
          <div className="border-b border-white/10" />
        </div>
      </section>

      {/* ── SECTIE 4: FOUNDING PARTNER VOORDELEN ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">
        {/* Tekst links */}
        <motion.div
          {...fadeUp}
          className="flex items-center px-10 md:px-20 py-20 bg-[#FAE4D6]"
        >
          <div className="max-w-sm">
            <p className="text-xs uppercase tracking-widest text-[#C08D6E] mb-5">
              Founding Partner
            </p>
            <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-bold leading-[1.1] text-[#1A1A1A]">
              <span className="font-light">niet de korting.</span><br />
              de positie.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#1A1A1A]">
              moroww staat aan het begin. De eerste eigenaars
              bouwen mee aan het label. Dat heeft een andere
              waarde dan instappen als het label al staat.
            </p>

            <div className="mt-10 border-t border-[#C08D6E]/30">
              {voordelen.map(({ titel, tekst }) => (
                <div key={titel} className="flex items-start gap-4 py-5 border-b border-[#C08D6E]/30">
                  <span className="text-[#FEA05E] mt-0.5 shrink-0">→</span>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A]">{titel}</p>
                    <p className="text-sm text-[#1A1A1A]/60 mt-0.5 leading-relaxed">{tekst}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Foto rechts */}
        <div className="relative overflow-hidden min-h-[60vw] md:min-h-full">
          <Image
            src="/images/fp-interieur-1.jpg"
            alt="moroww woning"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* ── SECTIE 5: HOE HET WERKT ── */}
      <section className="w-full py-28 px-6 bg-[#FAE4D6]">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <p className="text-xs uppercase tracking-widest text-[#C08D6E] mb-5">
              Het traject
            </p>
            <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-bold leading-[1.1] text-[#1A1A1A]">
              van aanmelding<br />
              <span className="font-light">tot live.</span>
            </h2>
          </motion.div>

          <div className="mt-14 border-t border-[#C08D6E]/30">
            {stappen.map(({ nr, titel, tekst }, i) => (
              <motion.div
                key={nr}
                {...fadeUp}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.08 }}
                className="flex items-start gap-8 py-8 border-b border-[#C08D6E]/30"
              >
                <p className="text-[#FEA05E] text-sm font-semibold tracking-widest shrink-0 min-w-[2rem]">{nr}</p>
                <div>
                  <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">{titel}</h3>
                  <p className="text-base leading-relaxed text-[#1A1A1A]/70">{tekst}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTIE 6: BRENT & NOAM ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[60vh]">
        {/* Foto links */}
        <div className="relative overflow-hidden min-h-[60vw] md:min-h-full">
          <Image
            src="/images/over-founders.jpg"
            alt="Brent en Noam"
            fill
            className="object-cover object-[center_20%]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Tekst rechts */}
        <motion.div
          {...fadeUp}
          className="flex items-center px-10 md:px-16 py-20 bg-[#1A1A1A]"
        >
          <div className="max-w-sm">
            <p className="text-xs uppercase tracking-widest text-[#FEA05E] mb-5">
              Het team
            </p>
            <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold leading-[1.1] text-white">
              <span className="font-light">u werkt met</span><br />
              brent en noam.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#9CA3AF]">
              Geen callcenter. Geen tussenpersoon. In jaar 1
              heb je directe toegang tot de oprichters.
              Je woning krijgt de aandacht die een
              investering verdient.
            </p>
            <p className="mt-4 text-base text-[#9CA3AF]">
              noam.landries@moroww.com
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── SECTIE 7: FORMULIER ── */}
      <section className="w-full py-28 px-6 bg-[#FAE4D6]">
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeUp}>
            <p className="text-xs uppercase tracking-widest text-[#C08D6E] mb-5">
              Aanmelden
            </p>
            <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-bold leading-[1.1] text-[#1A1A1A]">
              <span className="font-light">klaar om</span><br />
              in te stappen.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#1A1A1A]/70">
              We nemen binnen 48u persoonlijk contact op.
              Elke woning wordt fysiek beoordeeld.
            </p>
          </motion.div>

          <div className="mt-12">
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
