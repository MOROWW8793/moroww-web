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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center px-6 md:px-8"
      >
        <p
          className="text-white text-center lowercase tracking-[-0.02em] leading-[1.2]"
          style={{ fontSize: "clamp(20px,4vw,56px)" }}
        >
          <span className="font-bold">no worries for the day of</span>
          <span className="inline-block w-4 md:w-24" />
          <span className="font-normal">moroww.</span>
        </p>
      </motion.div>
    </section>
  );
}
