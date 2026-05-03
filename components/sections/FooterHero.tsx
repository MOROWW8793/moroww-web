"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function FooterHero() {
  return (
    <section className="flex flex-col md:flex-row" style={{ minHeight: "60vh" }}>
      {/* Links: foto, exact 50% */}
      <div className="relative w-full md:w-1/2" style={{ minHeight: "60vh" }}>
        <Image
          src="/images/exterieur-1.jpg"
          alt="moroww"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute bottom-8 left-8"
        >
          <p
            className="text-white font-bold lowercase leading-[1.0] tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px,4vw,64px)" }}
          >
            no worries
          </p>
        </motion.div>
      </div>

      {/* Rechts: donker, exact 50%, tekst verticaal gecentreerd */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="w-full md:w-1/2 bg-[#1A1A1A] flex items-center px-8 md:pl-12 py-12 md:py-0"
        style={{ minHeight: "30vh" }}
      >
        <p
          className="text-white font-bold lowercase leading-[1.0] tracking-[-0.02em]"
          style={{ fontSize: "clamp(32px,4vw,64px)" }}
        >
          for the day of moroww.
        </p>
      </motion.div>
    </section>
  );
}
