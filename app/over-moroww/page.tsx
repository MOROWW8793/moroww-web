import Image from "next/image";

export const metadata = {
  title: "Over moroww — Ons verhaal",
  description: "Twee ondernemers die de vakantie-loterij beu waren. Zo ontstond moroww.",
};

const pillars = [
  {
    title: "Wij zeggen nee",
    body: "De meeste huizen komen niet in aanmerking. Niet omdat we moeilijk willen doen, maar omdat elk ja een belofte is.",
  },
  {
    title: "Wij denken vooruit",
    body: "Elk detail is geregeld vóór jij aankomt. Sleutel, sfeer, beddengoed. Wij denken, jij ontspant.",
  },
  {
    title: "Wij blijven onzichtbaar",
    body: "Echte luxe is privacy. Geen receptie, geen chaperonnes. Wij zijn er als het nodig is, nooit als het niet hoeft.",
  },
];

export default function OverMorowwPage() {
  return (
    <div className="bg-moroww-blush min-h-screen">
      {/* Hero */}
      <div className="relative h-[60vh] bg-moroww-black overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=80"
          alt="moroww"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 flex items-end px-6 pb-16 md:px-16">
          <h1 className="font-bold text-white text-4xl md:text-6xl max-w-xl leading-tight">
            Sommige huizen<br />voelen gewoon juist aan.
          </h1>
        </div>
      </div>

      {/* Story */}
      <div className="mx-auto max-w-3xl px-6 py-20">
        <div className="prose prose-lg max-w-none text-moroww-black/70 leading-relaxed space-y-6">
          <p className="text-xl text-moroww-black font-medium leading-relaxed">
            Je kent het wel. Sommige huizen voelen gewoon juist aan zodra je binnenstap.
            De lucht, het licht, de sfeer... Alles klopt gewoon. Dat gevoel — dat is wat
            we met moroww willen vastleggen.
          </p>
          <p>
            Wij zijn Brent en Noam. Twee ondernemers die merkten hoe vaak een vakantie
            nog een gok is. Een foto die mooier is dan de werkelijkheid. Een sleutel die
            ergens achtergelaten wordt. Een huis dat veelbelovend klinkt maar teleurstelt.
          </p>
          <p>
            moroww is ons antwoord daarop. Geen platform. Geen marktplaats. Een label.
            We selecteren streng, inspecteren persoonlijk, en beheren met de zorgvuldigheid
            van een eigenaar — omdat we weten wat er op het spel staat. Jouw vrije tijd.
          </p>
        </div>
      </div>

      {/* Mission block */}
      <div className="bg-moroww-black py-24 px-6 text-center">
        <blockquote className="font-bold italic text-white text-3xl md:text-5xl max-w-2xl mx-auto leading-tight mb-6">
          &ldquo;A stay that works,<br className="hidden md:block" /> so you don&apos;t have to.&rdquo;
        </blockquote>
        <p className="text-white/40 text-base">No worries for the day of moroww.</p>
      </div>

      {/* Pillars */}
      <div className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="font-bold text-moroww-black text-3xl md:text-4xl text-center mb-14">Hoe we werken</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map(({ title, body }) => (
            <div key={title} className="bg-white rounded-2xl p-8">
              <h3 className="font-semibold text-moroww-black text-lg mb-3">{title}</h3>
              <p className="text-sm text-moroww-black/55 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
