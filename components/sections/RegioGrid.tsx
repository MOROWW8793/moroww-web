"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const regios = [
  {
    naam: "Kust",
    woningen: "3 woningen",
    href: "/collectie?regio=kust",
    gradient: "linear-gradient(145deg, #F4C87A 0%, #FEA05E 50%, #E8894A 100%)",
  },
  {
    naam: "Ardennen",
    woningen: "4 woningen",
    href: "/collectie?regio=ardennen",
    gradient: "linear-gradient(145deg, #3D7A5C 0%, #2D6A4F 50%, #1E4D38 100%)",
  },
  {
    naam: "Vlaamse Ardennen",
    woningen: "2 woningen",
    href: "/collectie?regio=vlaamse-ardennen",
    gradient: "linear-gradient(145deg, #C4956A 0%, #9B6B45 50%, #7A5035 100%)",
  },
];

export function RegioGrid() {
  return (
    <section className="bg-white py-24 px-6 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-12"
      >
        <h2
          className="font-bold lowercase leading-[1.05] tracking-[-0.02em]"
          style={{ fontSize: "clamp(2rem,4vw,4rem)" }}
        >
          <span className="text-moroww-black">ontdek onze </span>
          <span className="text-moroww-orange">collecties</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {regios.map((r, i) => (
          <motion.div
            key={r.naam}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.08 }}
          >
            <Link
              href={r.href}
              className="relative flex flex-col justify-end h-[240px] md:h-[320px] rounded-3xl overflow-hidden p-8 transition-transform duration-300 hover:scale-[1.02] block"
              style={{ background: r.gradient }}
            >
              <div className="absolute inset-0 bg-black/15 rounded-3xl" />
              <div className="relative z-10">
                <p className="text-white font-semibold text-2xl md:text-3xl mb-1">
                  {r.naam}
                </p>
                <p className="text-white/70 text-sm font-normal">{r.woningen}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
