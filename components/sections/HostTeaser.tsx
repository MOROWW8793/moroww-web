"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function HostTeaser() {
  return (
    <section className="bg-white w-full overflow-hidden">
      <div className="flex flex-col md:flex-row min-h-[600px]">
        {/* Foto — boven op mobiel, rechts op desktop */}
        <div className="relative h-[300px] md:h-auto md:w-1/2 min-h-[400px] order-first md:order-last">
          <Image
            src="/images/host-teaser.jpg"
            alt="moroww eigenaar"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectPosition: "center 70%" }}
          />
        </div>

        {/* Tekst — links op desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex items-center px-6 py-16 md:px-16 lg:px-24 md:w-1/2"
        >
          <div className="max-w-md w-full">
            <p className="text-xs font-normal uppercase tracking-widest text-moroww-orange mb-4">
              voor eigenaars
            </p>
            <h2
              className="font-bold lowercase text-moroww-black leading-[1.05] tracking-[-0.02em] mb-6"
              style={{ fontSize: "clamp(2.25rem,4vw,3.5rem)" }}
            >
              jij opent de deur.<br />wij doen de rest.
            </h2>
            <p className="text-moroww-black/60 leading-relaxed mb-10" style={{ fontSize: 17 }}>
              Geen telefoontjes, geen gedoe, geen verkeerde gasten.
              Slimme technologie bewaakt. Ons protocol garandeert.
              Jij houdt de controle.
            </p>
            <Link
              href="/eigenaar-worden"
              className="inline-flex items-center rounded-full bg-moroww-orange hover:bg-moroww-orange-dark text-white font-semibold px-8 py-4 text-base transition-colors duration-200"
            >
              Word Founding Partner
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
