"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { LeadForm } from "@/components/ui/LeadForm";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

export function EigenaarContent() {
  const t = useTranslations('owner')

  const systeem = [
    { nr: "01", titel: t('sys_01_titel'), tekst: t('sys_01_tekst') },
    { nr: "02", titel: t('sys_02_titel'), tekst: t('sys_02_tekst') },
    { nr: "03", titel: t('sys_03_titel'), tekst: t('sys_03_tekst') },
    { nr: "04", titel: t('sys_04_titel'), tekst: t('sys_04_tekst') },
    { nr: "05", titel: t('sys_05_titel'), tekst: t('sys_05_tekst') },
    { nr: "06", titel: t('sys_06_titel'), tekst: t('sys_06_tekst') },
  ]

  const voordelen = [
    { titel: t('fp_01_titel'), tekst: t('fp_01_tekst') },
    { titel: t('fp_02_titel'), tekst: t('fp_02_tekst') },
    { titel: t('fp_03_titel'), tekst: t('fp_03_tekst') },
    { titel: t('fp_04_titel'), tekst: t('fp_04_tekst') },
  ]

  const stappen = [
    { nr: "01", titel: t('stap_01_titel'), tekst: t('stap_01_tekst') },
    { nr: "02", titel: t('stap_02_titel'), tekst: t('stap_02_tekst') },
    { nr: "03", titel: t('stap_03_titel'), tekst: t('stap_03_tekst') },
  ]

  return (
    <div className="bg-[#1A1A1A]">
      <h1 className="sr-only">
        Vakantiewoning verhuren in België via moroww — gecertificeerd kwaliteitslabel met smart lock, audit en directe boeking
      </h1>
      {/* ── SECTIE 1: HERO ── */}
      <section className="h-hero relative w-full overflow-hidden mb-0">
        {/* Achtergrondfoto vult volledige viewport */}
        <div className="absolute inset-0">
          <Image
            src="/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-115.jpg"
            alt="moroww woning detail"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>

        {/* Donkere gradient onderaan voor tekst-leesbaarheid */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Content onderaan gepositioneerd */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 lg:px-24 pb-16 md:pb-20 lg:pb-24"
        >
          <div className="max-w-3xl">
            <p className="text-[#FEA05E] text-sm font-medium tracking-[0.2em] uppercase mb-6 md:mb-8">
              {t('hero_label')}
            </p>
            <h2 className="text-white text-[clamp(2rem,7vw,6rem)] leading-[1.05] mb-8 md:mb-10">
              <span className="font-light">{t('hero_h1_light1')} </span>
              <span className="font-bold">{t('hero_h1_main')} </span>
              <span className="font-light">{t('hero_h1_light2')} </span>
              <span className="font-bold">{t('hero_h1_bold')}</span>
            </h2>
            <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-xl mb-8 md:mb-10">
              {t('hero_body')}
            </p>
            <div className="inline-block border border-white/40 rounded-full px-6 py-3 text-white/80 text-sm">
              {t('hero_badge')}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── SECTIE 2: WAT MOROWW INSTALLEERT ── */}
      <section className="w-full bg-[#1A1A1A] py-16 md:py-28 mt-0">
        <div className="relative z-10">
          <motion.div {...fadeUp} className="max-w-4xl mx-auto px-6 md:px-16 mb-20">
            <p className="text-xs uppercase tracking-widest text-[#FEA05E] mb-5">
              {t('tech_label')}
            </p>
            <h2 className="text-[clamp(1.75rem,5.5vw,5rem)] font-bold leading-[1.1] text-white">
              <span className="font-light">{t('tech_h2_light')}</span><br />
              {t('tech_h2_main')}<br />
              <span className="font-light">{t('tech_h2_light2')}</span>
            </h2>
            <p className="mt-5 text-lg text-[#9CA3AF] max-w-lg leading-relaxed">
              {t('tech_body')}
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
                  style={{ fontSize: "clamp(2rem,8vw,6rem)", opacity: 0.15 }}
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

      {/* ── SECTIE 4: VOORDELEN ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">
        {/* Tekst links */}
        <motion.div
          {...fadeUp}
          className="flex items-center px-6 py-12 md:px-20 md:py-20 bg-[#FAE4D6]"
        >
          <div className="max-w-sm">
            <p className="text-xs uppercase tracking-widest text-[#C08D6E] mb-5">
              {t('fp_label')}
            </p>
            <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-bold leading-[1.1] text-[#1A1A1A]">
              <span className="font-light">{t('fp_h2_light')}</span><br />
              {t('fp_h2_bold')}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#1A1A1A]">
              {t('fp_body')}
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
      <section className="w-full py-16 md:py-28 px-6 bg-[#FAE4D6]">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <p className="text-xs uppercase tracking-widest text-[#C08D6E] mb-5">
              {t('traject_label')}
            </p>
            <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-bold leading-[1.1] text-[#1A1A1A]">
              {t('traject_h2_1')}<br />
              <span className="font-light">{t('traject_h2_2')}</span>
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
          className="flex items-center px-6 py-12 md:px-16 md:py-20 bg-[#1A1A1A]"
        >
          <div className="max-w-sm">
            <p className="text-xs uppercase tracking-widest text-[#FEA05E] mb-5">
              {t('team_label')}
            </p>
            <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold leading-[1.1] text-white">
              <span className="font-light">{t('team_h2_light')}</span><br />
              {t('team_h2_bold')}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#9CA3AF]">
              {t('team_p1')}
            </p>
            <p className="mt-4 text-base text-[#9CA3AF]">
              {t('team_email')}
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── SECTIE 7: FORMULIER ── */}
      <section className="w-full py-16 md:py-28 px-6 bg-[#FAE4D6]">
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeUp}>
            <p className="text-xs uppercase tracking-widest text-[#C08D6E] mb-5">
              {t('form_label')}
            </p>
            <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-bold leading-[1.1] text-[#1A1A1A]">
              <span className="font-light">{t('form_h2_light')}</span><br />
              {t('form_h2_bold')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#1A1A1A]/70">
              {t('form_body')}
            </p>
          </motion.div>

          <div className="mt-12">
            <LeadForm />
          </div>
        </div>
      </section>
    </div>
  );
}
