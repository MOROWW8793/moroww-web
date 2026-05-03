"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative h-screen flex items-end overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1800&q=80')",
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/50" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 pb-20 md:px-16 md:pb-28">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-white font-bold text-[clamp(3rem,6vw,5rem)] leading-[1.05] tracking-[-0.02em] mb-6"
          >
            Geen gok.<br />Een garantie.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-white/90 text-lg md:text-xl font-normal leading-relaxed mb-10 max-w-[560px]"
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
              Bekijk de collectie
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
