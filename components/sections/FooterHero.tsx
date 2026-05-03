"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function FooterHero() {
  return (
    <section className="flex flex-col md:flex-row h-[50vh] md:h-[60vh]">
      {/* Left: photo */}
      <div className="relative w-full md:w-1/2 h-[30vh] md:h-full">
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
          className="absolute bottom-8 md:bottom-12 left-8 md:left-12"
        >
          <p
            className="text-white font-bold lowercase leading-[1.0] tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.75rem,4vw,4.5rem)" }}
          >
            no worries
          </p>
        </motion.div>
      </div>

      {/* Right: dark */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="w-full md:w-1/2 bg-[#1A1A1A] flex items-end px-8 md:px-12 pb-8 md:pb-12 h-[20vh] md:h-full"
      >
        <p
          className="text-white font-bold lowercase leading-[1.0] tracking-[-0.02em]"
          style={{ fontSize: "clamp(1.75rem,4vw,4.5rem)" }}
        >
          for the day of moroww.
        </p>
      </motion.div>
    </section>
  );
}
