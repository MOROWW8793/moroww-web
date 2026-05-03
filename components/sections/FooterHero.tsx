"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function FooterHero() {
  return (
    <section className="w-full flex flex-col md:flex-row" style={{ height: "60vh" }}>
      {/* Linkerhelft: foto */}
      <div className="relative w-full md:w-1/2 h-[30vh] md:h-full overflow-hidden">
        <Image
          src="/images/exterieur-1.jpg"
          alt="moroww"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
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

      {/* Rechterhelft: donker */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="w-full md:w-1/2 h-[30vh] md:h-full bg-[#1A1A1A] flex items-center"
      >
        <p
          className="text-white font-bold lowercase leading-[1.0] tracking-[-0.02em] pl-8 md:pl-12 max-w-sm"
          style={{ fontSize: "clamp(32px,4vw,64px)" }}
        >
          for the day of moroww.
        </p>
      </motion.div>
    </section>
  );
}
