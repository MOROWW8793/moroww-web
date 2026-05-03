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
        className="absolute inset-0 flex items-center justify-center px-8"
      >
        <p
          className="text-white text-center lowercase tracking-[-0.02em] leading-[1.2]"
          style={{ fontSize: "clamp(20px,3vw,48px)" }}
        >
          <span className="font-bold">no worries for the day of</span>
          <span className="inline-block" style={{ width: "clamp(40px,8vw,120px)" }} />
          <span className="font-normal">moroww.</span>
        </p>
      </motion.div>
    </section>
  );
}
