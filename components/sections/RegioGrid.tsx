"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const collecties = [
  {
    naam: "the shore",
    sub: "2 woningen · Kust",
    href: "/collectie?collectie=the-shore",
    gradient: "linear-gradient(135deg, #FEA05E 0%, #E8894A 100%)",
  },
  {
    naam: "the fields",
    sub: "2 woningen · Ardennen & Vlaamse Ardennen",
    href: "/collectie?collectie=the-fields",
    gradient: "linear-gradient(135deg, #C8956B 0%, #A0714F 100%)",
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {collecties.map((c, i) => (
          <motion.div
            key={c.naam}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.08 }}
          >
            <Link
              href={c.href}
              className="relative flex flex-col justify-end rounded-3xl overflow-hidden p-8 transition-transform duration-300 hover:scale-[1.02] block"
              style={{ background: c.gradient, height: 380 }}
            >
              <div className="absolute inset-0 bg-black/10 rounded-3xl" />
              <div className="relative z-10">
                <p className="text-white font-semibold lowercase leading-[1.0] tracking-[-0.02em] mb-1" style={{ fontSize: "clamp(1.75rem,3vw,2.5rem)" }}>
                  {c.naam}
                </p>
                <p className="text-white/75 text-sm font-normal">{c.sub}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
