"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="-mt-16 flex flex-col md:flex-row" style={{ height: "100dvh" }}>
      {/* Photo panel — top on mobile, right on desktop */}
      <div className="relative h-[40vh] md:h-full md:w-1/2 order-first md:order-last">
        <Image
          src="/images/hero.jpg"
          alt="moroww — vakantiewoning"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* Right half of headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute bottom-8 md:bottom-14 left-8 md:left-12 right-4"
          aria-hidden="true"
        >
          <span
            className="text-white font-bold lowercase leading-[1.0] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.75rem,5.5vw,5.5rem)" }}
          >
            een garantie.
          </span>
        </motion.div>
      </div>

      {/* Dark panel — bottom on mobile, left on desktop */}
      <div className="flex flex-col justify-between bg-[#1A1A1A] px-8 py-10 md:px-14 md:py-16 w-full md:w-1/2 flex-1 md:h-full">
        {/* Spacer pushes content to bottom on desktop */}
        <div className="hidden md:block" />

        <div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-white font-bold lowercase leading-[1.0] tracking-[-0.02em] mb-6"
            style={{ fontSize: "clamp(2.75rem,5.5vw,5.5rem)" }}
          >
            geen gok.{" "}
            <span className="sr-only">een garantie.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-white/65 text-[18px] leading-relaxed mb-10 max-w-sm font-normal"
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
      </div>
    </section>
  );
}
