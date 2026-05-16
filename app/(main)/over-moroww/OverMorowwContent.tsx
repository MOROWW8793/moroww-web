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
    tekst: "Elke woning wordt fysiek bezocht voor opname. Geen foto-akkoord. Geen uitzonderingen. Wie niet door de selectie komt, komt er niet in.",
  },
  {
    nr: "02",
    titel: "gastenpagina",
    tekst: "Bij aankomst scannen gasten een QR-code. Check-in, huisregels, handleidingen, lokale tips — in hun eigen taal. Geen WhatsApp-keten. Geen zoeken.",
  },
  {
    nr: "03",
    titel: "sensory design",
    tekst: "Geur, licht, textuur. Elke woning is sensorisch ingericht. Niet toevallig — ontworpen. Het gevoel dat je krijgt is geen geluk.",
  },
  {
    nr: "04",
    titel: "kwaliteitsopvolging",
    tekst: "De standaard stopt niet bij opname. Wie de lat niet langer haalt, verlaat de collectie. Het label is meer waard dan elk contract.",
  },
];

export function OverMorowwContent() {
  return (
    <>
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

      {/* ── SECTIE 1: VERHAAL (50/50 split) ── */}
      <section className="w-full flex flex-col md:flex-row min-h-[80vh]" style={{ background: "#FAE4D6" }}>
        {/* Tekst links */}
        <motion.div
          {...fadeUp}
          className="w-full md:w-1/2 flex items-center py-20 md:py-0"
          style={{ paddingLeft: "clamp(24px,6vw,96px)", paddingRight: "clamp(24px,4vw,48px)" }}
        >
          <div className="max-w-md">
            <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, color: "#C08D6E", marginBottom: 16 }}>
              Ons verhaal
            </p>
            <h2
              className="font-bold lowercase leading-[1.1] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)", color: "#1A1A1A" }}
            >
              sommige huizen voelen gewoon juist aan.
            </h2>
            <div style={{ marginTop: 32, fontSize: 18, lineHeight: 1.7, color: "#1A1A1A" }}>
              <p>
                Je kent het gevoel. Je stapt binnen en het klopt. De lucht, het licht, de sfeer — alles op zijn plek.
              </p>
              <p style={{ marginTop: 16 }}>
                Wij zijn Brent en Noam. Te vaak kwamen we terug van een vakantie die op foto perfect was en ter plaatse tegenviel.
              </p>
              <p style={{ marginTop: 16 }}>
                moroww is ons antwoord. Geen platform. Geen loterij. Een label dat inspecteert, een systeem dat levert, een standaard die we nooit loslaten.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Foto rechts */}
        <div className="w-full md:w-1/2 overflow-hidden" style={{ minHeight: "50vw" }}>
          <div className="relative w-full h-full min-h-[320px] md:min-h-full">
            <Image
              src="/images/over-interieur-1.jpg"
              alt="moroww interieur"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ── SECTIE 2: LABEL. GEEN PLATFORM. ── */}
      <section style={{ background: "#FAE4D6" }} className="w-full py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, color: "#C08D6E", marginBottom: 16 }}>
              Wat wij zijn
            </p>
            <h2
              className="font-bold lowercase leading-[1.1] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.5rem,6vw,5rem)", color: "#1A1A1A" }}
            >
              een label.<br />geen platform.
            </h2>
            <p className="max-w-xl" style={{ marginTop: 24, fontSize: 18, lineHeight: 1.7, color: "rgba(26,26,26,0.7)" }}>
              moroww beheert geen muren. moroww levert een belofte. Wie de standaard niet haalt, verlaat de collectie.
            </p>
          </motion.div>

          <div className="max-w-2xl mt-12" style={{ borderTop: "1px solid rgba(192,141,110,0.3)" }}>
            {[
              { symbool: "✗", tekst: "geen anoniem platform" },
              { symbool: "✗", tekst: "geen co-host zonder systeem" },
              { symbool: "✓", tekst: "een label met operationele tanden" },
            ].map(({ symbool, tekst }, i) => (
              <motion.div
                key={tekst}
                {...fadeUp}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.06 }}
                className="flex items-center gap-6 py-5"
                style={{ borderBottom: "1px solid rgba(192,141,110,0.3)" }}
              >
                <span className="font-bold shrink-0" style={{ fontSize: 24, color: "#FEA05E", minWidth: "2rem" }}>{symbool}</span>
                <p style={{ fontSize: 16, fontWeight: 500, color: "#1A1A1A" }}>{tekst}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTIE 3: HET SYSTEEM (dark, rijen) ── */}
      <section className="w-full py-28" style={{ background: "#1A1A1A" }}>
        {/* Header */}
        <motion.div
          {...fadeUp}
          className="px-6 md:px-16 mb-20"
          style={{ maxWidth: "64rem", margin: "0 auto 5rem" }}
        >
          <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, color: "#FEA05E", marginBottom: 16 }}>
            Het systeem
          </p>
          <h2
            className="font-bold lowercase leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.5rem,6vw,5rem)", color: "#ffffff" }}
          >
            het systeem achter de standaard.
          </h2>
          <p style={{ marginTop: 16, fontSize: 18, color: "#9CA3AF", maxWidth: "32rem", lineHeight: 1.7 }}>
            moroww levert geen geluk. Het levert architectuur.
          </p>
        </motion.div>

        {/* Rijen */}
        {systeem.map(({ nr, titel, tekst }, i) => (
          <motion.div
            key={nr}
            {...fadeUp}
            transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.07 }}
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
            className="px-6 md:px-16"
          >
            <div
              className="flex items-start gap-12 md:gap-24 py-12"
              style={{ maxWidth: "64rem", margin: "0 auto" }}
            >
              {/* Ghost number */}
              <span
                className="font-bold leading-none shrink-0 hidden md:block"
                style={{ fontSize: "clamp(4rem,10vw,8rem)", color: "#FEA05E", opacity: 0.2 }}
              >
                {nr}
              </span>
              {/* Content */}
              <div className="flex-1 pt-2">
                <p style={{ fontSize: 11, fontWeight: 600, color: "#FEA05E", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }} className="md:hidden">{nr}</p>
                <h3 className="font-semibold lowercase" style={{ fontSize: "clamp(1.1rem,2vw,1.5rem)", color: "#ffffff", marginBottom: 12 }}>{titel}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: "#9CA3AF" }}>{tekst}</p>
              </div>
            </div>
          </motion.div>
        ))}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }} />
      </section>

      {/* ── SECTIE 4: DE STANDAARD (50/50 gespiegeld) ── */}
      <section className="w-full flex flex-col md:flex-row min-h-[70vh]" style={{ background: "#FAE4D6" }}>
        {/* Foto links */}
        <div className="w-full md:w-1/2 overflow-hidden order-last md:order-first" style={{ minHeight: "50vw" }}>
          <div className="relative w-full h-full min-h-[320px] md:min-h-full">
            <Image
              src="/images/over-interieur-2.jpg"
              alt="moroww standaard"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Tekst rechts */}
        <motion.div
          {...fadeUp}
          className="w-full md:w-1/2 flex items-center py-20 md:py-0 order-first md:order-last"
          style={{ paddingRight: "clamp(24px,6vw,96px)", paddingLeft: "clamp(24px,4vw,48px)" }}
        >
          <div className="max-w-sm">
            <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, color: "#C08D6E", marginBottom: 16 }}>
              De standaard
            </p>
            <h2
              className="font-bold lowercase leading-[1.1] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)", color: "#1A1A1A" }}
            >
              wij zeggen vaker nee dan ja.
            </h2>
            <p style={{ marginTop: 24, fontSize: 18, lineHeight: 1.7, color: "#1A1A1A" }}>
              Minimum 100m². Eigen parkeerplaats. Rustige omgeving. Lichtinval die klopt. Sfeer die je voelt voor je de foto&apos;s ziet.
            </p>
            <div style={{ borderTop: "1px solid rgba(192,141,110,0.3)", marginTop: 24, paddingTop: 24 }}>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(26,26,26,0.7)" }}>
                Elk pand verlaat de collectie wanneer het niet langer voldoet. Geen overgangsperiode. Geen uitzondering. Het label gaat voor.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── SECTIE 5: OPRICHTERS (50/50) ── */}
      <section className="w-full flex flex-col md:flex-row min-h-[70vh]" style={{ background: "#FAE4D6" }}>
        {/* Tekst links */}
        <motion.div
          {...fadeUp}
          className="w-full md:w-1/2 flex items-center py-20 md:py-0"
          style={{ paddingLeft: "clamp(24px,6vw,96px)", paddingRight: "clamp(24px,4vw,48px)" }}
        >
          <div className="max-w-sm">
            <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, color: "#C08D6E", marginBottom: 16 }}>
              De oprichters
            </p>
            <h2
              className="font-bold lowercase leading-[1.1] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2rem,4vw,4rem)", color: "#1A1A1A" }}
            >
              brent & noam.
            </h2>
            <p style={{ marginTop: 24, fontSize: 18, lineHeight: 1.7, color: "#1A1A1A" }}>
              Brent bouwt de systemen. Noam bouwt de relaties. Samen bouwen ze het label dat de markt miste.
            </p>
            <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.7, color: "rgba(26,26,26,0.7)" }}>
              Voltijds. Onder marktloon. Huid in het spel.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-full font-medium text-sm transition-opacity hover:opacity-80"
              style={{ background: "#1A1A1A", color: "#ffffff", padding: "16px 32px", marginTop: 32, textDecoration: "none" }}
            >
              stuur ons een bericht
            </Link>
          </div>
        </motion.div>

        {/* Foto rechts */}
        <div className="w-full md:w-1/2 overflow-hidden" style={{ minHeight: "50vw" }}>
          <div className="relative w-full h-full min-h-[320px] md:min-h-full">
            <Image
              src="/images/over-founders.jpg"
              alt="Brent & Noam"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ── DARK FOOTER QUOTE ── */}
      <section className="w-full py-32 px-6 md:px-16" style={{ background: "#1A1A1A" }}>
        <motion.div {...fadeUp} className="max-w-4xl mx-auto text-center">
          <h2
            className="font-bold lowercase leading-[1.05] tracking-[-0.02em] mb-6"
            style={{ fontSize: "clamp(2.5rem,5vw,5rem)", color: "#ffffff" }}
          >
            no worries for the day of moroww.
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)" }}>
            Opgericht in België. Gebouwd voor wie kwaliteit verwacht.
          </p>
        </motion.div>
      </section>
    </>
  );
}
