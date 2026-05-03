"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function FooterHero() {
  return (
    <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
      <Image
        src="/images/exterieur-1.jpg"
        alt="moroww"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.35)" }}
      />

      {/* Headline gecentreerd midden op de foto */}
      <div className="absolute inset-0 flex items-center justify-center px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-white font-bold lowercase leading-[1.1] tracking-[-0.02em] text-center w-full"
          style={{ fontSize: "clamp(28px,6vw,48px)" }}
        >
          <span className="md:hidden">
            no worries for the day of moroww.
          </span>
          <span className="hidden md:inline" style={{ fontSize: "clamp(40px,5vw,80px)" }}>
            no worries for the day
            <span className="inline-block min-w-[180px]" />
            of moroww.
          </span>
        </motion.p>
      </div>
    </section>
  );
}
