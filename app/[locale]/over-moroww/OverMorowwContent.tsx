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
  const tStandaard = useTranslations('destandaard')

  const systeem = [
    { nr: "01", titel: t('systeem_01_titel'), tekst: t('systeem_01_tekst') },
    { nr: "02", titel: t('systeem_02_titel'), tekst: t('systeem_02_tekst') },
    { nr: "03", titel: t('systeem_03_titel'), tekst: t('systeem_03_tekst') },
    { nr: "04", titel: t('systeem_04_titel'), tekst: t('systeem_04_tekst') },
  ]

  return (
    <main className="bg-[#FAE4D6]">

      {/* ── HERO ── */}
      <section className="h-hero-calc relative -mt-16 w-full overflow-hidden mb-0">
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
            {t('hero_h1_bold')}
            <span className="hidden sm:inline-block sm:w-24" />
            <br className="sm:hidden" />
            <span className="font-light whitespace-nowrap">{t('hero_h1_light')}</span>
          </motion.h1>
        </div>
      </section>

      {/* ── ONS VERHAAL — draagt het zonder beeld ── */}
      <section className="w-full py-20 md:py-32 px-6 bg-[#FAE4D6]">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <p className="text-xs uppercase tracking-widest text-[#C08D6E] mb-10">
              {t('story_label')}
            </p>

            <p
              className="font-bold text-[#1A1A1A] leading-[1.15] tracking-[-0.02em] mb-10"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              {t('story_p1')}
            </p>

            <div className="space-y-6 text-[#1A1A1A]/85 leading-relaxed" style={{ fontSize: 18 }}>
              <p>{t('story_p2')}</p>
              <p>{t('story_p3')}</p>
              <p>{t('story_p4')}</p>
              <p>{t('story_p5')}</p>
              <p>{t('story_p6')}</p>
              <p>{t('story_p7')}</p>
            </div>

            <p
              className="font-bold text-[#1A1A1A] leading-[1.15] tracking-[-0.02em] mt-10"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              {t('story_p8')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SECTIE 2 — WAT MOROWW IS ── */}
      <section className="w-full py-16 md:py-28 px-6 bg-[#FAE4D6]">
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

        </div>
      </section>

      {/* ── SECTIE 3 — DE BELOFTE ── */}
      <section className="w-full py-12 md:py-20 bg-moroww-brown/15">
        <motion.div
          {...fadeUp}
          className="max-w-4xl mx-auto px-6 md:px-16 mb-12"
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

        <div className="max-w-4xl mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {systeem.map((item, i) => (
              <motion.div
                key={item.nr}
                {...fadeUp}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.07 }}
                className={`border-t border-[#C08D6E]/25 py-8 ${i % 2 === 1 ? "md:pl-10 md:border-l md:border-[#C08D6E]/25" : "md:pr-10"}`}
              >
                <span
                  className="block font-bold leading-none text-[#C08D6E] select-none"
                  style={{ fontSize: "2.5rem", opacity: 0.20 }}
                >
                  {item.nr}
                </span>
                <h3 className="text-base font-semibold text-[#1A1A1A] mt-2 mb-1.5">{item.titel}</h3>
                <p className="text-sm font-normal leading-relaxed text-[#1A1A1A]/65">{item.tekst}</p>
              </motion.div>
            ))}
          </div>
          <div className="border-b border-[#C08D6E]/25" />
        </div>
      </section>

      {/* ── SECTIE 4 — DE STANDAARD (kort, met link naar /de-standaard voor de volledige uitleg) ── */}
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
          className="flex items-center px-6 py-12 md:px-20 md:py-20 bg-[#FAE4D6] order-first md:order-last"
        >
          <div className="max-w-sm">
            <p className="text-xs uppercase tracking-widest text-[#C08D6E] mb-5">
              {t('standaard_label')}
            </p>
            <h2 className="text-[clamp(1.9rem,3.8vw,3.5rem)] font-bold leading-[1.15] text-[#1A1A1A]">
              {t('standaard_h2')}
            </h2>
            <ul className="mt-8 space-y-3 text-lg text-[#1A1A1A]">
              <li className="flex items-baseline gap-3">
                <span className="text-[#C08D6E]/60 font-semibold text-sm select-none">01</span>
                <span>{tStandaard('gate01_title')}</span>
              </li>
              <li className="flex items-baseline gap-3">
                <span className="text-[#C08D6E]/60 font-semibold text-sm select-none">02</span>
                <span>{tStandaard('gate02_title')}</span>
              </li>
              <li className="flex items-baseline gap-3">
                <span className="text-[#C08D6E]/60 font-semibold text-sm select-none">03</span>
                <span>{tStandaard('gate03_title')}</span>
              </li>
              <li className="flex items-baseline gap-3">
                <span className="text-[#C08D6E]/60 font-semibold text-sm select-none">04</span>
                <span>{tStandaard('gate04_title')}</span>
              </li>
            </ul>
            <Link
              href="/de-standaard"
              className="inline-block mt-8 text-sm underline underline-offset-4 decoration-[#C08D6E]/50 hover:decoration-[#FEA05E] text-[#1A1A1A]"
            >
              {tStandaard('read_full_standard')} →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── SECTIE 5 — DE OPRICHTER ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[75vh]">
        <motion.div
          {...fadeUp}
          className="flex items-center px-6 py-12 md:px-20 md:py-20 bg-[#FAE4D6]"
        >
          <div className="max-w-sm">
            <p className="text-xs uppercase tracking-widest text-[#C08D6E] mb-5">
              {t('oprichter_label')}
            </p>
            <div className="space-y-5 text-[#1A1A1A]/85 leading-relaxed" style={{ fontSize: 17 }}>
              <p>{t('oprichter_p1')}</p>
              <p>{t('oprichter_p2')}</p>
              <p className="font-semibold text-[#1A1A1A]">{t('oprichter_p3')}</p>
            </div>
            <p className="text-sm text-[#1A1A1A]/60 mt-8">
              {t('founders_owner_prompt')}{' '}
              <Link
                href="/eigenaar-worden"
                className="underline underline-offset-2 decoration-[#C08D6E]/50 hover:decoration-[#FEA05E]"
              >
                {t('founders_owner_cta')}
              </Link>
            </p>
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
            src="/images/noam.jpg"
            alt="Noam Landries, oprichter van moroww"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* ── SECTIE 6 — SLUIT CTA ── */}
      <section className="w-full bg-[#1A1A1A] py-16 md:py-28 px-6 text-center">
        <motion.div {...fadeUp}>
          <h2 className="text-[clamp(1.9rem,3.8vw,3.5rem)] font-bold leading-[1.15] text-white max-w-2xl mx-auto">
            <span className="font-light">{t('cta_h2_light')}</span><br />
            {t('cta_h2_bold')}
          </h2>
          <p className="mt-6 text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
            {t('cta_body')}
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              href="/eigenaar-worden"
              className="bg-[#FEA05E] text-[#1A1A1A] rounded-full px-8 py-4 text-sm font-semibold hover:bg-moroww-orange/85 transition-colors"
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
