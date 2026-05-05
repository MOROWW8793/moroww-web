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

export function OverMorowwContent() {
  return (
    <>
      {/* ── SECTIE 1: HERO ── */}
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

      {/* ── SECTIE 2: HET VERHAAL ── */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-16 lg:px-24 w-full overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Tekst links */}
          <motion.div {...fadeUp} className="flex-1">
            <p className="text-xs font-normal uppercase tracking-widest text-moroww-orange mb-4">
              ons verhaal
            </p>
            <h2
              className="font-bold lowercase text-moroww-black leading-[1.05] tracking-[-0.02em] mb-6"
              style={{ fontSize: "clamp(2.25rem,4vw,3.5rem)" }}
            >
              sommige huizen voelen<br />gewoon juist aan.
            </h2>
            <div className="text-moroww-black/60 leading-relaxed space-y-4 max-w-prose" style={{ fontSize: 17 }}>
              <p>
                Je kent het wel. Je stapt een woning binnen en het klopt gewoon.
                De lucht, het licht, de sfeer - alles.
              </p>
              <p>
                Wij zijn Brent en Noam. Twee ondernemers die te vaak teleurgesteld
                thuiskwamen van een vakantie die er op foto perfect uitzag maar ter
                plaatse tegenviel.
              </p>
              <p>
                moroww is ons antwoord. Geen platform. Geen loterij. Een label dat
                fysiek inspecteert, een systeem dat levert, en een standaard die we
                nooit loslaten.
              </p>
            </div>
          </motion.div>

          {/* Foto rechts */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            className="relative w-full md:w-1/2 shrink-0 h-[300px] md:h-[500px] rounded-3xl overflow-hidden"
          >
            <Image
              src="/images/over-interieur-1.jpg"
              alt="moroww interieur"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </section>

      {/* ── SECTIE 3: WAT MOROWW IS ── */}
      <section className="bg-moroww-blush py-16 md:py-24 px-6 md:px-16 lg:px-24 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2
              className="font-bold lowercase text-moroww-black leading-[1.05] tracking-[-0.02em] mb-8"
              style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)" }}
            >
              een label.<br />geen platform.
            </h2>
            <p className="text-moroww-black/60 leading-relaxed mx-auto mb-16 max-w-2xl" style={{ fontSize: 20 }}>
              moroww beheert geen muren. moroww levert een belofte.
              Elke woning in de collectie is fysiek geïnspecteerd,
              sensorisch ingericht en technologisch bewaakt.
              Wie de standaard niet haalt, verlaat de collectie.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { symbool: "✗", tekst: "Geen anoniem platform" },
              { symbool: "✗", tekst: "Geen lokale co-host zonder systeem" },
              { symbool: "✓", tekst: "Een label met operationele tanden" },
            ].map(({ symbool, tekst }, i) => (
              <motion.div
                key={tekst}
                {...fadeUp}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.08 }}
                className="bg-white rounded-2xl p-8 flex flex-col items-center gap-3 shadow-sm"
              >
                <span className="text-4xl font-bold text-moroww-orange">{symbool}</span>
                <p className="text-moroww-black font-semibold text-base text-center">{tekst}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTIE 4: DE STANDAARD ── */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-16 lg:px-24 w-full overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Foto links */}
          <motion.div
            {...fadeUp}
            className="relative w-full md:w-1/2 shrink-0 h-[300px] md:h-[450px] rounded-3xl overflow-hidden order-first"
          >
            <Image
              src="/images/over-interieur-2.jpg"
              alt="moroww standaard"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          {/* Tekst rechts */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            className="flex-1"
          >
            <p className="text-xs font-normal uppercase tracking-widest text-moroww-orange mb-4">
              de standaard
            </p>
            <h2
              className="font-bold lowercase text-moroww-black leading-[1.05] tracking-[-0.02em] mb-6"
              style={{ fontSize: "clamp(2.25rem,4vw,3.5rem)" }}
            >
              wij zeggen vaker<br />nee dan ja.
            </h2>
            <div className="text-moroww-black/60 leading-relaxed space-y-4 max-w-prose" style={{ fontSize: 17 }}>
              <p>
                Minimum 100m². Eigen parkeerplaats. Rustige omgeving.
                Lichtinval die klopt. Sfeer die je voelt voor je de foto&apos;s ziet.
              </p>
              <p>
                Elk pand wordt fysiek bezocht door ons team.
                Geen uitzonderingen. Geen foto-akkoord.
                Wie de standaard niet langer haalt, verlaat de collectie.
                Het label is meer waard dan elk contract.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTIE 5: BRENT & NOAM ── */}
      <section className="bg-moroww-blush py-16 md:py-24 px-6 md:px-16 lg:px-24 w-full overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Foto links */}
          <motion.div
            {...fadeUp}
            className="relative w-full md:w-1/2 shrink-0 h-[300px] md:h-[550px] rounded-3xl overflow-hidden"
          >
            <Image
              src="/images/over-founders.jpg"
              alt="Brent & Noam"
              fill
              className="object-cover"
              style={{ objectPosition: "center center" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          {/* Tekst rechts */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            className="flex-1 flex flex-col justify-center"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-moroww-black mb-4">
              De oprichters
            </p>
            <h2
              className="font-bold lowercase text-moroww-black leading-[1.05] tracking-[-0.02em] mb-6"
              style={{ fontSize: "clamp(2rem,4vw,3.5rem)" }}
            >
              Brent & Noam.
            </h2>
            <div className="text-moroww-black/60 leading-relaxed space-y-4 mb-10" style={{ fontSize: 17 }}>
              <p>
                Brent bouwt de systemen. Noam bouwt de relaties.
                Samen bouwen ze het label dat de markt miste.
              </p>
              <p>Voltijds. Onder marktloon. Huid in het spel.</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border-2 border-moroww-black text-moroww-black font-semibold px-8 py-4 text-base hover:bg-moroww-black hover:text-white transition-colors duration-200 self-start"
            >
              Stuur ons een bericht
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SECTIE 6: MERKQUOTE ── */}
      <section className="bg-[#1A1A1A] py-32 px-6 md:px-16 lg:px-24 w-full">
        <motion.div {...fadeUp} className="max-w-4xl mx-auto text-center">
          <h2
            className="font-bold lowercase text-white leading-[1.05] tracking-[-0.02em] mb-6"
            style={{ fontSize: "clamp(2.5rem,5vw,5rem)" }}
          >
            no worries for the day of moroww.
          </h2>
          <p className="text-white/60 font-normal" style={{ fontSize: 18 }}>
            Opgericht in België. Gebouwd voor wie kwaliteit verwacht.
          </p>
        </motion.div>
      </section>
    </>
  );
}
