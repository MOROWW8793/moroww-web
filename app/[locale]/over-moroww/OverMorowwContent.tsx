"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

export function OverMorowwContent() {
  const t = useTranslations('about')

  const systeem = [
    { nr: "01", titel: t('systeem_01_titel'), tekst: t('systeem_01_tekst') },
    { nr: "02", titel: t('systeem_02_titel'), tekst: t('systeem_02_tekst') },
    { nr: "03", titel: t('systeem_03_titel'), tekst: t('systeem_03_tekst') },
    { nr: "04", titel: t('systeem_04_titel'), tekst: t('systeem_04_tekst') },
  ]

  return (
    <main className="bg-[#FAE4D6]">

      {/* ── HERO ── */}
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
              {t('market_label')}
            </p>
            <h2 className="text-[clamp(1.9rem,3.8vw,3.5rem)] font-bold leading-[1.15] text-[#1A1A1A]">
              <span className="font-light">{t('market_h2_light')}</span> {t('market_h2_bold')}<br />
              <span className="font-light">{t('market_h2b_light')}</span> {t('market_h2b_bold')}
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-[#1A1A1A]">
              {t('market_p1')}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[#1A1A1A]">
              {t('market_p2')}
            </p>
            <p className="mt-4 text-lg font-medium text-[#1A1A1A]">
              {t('market_p3')}
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
              {t('what_label')}
            </p>
            <h2 className="text-[clamp(1.9rem,3.8vw,3.5rem)] font-bold leading-[1.15] text-[#1A1A1A]">
              {t('what_h2_1')}<br />
              <span className="font-light">{t('what_h2_2')}</span><br />
              {t('what_h2_3')}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#1A1A1A]/80 max-w-2xl">
              {t('what_body_before')}
              <Link href="/collectie" className="underline underline-offset-2 decoration-[#C08D6E]/50 hover:decoration-[#FEA05E] transition-colors">
                {t('what_collection_link')}
              </Link>
              {t('what_body_after')}
            </p>
          </motion.div>

          <div className="mt-14 max-w-2xl border-t border-[#C08D6E]/30">
            {([
              { symbool: "✗", tekst: t('check_1') },
              { symbool: "✗", tekst: t('check_2') },
              { symbool: "✓", tekst: t('check_3') },
            ] as const).map(({ symbool, tekst }, i) => (
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

      {/* ── SECTIE 3 — DE BELOFTE ── */}
      <section className="w-full py-28 bg-[#EDD5C0]">
        <motion.div
          {...fadeUp}
          className="max-w-4xl mx-auto px-6 md:px-16 mb-20"
        >
          <p className="text-xs uppercase tracking-widest text-[#C08D6E] mb-5">
            {t('promise_label')}
          </p>
          <h2 className="text-[clamp(1.9rem,3.8vw,3.5rem)] font-bold leading-[1.15] text-[#1A1A1A]">
            <span className="font-light">{t('promise_h2_light')}</span><br />
            {t('promise_h2_bold')}
          </h2>
          <p className="mt-5 text-lg font-normal text-[#1A1A1A]/60 max-w-lg leading-relaxed">
            {t('promise_intro')}
          </p>
        </motion.div>

        {systeem.map((item, i) => (
          <motion.div
            key={item.nr}
            {...fadeUp}
            transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.07 }}
            className="w-full border-t border-[#C08D6E]/25"
          >
            <div className="max-w-4xl mx-auto px-6 md:px-16 py-12 flex items-start gap-8 md:gap-20">
              <span
                className="font-bold leading-none text-[#C08D6E] select-none hidden md:block"
                style={{ fontSize: "clamp(4rem,9vw,7rem)", opacity: 0.20 }}
              >
                {item.nr}
              </span>
              <div className="flex-1 pt-2">
                <p className="text-xs uppercase tracking-widest text-[#C08D6E] mb-3 md:hidden">{item.nr}</p>
                <h3 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] mb-3">{item.titel}</h3>
                <p className="text-base font-normal leading-relaxed text-[#1A1A1A]/65">{item.tekst}</p>
              </div>
            </div>
          </motion.div>
        ))}
        <div className="border-b border-[#C08D6E]/25" />
      </section>

      {/* ── SECTIE 4 — DE STANDAARD ── */}
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
              {t('standaard_label')}
            </p>
            <h2 className="text-[clamp(1.9rem,3.8vw,3.5rem)] font-bold leading-[1.15] text-[#1A1A1A]">
              {t('standaard_h2')}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#1A1A1A]">
              {t('standaard_p1')}
            </p>
            <div className="border-t border-[#C08D6E]/30 mt-8 pt-8">
              <p className="text-base leading-relaxed text-[#1A1A1A]/70">
                {t('standaard_p2')}
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
              {t('founders_label')}
            </p>
            <h2 className="text-[clamp(1.7rem,3.2vw,3rem)] font-bold leading-[1.15] text-[#1A1A1A]">
              <span className="font-light">{t('founders_h2_light')}</span> {t('founders_h2_bold')}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#1A1A1A]">
              {t('founders_p1')}
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#1A1A1A]/70">
              {t('founders_p2')}
            </p>
            <div className="border-t border-[#C08D6E]/30 mt-6 pt-6">
              <p className="text-base font-medium text-[#1A1A1A]">
                {t('founders_p3')}
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-block mt-8 bg-[#1A1A1A] text-white rounded-full px-8 py-4 text-sm font-medium hover:bg-[#333] transition-colors"
            >
              {t('founders_cta_contact')}
            </Link>
            <Link
              href="/collectie"
              className="inline-block mt-4 border border-[#1A1A1A]/30 text-[#1A1A1A] rounded-full px-8 py-4 text-sm font-medium hover:border-[#1A1A1A] transition-colors"
            >
              {t('founders_cta_collection')}
            </Link>
          </div>
        </motion.div>
        <div className="relative overflow-hidden min-h-[60vw] md:min-h-full">
          <Image
            src="/images/over-founders.jpg"
            alt="Brent De Baets en Noam Landries — oprichters moroww"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* ── SECTIE 6 — SLUIT CTA ── */}
      <section className="w-full bg-[#1A1A1A] py-28 px-6 text-center">
        <motion.div {...fadeUp}>
          <h2 className="text-[clamp(1.9rem,3.8vw,3.5rem)] font-bold leading-[1.15] text-white max-w-2xl mx-auto">
            <span className="font-light">{t('cta_h2_light')}</span><br />
            {t('cta_h2_bold')}
          </h2>
          <p className="mt-6 text-lg text-[#9CA3AF] max-w-xl mx-auto leading-relaxed">
            {t('cta_body')}
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              href="/eigenaar-worden"
              className="bg-[#FEA05E] text-[#1A1A1A] rounded-full px-8 py-4 text-sm font-semibold hover:bg-[#e8904e] transition-colors"
            >
              {t('cta_owner')}
            </Link>
            <Link
              href="/collectie"
              className="border border-white/30 text-white rounded-full px-8 py-4 text-sm font-medium hover:border-white/60 transition-colors"
            >
              {t('cta_collection')}
            </Link>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
