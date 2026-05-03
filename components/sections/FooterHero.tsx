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
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-8 text-center text-white font-bold lowercase leading-[1.2] tracking-[-0.02em]"
        style={{ fontSize: "clamp(28px,3.5vw,56px)" }}
      >
        no worries for the day of
        <span className="inline-block w-32" />
        <span className="font-normal">moroww.</span>
      </motion.p>
    </section>
  );
}
