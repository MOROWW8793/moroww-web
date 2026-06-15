"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

export function Hero() {
  const locale = useLocale();
  const tNav = useTranslations('nav');
  const tHome = useTranslations('home');
  const bookUrl = `https://book.moroww.com/${locale}/properties?minOccupancy=1`;

  return (
    <section className="h-hero-calc relative -mt-16 w-full overflow-hidden mb-0">
      <Image
        src="/images/hero.jpg"
        alt="moroww vakantiewoning - premium verblijf in België"
        fill
        priority
        className="object-cover"
        sizes="100vw"
        style={{ objectPosition: "center center" }}
      />

      {/* Overlay - stronger on mobile */}
      <div className="absolute inset-0 bg-black/50 md:bg-black/38" />

      {/* Content block — bottom-left */}
      <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-16 md:pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-white font-bold lowercase leading-[1.12] tracking-[-0.02em] max-w-2xl"
          style={{ fontSize: "clamp(32px,5vw,64px)" }}
        >
          {tHome('hero')}
        </motion.h1>

        <motion.a
          href={bookUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          className="mt-6 self-start bg-[#FEA05E] text-white rounded-full px-8 py-4 text-base font-semibold hover:bg-[#e8904e] transition-colors"
        >
          {tNav('book')}
        </motion.a>
      </div>
    </section>
  );
}
