export const metadata = {
  title: "Contact — moroww",
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
        <a
          href="mailto:info@moroww.com"
          className="inline-flex items-center rounded-full bg-moroww-orange hover:bg-moroww-orange-dark text-white font-semibold px-8 py-4 text-base transition-colors duration-200"
        >
          info@moroww.com
        </a>
        <p className="mt-10 text-sm text-moroww-black/40">
          We beantwoorden elke vraag. Geen chatbot, geen wachtrij.
        </p>
      </div>
    </div>
  );
}
