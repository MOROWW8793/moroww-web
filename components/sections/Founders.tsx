"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function Founders() {
  return (
    <section className="w-full flex flex-col md:flex-row items-center py-16 md:py-24 px-6 md:px-16 bg-moroww-blush overflow-hidden">

      {/* Foto links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" as const }}
        className="w-full md:w-1/2 flex justify-center"
      >
        {/* Mobiel: founders.jpg fullwidth */}
        <div className="relative w-full h-[350px] rounded-2xl overflow-hidden md:hidden">
          <Image
            src="/images/founders.jpg"
            alt="Brent en Noam, oprichters van moroww"
            fill
            className="object-cover"
            style={{ objectPosition: "center top" }}
            sizes="100vw"
          />
        </div>

        {/* Desktop: twee ovale foto's overlappend */}
        <div className="hidden md:block relative" style={{ width: 320, height: 380 }}>
          <div
            className="absolute shadow-lg overflow-hidden"
            style={{ width: 180, height: 240, borderRadius: "50%", top: 0, left: 0 }}
          >
            <Image
              src="/images/noam.jpg"
              alt="Noam, medeoprichter van moroww"
              fill
              className="object-cover"
              sizes="180px"
            />
          </div>
          <div
            className="absolute shadow-lg overflow-hidden"
            style={{ width: 180, height: 240, borderRadius: "50%", top: 110, left: 120 }}
          >
            <Image
              src="/images/brent.jpg"
              alt="Brent, medeoprichter van moroww"
              fill
              className="object-cover"
              sizes="180px"
            />
          </div>
        </div>
      </motion.div>

      {/* Tekst rechts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" as const, delay: 0.1 }}
        className="w-full md:w-1/2 pl-0 md:pl-16 pt-10 md:pt-0"
      >
        <p className="text-xs font-medium uppercase tracking-widest text-[#C08D6E] mb-4">
          De oprichters
        </p>
        <h2
          className="font-bold lowercase text-moroww-black leading-[1.05] tracking-[-0.02em] mb-6"
          style={{ fontSize: "clamp(28px,4vw,3.5rem)" }}
        >
          Brent & Noam.
        </h2>
        <p className="text-moroww-black/60 leading-relaxed mb-10 max-w-lg" style={{ fontSize: 17 }}>
          Wij zijn Brent en Noam. Twee ondernemers die te vaak
          teleurgesteld thuiskwamen van een vakantie die er op foto
          perfect uitzag maar ter plaatse tegenviel. moroww is ons
          antwoord - een label dat curateert, een systeem dat levert,
          en een standaard die we nooit loslaten.
        </p>
        <Link
          href="/over-moroww"
          className="inline-flex items-center rounded-full border-2 border-moroww-black text-moroww-black font-semibold px-8 py-4 text-base hover:bg-moroww-black hover:text-white transition-colors duration-200"
        >
          Ons verhaal
        </Link>
      </motion.div>

    </section>
  );
}
