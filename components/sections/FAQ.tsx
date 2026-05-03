"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const faqs = [
  {
    v: "Hoe selecteert moroww een woning?",
    a: "Elk pand wordt fysiek bezocht door ons team. We toetsen aan niet-onderhandelbare criteria: minimum 100m², eigen parkeerplaats, rustige omgeving, lichtinval en sfeer. Wie niet door de audit komt, komt niet in de collectie.",
  },
  {
    v: "Wat kost het als gast?",
    a: "Je betaalt een nachtprijs inclusief alle moroww-standaarden. Geen verborgen kosten. De enige bijkomende kost is de verplichte schoonmaakfee, zichtbaar bij het boeken.",
  },
  {
    v: "Hoe werkt de sleutelloze aankomst?",
    a: "Je ontvangt voor aankomst een unieke digitale code. Geen sleutelafspraak, geen wachten. De sfeer staat al klaar — van temperatuur tot verlichting.",
  },
  {
    v: "Wat houdt het Founding Partner-programma in?",
    a: "De eerste 10 hosts krijgen een preferentieel commissietarief dat vergrendeld blijft voor de volledige eerste contractcyclus. Je stapt in op de beste voorwaarden die moroww ooit aanbiedt.",
  },
  {
    v: "In welke regio's is moroww actief?",
    a: "We opereren vandaag in drie Belgische clusters: de Kust, de Vlaamse Ardennen en de Ardennen. Uitbreiding naar Nederland en Noord-Frankrijk volgt in Fase 02.",
  },
];

function AccordionItem({
  v, a, open, onToggle,
}: {
  v: string; a: string; open: boolean; onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl overflow-hidden mb-3">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 bg-moroww-orange text-white font-semibold text-left text-base"
      >
        <span>{v}</span>
        <span className="ml-4 text-xl font-light shrink-0 leading-none">
          {open ? "−" : "+"}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 py-5 bg-moroww-orange/10 text-moroww-black/70 text-base leading-relaxed">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="md:w-[30%] shrink-0"
        >
          <h2
            className="font-bold lowercase text-moroww-black leading-[1.05] tracking-[-0.02em] mb-6"
            style={{ fontSize: "clamp(2rem,3.5vw,3rem)" }}
          >
            veelgestelde vragen
          </h2>
          <p className="text-moroww-black/50 text-base leading-relaxed">
            Staat jouw vraag er niet bij?{" "}
            <Link
              href="mailto:hello@moroww.com"
              className="text-moroww-orange hover:underline underline-offset-2"
            >
              Stuur ons een bericht.
            </Link>
          </p>
        </motion.div>

        {/* Right accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          className="flex-1"
        >
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              v={faq.v}
              a={faq.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
