import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met moroww. Vragen over boekingen, eigenaarschap of samenwerking.",
  alternates: { canonical: "https://www.moroww.com/contact" },
};

export default function ContactPage() {
  return (
    <div className="bg-moroww-blush min-h-screen flex items-center">
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-moroww-orange mb-4">Contact</p>
        <h1 className="font-bold text-moroww-black text-4xl md:text-5xl mb-6 leading-tight">
          Liever een echt gesprek?
        </h1>
        <p className="text-moroww-black/60 text-lg mb-10 leading-relaxed">
          Wij ook.
        </p>

        <div className="flex flex-col gap-4 items-center">
          <a
            href="mailto:info@moroww.com"
            className="inline-flex items-center justify-center w-full max-w-xs rounded-full border-2 border-moroww-black text-moroww-black font-semibold px-8 py-4 text-base hover:bg-moroww-black hover:text-white transition-colors duration-200"
          >
            info@moroww.com
          </a>

          <a
            href="https://www.instagram.com/moroww.com_/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full max-w-xs rounded-full border-2 border-moroww-black text-moroww-black font-semibold px-8 py-4 text-base hover:bg-moroww-black hover:text-white transition-colors duration-200"
          >
            Instagram
          </a>

          <a
            href="https://calendar.app.google/BH8wYeA9AGf6KrUz7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full max-w-xs rounded-full bg-moroww-orange hover:bg-moroww-orange-dark text-white font-semibold px-8 py-4 text-base transition-colors duration-200"
          >
            Plan een gesprek in
          </a>
        </div>

        <p className="mt-10 text-sm text-moroww-black/40">
          We beantwoorden elke vraag. Geen chatbot, geen wachtrij.
        </p>
      </div>
    </div>
  );
}
