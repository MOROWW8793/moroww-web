"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function Founders() {
  return (
    <section className="bg-moroww-blush py-24 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
        {/* Oval photos — overlapping */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative shrink-0 mx-auto md:mx-0"
          style={{ width: 320, height: 380 }}
        >
          {/* Noam — higher, left */}
          <div
            className="absolute shadow-lg overflow-hidden"
            style={{
              width: 180,
              height: 240,
              borderRadius: "50%",
              top: 0,
              left: 0,
            }}
          >
            <Image
              src="/images/noam.jpg"
              alt="Noam"
              fill
              className="object-cover"
              sizes="180px"
            />
          </div>
          {/* Brent — lower, right */}
          <div
            className="absolute shadow-lg overflow-hidden"
            style={{
              width: 180,
              height: 240,
              borderRadius: "50%",
              top: 110,
              left: 120,
            }}
          >
            <Image
              src="/images/brent.jpg"
              alt="Brent"
              fill
              className="object-cover"
              sizes="180px"
            />
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          className="flex-1"
        >
          <p className="text-xs font-normal uppercase tracking-widest text-moroww-orange mb-4">
            De oprichters
          </p>
          <h2
            className="font-bold lowercase text-moroww-black leading-[1.05] tracking-[-0.02em] mb-6"
            style={{ fontSize: "clamp(2rem,4vw,3.5rem)" }}
          >
            meet the founders
          </h2>
          <p className="text-moroww-black/60 leading-relaxed mb-10 max-w-lg" style={{ fontSize: 17 }}>
            Wij zijn Brent en Noam. Twee ondernemers die merkten hoe vaak
            een vakantie nog een gok is. moroww is ons antwoord daarop —
            een label dat curateert, een systeem dat levert, en een belofte
            die we fysiek nakomen in elk pand.
          </p>
          <Link
            href="/over-moroww"
            className="inline-flex items-center rounded-full border-2 border-moroww-black text-moroww-black font-semibold px-8 py-4 text-base hover:bg-moroww-black hover:text-white transition-colors duration-200"
          >
            Ons verhaal
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
