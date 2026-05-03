"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative -mt-16 w-full overflow-hidden" style={{ height: "100dvh" }}>
      {/* Fullscreen foto */}
      <Image
        src="/images/hero.jpg"
        alt="moroww — vakantiewoning"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Desktop gradient: links donker, rechts transparant */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.75) 45%, rgba(0,0,0,0.1) 100%)",
        }}
      />

      {/* Mobiel gradient: boven naar onder */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.78) 100%)",
        }}
      />

      {/* Content: flex-row items-end zodat beide zijden op dezelfde baseline zitten */}
      <div className="absolute inset-0 flex items-end">
        <div className="w-full px-8 pb-12 md:px-14 md:pb-16 flex flex-col md:flex-row md:items-end md:justify-between">

          {/* Links: headline + subline + CTA */}
          <div className="md:max-w-[50%]">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-white font-bold lowercase leading-[1.0] tracking-[-0.02em] mb-5"
              style={{ fontSize: "clamp(40px,5vw,80px)" }}
            >
              geen gok.
              {/* Op mobiel staan beide delen in de h1 */}
              <span className="block md:hidden">een garantie.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="text-white/70 text-[18px] leading-relaxed mb-8 max-w-sm font-normal"
            >
              moroww selecteert vakantiewoningen die aan elk detail kloppen.
              Zodat jij alleen nog maar hoeft aan te komen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28, ease: "easeOut" }}
            >
              <Link
                href="/collectie"
                className="inline-flex items-center rounded-full bg-moroww-orange hover:bg-moroww-orange-dark text-white font-semibold px-8 py-4 text-base transition-colors duration-200"
              >
                Ontdek de collectie
              </Link>
            </motion.div>
          </div>

          {/* Rechts: "een garantie." — alleen desktop, aria-hidden */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="hidden md:block pr-4"
            aria-hidden="true"
          >
            <span
              className="text-white font-bold lowercase leading-[1.0] tracking-[-0.02em]"
              style={{ fontSize: "clamp(40px,5vw,80px)" }}
            >
              een garantie.
            </span>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
