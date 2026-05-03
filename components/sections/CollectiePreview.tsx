"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const cards = [
  { src: "/images/collectie-1.jpg", regio: "Kust",              naam: "Woning 01" },
  { src: "/images/collectie-2.jpg", regio: "Kust",              naam: "Woning 02" },
  { src: "/images/collectie-3.jpg", regio: "Ardennen",          naam: "Woning 03" },
  { src: "/images/collectie-4.jpg", regio: "Vlaamse Ardennen",  naam: "Woning 04" },
];

export function CollectiePreview() {
  return (
    <section className="bg-moroww-blush py-24 px-6 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-12"
      >
        <h2
          className="font-bold lowercase text-moroww-black leading-[1.0] tracking-[-0.02em] mb-2"
          style={{ fontSize: "clamp(2.5rem,5vw,5rem)" }}
        >
          collectie
        </h2>
        <p className="text-moroww-black/50 text-base font-normal">
          Een gesloten collectie. Elk pand fysiek geselecteerd.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.naam}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.08 }}
            className="flex flex-col gap-3"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src={card.src}
                alt={card.naam}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <p className="text-xs font-normal uppercase tracking-widest text-moroww-orange">
              {card.regio}
            </p>
            <p className="font-semibold text-moroww-black text-base">{card.naam}</p>
            <Link
              href="/collectie"
              className="text-sm text-moroww-black/50 hover:text-moroww-black transition-colors underline-offset-2 hover:underline"
            >
              Lees meer
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
