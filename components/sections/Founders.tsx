"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function Founders() {
  return (
    <section className="bg-moroww-blush py-24 px-6 md:px-16 lg:px-24 w-full overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">

        {/* Foto — boven op mobiel, links op desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative w-full md:w-[45%] shrink-0 h-[300px] md:h-[500px] rounded-3xl overflow-hidden"
        >
          <Image
            src="/images/founders.jpg"
            alt="Brent & Noam — moroww founders"
            fill
            className="object-cover"
            style={{ objectPosition: "center center" }}
            sizes="(max-width: 768px) 100vw, 45vw"
          />
        </motion.div>

        {/* Tekst — rechts op desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          className="flex-1 flex flex-col justify-center"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-moroww-black mb-4">
            De oprichters
          </p>
          <h2
            className="font-bold lowercase text-moroww-black leading-[1.05] tracking-[-0.02em] mb-6"
            style={{ fontSize: "clamp(2rem,4vw,3.5rem)" }}
          >
            brent & noam.
          </h2>
          <p className="text-moroww-black/60 leading-relaxed mb-10" style={{ fontSize: 17 }}>
            Twee ondernemers. Één standaard.
            <br />
            moroww is gebouwd omdat de markt het verdiende.
          </p>
          <Link
            href="/over-moroww"
            className="inline-flex items-center rounded-full border-2 border-moroww-black text-moroww-black font-semibold px-8 py-4 text-base hover:bg-moroww-black hover:text-white transition-colors duration-200 self-start"
          >
            Ons verhaal
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
