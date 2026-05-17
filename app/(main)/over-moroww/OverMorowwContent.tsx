"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

const systeem = [
  {
    nr: "01",
    titel: "inspectieprotocol",
    tekst: "Elke woning wordt fysiek bezocht door ons team vóór opname. Geen foto-akkoord. Geen zelfattestatie. De gast herkent het badge. De host wil erbij horen.",
  },
  {
    nr: "02",
    titel: "gastenpagina",
    tekst: "Bij aankomst scannen gasten een QR-code. Check-in, huisregels, handleidingen, lokale tips — in hun eigen taal. Geen sleuteloverdracht. Geen welkomstgesprek. Geen gedoe.",
  },
  {
    nr: "03",
    titel: "sensory design",
    tekst: "Geur, licht, sfeerautomatisering. De woning staat klaar voor de gast binnenstapt. Elke regionale collectie heeft een eigen signatuurgeur. Het gevoel dat je krijgt is geen geluk.",
  },
  {
    nr: "04",
    titel: "kwaliteitsopvolging",
    tekst: "Jaarlijkse heraudit. Mystery guest-inspecties. Sensorische monitoring. Wie de lat niet langer haalt, verlaat de collectie. Het label is meer waard dan elk contract.",
  },
];

export function OverMorowwContent() {
  return (
    <main className="bg-[#FAE4D6]">

      {/* ── HERO — ongewijzigd ── */}
      <section className="relative -mt-16 w-full overflow-hidden" style={{ height: "100dvh" }}>
        <Image
          src="/images/over-hero.jpg"
          alt="moroww - over ons"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          style={{ objectPosition: "center center" }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.45)" }} />
        <div className="absolute inset-0 flex items-center justify-center px-8">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-white font-bold lowercase leading-[1.1] tracking-[-0.02em] text-center w-full"
            style={{ fontSize: "clamp(32px,5vw,80px)" }}
          >
            a new standard.
            <span className="hidden sm:inline-block sm:w-24" />
            <br className="sm:hidden" />
            <span className="font-light whitespace-nowrap">for good.</span>
          </motion.h1>
        </div>
      </section>

      {/* ── SECTIE 1 — DE MARKT ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[85vh]">
        <motion.div
          {...fadeUp}
          className="flex items-center px-10 md:px-20 py-20 bg-[#FAE4D6]"
        >
          <div className="max-w-sm">
            <p className="text-xs uppercase tracking-widest text-[#C08D6E] mb-5">
              De markt
            </p>
            <h2 className="text-[clamp(1.9rem,3.8vw,3.5rem)] font-bold leading-[1.15] text-[#1A1A1A]">
              <span className="font-light">de markt</span> groeit.<br />
              <span className="font-light">de standaard</span> niet.
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-[#1A1A1A]">
              Gasten boeken op basis van foto&apos;s. Ze krijgen een gok.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[#1A1A1A]">
              Hosts willen passief inkomen. Ze krijgen operationele last.
            </p>
            <p className="mt-4 text-lg font-medium text-[#1A1A1A]">
              moroww lost beide op.
            </p>
          </div>
        </motion.div>
        <div className="relative overflow-hidden min-h-[60vw] md:min-h-full">
          <Image
            src="/images/over-interieur-1.jpg"
            alt="moroww interieur"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* ── SECTIE 2 — WAT MOROWW IS ── */}
      <section className="w-full py-28 px-6 bg-[#FAE4D6]">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <p className="text-xs uppercase tracking-widest text-[#C08D6E] mb-5">
              Wat wij zijn
            </p>
            <h2 className="text-[clamp(1.9rem,3.8vw,3.5rem)] font-bold leading-[1.15] text-[#1A1A1A]">
              geen beheerder.<br />
              <span className="font-light">geen platform.</span><br />
              een label.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#1A1A1A]/80 max-w-2xl">
              De eigenaar levert het pand. moroww levert de ervaring. Wij certificeren,
              installeren en bewaken de standaard — op elk pand in de collectie, zonder
              uitzondering.
            </p>
          </motion.div>

          <div className="mt-14 max-w-2xl border-t border-[#C08D6E]/30">
            {[
              { symbool: "✗", tekst: "geen anonieme verhuurder" },
              { symbool: "✗", tekst: "geen co-host zonder systeem" },
              { symbool: "✓", tekst: "het kwaliteitslabel dat de markt miste" },
            ].map(({ symbool, tekst }, i) => (
              <motion.div
                key={tekst}
                {...fadeUp}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.06 }}
                className="flex items-center gap-6 py-5 border-b border-[#C08D6E]/30"
              >
                <span className="text-xl font-bold text-[#FEA05E] min-w-[1.5rem]">{symbool}</span>
                <span className="text-base font-medium text-[#1A1A1A]">{tekst}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTIE 3 — HET SYSTEEM (donker) ── */}
      <section
        className="w-full py-28 relative overflow-hidden"
        style={{ backgroundColor: '#1C1005' }}
      >
        {/* Gradient achtergrond */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gradient-1.png"
            alt=""
            fill
            className="object-cover opacity-60 mix-blend-luminosity"
            priority={false}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <motion.div
            {...fadeUp}
            className="max-w-4xl mx-auto px-6 md:px-16 mb-20"
          >
            <p className="text-xs uppercase tracking-widest text-[#FEA05E] mb-5">
              Het systeem
            </p>
            <h2 className="text-[clamp(1.9rem,3.8vw,3.5rem)] font-bold leading-[1.15] text-white">
              vier systemen.<br />
              <span className="font-light text-[#9CA3AF]">één belofte.</span>
            </h2>
            <p className="mt-5 text-lg font-normal text-[#C08D6E]/80 max-w-lg leading-relaxed">
              moroww levert geen geluk. Het levert architectuur. Elk systeem bestaat
              zodat de gast niets hoeft te regelen en de host nergens wakker van ligt.
            </p>
          </motion.div>

          {systeem.map((item, i) => (
            <motion.div
              key={item.nr}
              {...fadeUp}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.07 }}
              className="w-full border-t border-[#C08D6E]/20"
            >
              <div className="max-w-4xl mx-auto px-6 md:px-16 py-12 flex items-start gap-8 md:gap-20">
                <span
                  className="font-bold leading-none text-[#FEA05E] select-none hidden md:block"
                  style={{ fontSize: "clamp(4rem,9vw,7rem)", opacity: 0.15 }}
                >
                  {item.nr}
                </span>
                <div className="flex-1 pt-2">
                  <p className="text-xs uppercase tracking-widest text-[#FEA05E] mb-3 md:hidden">{item.nr}</p>
                  <h3 className="text-xl md:text-2xl font-semibold text-[#FAE4D6] mb-3">{item.titel}</h3>
                  <p className="text-base font-normal leading-relaxed text-[#C08D6E]/70">{item.tekst}</p>
                </div>
              </div>
            </motion.div>
          ))}
          <div className="border-b border-[#C08D6E]/20" />
        </div>
      </section>

      {/* ── SECTIE 4 — DE STANDAARD (gespiegeld) ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">
        <div className="relative overflow-hidden min-h-[60vw] md:min-h-full order-last md:order-first">
          <Image
            src="/images/over-interieur-2.jpg"
            alt="moroww standaard"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <motion.div
          {...fadeUp}
          className="flex items-center px-10 md:px-20 py-20 bg-[#FAE4D6] order-first md:order-last"
        >
          <div className="max-w-sm">
            <p className="text-xs uppercase tracking-widest text-[#C08D6E] mb-5">
              De standaard
            </p>
            <h2 className="text-[clamp(1.9rem,3.8vw,3.5rem)] font-bold leading-[1.15] text-[#1A1A1A]">
              wij zeggen<br />
              <span className="font-light">vaker nee</span> dan ja.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#1A1A1A]">
              Minimum 100m². Minimum 2 slaapkamers. Eigen parkeerplaats.
              Rustige omgeving. Lichtinval die klopt. Sfeer die je voelt
              voor je de foto&apos;s ziet.
            </p>
            <div className="border-t border-[#C08D6E]/30 mt-8 pt-8">
              <p className="text-base leading-relaxed text-[#1A1A1A]/70">
                Elk pand verlaat de collectie wanneer het niet langer
                voldoet. 30 dagen kennisgeving. Badge ingetrokken. Tech
                verwijderd. Geen uitzondering.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── SECTIE 5 — BRENT & NOAM ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[75vh]">
        <motion.div
          {...fadeUp}
          className="flex items-center px-10 md:px-20 py-20 bg-[#FAE4D6]"
        >
          <div className="max-w-sm">
            <p className="text-xs uppercase tracking-widest text-[#C08D6E] mb-5">
              De oprichters
            </p>
            <h2 className="text-[clamp(1.7rem,3.2vw,3rem)] font-bold leading-[1.15] text-[#1A1A1A]">
              <span className="font-light">brent</span> & noam.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#1A1A1A]">
              Brent bouwt de systemen. Noam bouwt de relaties. Samen
              bouwen ze het label dat de markt miste.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#1A1A1A]/70">
              Brent: audit-protocol, gastbeleving, tech-installatie.
              Noam: host-acquisitie, partnerships, merkleiderschap.
            </p>
            <div className="border-t border-[#C08D6E]/30 mt-6 pt-6">
              <p className="text-base font-medium text-[#1A1A1A]">
                Voltijds. Onder marktloon. Huid in het spel.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-block mt-8 bg-[#1A1A1A] text-white rounded-full px-8 py-4 text-sm font-medium hover:bg-[#333] transition-colors"
            >
              stuur ons een bericht
            </Link>
          </div>
        </motion.div>
        <div className="relative overflow-hidden min-h-[60vw] md:min-h-full">
          <Image
            src="/images/over-founders.jpg"
            alt="Brent en Noam"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* ── SECTIE 6 — SLUIT CTA (donker) ── */}
      <section className="w-full bg-[#1A1A1A] py-28 px-6 text-center">
        <motion.div {...fadeUp}>
          <h2 className="text-[clamp(1.9rem,3.8vw,3.5rem)] font-bold leading-[1.15] text-white max-w-2xl mx-auto">
            <span className="font-light">het label is open.</span><br />
            de standaard niet.
          </h2>
          <p className="mt-6 text-lg text-[#9CA3AF] max-w-xl mx-auto leading-relaxed">
            Bent u eigenaar van een woning die de standaard haalt. Of zoekt
            u een verblijf zonder loterij.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              href="/eigenaar-worden"
              className="bg-[#FEA05E] text-[#1A1A1A] rounded-full px-8 py-4 text-sm font-semibold hover:bg-[#e8904e] transition-colors"
            >
              word founding partner
            </Link>
            <Link
              href="/collectie"
              className="border border-white/30 text-white rounded-full px-8 py-4 text-sm font-medium hover:border-white/60 transition-colors"
            >
              bekijk de collectie
            </Link>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
