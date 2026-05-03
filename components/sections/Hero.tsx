"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative -mt-16 w-full overflow-hidden" style={{ height: "100dvh" }}>
      <Image
        src="/images/hero.jpg"
        alt="moroww vakantiewoning — premium verblijf in België"
        fill
        priority
        className="object-cover"
        sizes="100vw"
        style={{ objectPosition: "center center" }}
      />

      {/* Overlay — stronger on mobile */}
      <div className="absolute inset-0 bg-black/50 md:bg-black/38" />

      <div className="absolute inset-0 flex items-center justify-center px-6 md:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-white font-bold lowercase leading-[1.15] md:leading-[1.1] tracking-[-0.02em] text-center w-full"
          style={{ fontSize: "clamp(32px,5vw,72px)" }}
        >
          a new standard for
          <span className="inline-block w-6 md:w-40 lg:w-48" />
          <span className="font-normal">short term rentals.</span>
        </motion.h1>
      </div>
    </section>
  );
}
