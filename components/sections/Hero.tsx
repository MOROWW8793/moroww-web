"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative -mt-16 w-full overflow-hidden" style={{ height: "100dvh" }}>
      <Image
        src="/images/hero.jpg"
        alt="moroww — vakantiewoning"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Subtiele overlay voor leesbaarheid */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.38)" }}
      />

      {/* Headline gecentreerd midden op de foto */}
      <div className="absolute inset-0 flex items-center justify-center px-8">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-white font-bold lowercase leading-[1.1] tracking-[-0.02em] text-center w-full"
          style={{ fontSize: "clamp(36px,5vw,72px)" }}
        >
          a new standard for
          <span className="inline-block min-w-[200px]" />
          short term rentals.
        </motion.h1>
      </div>
    </section>
  );
}
