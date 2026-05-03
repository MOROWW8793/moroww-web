import Image from "next/image";

export const metadata = {
  title: "Over moroww — Ons verhaal",
  description: "Twee ondernemers die de vakantieloterij beu waren. Zo ontstond moroww.",
};

const pillars = [
  {
    title: "Wij zeggen nee.",
    body: "Elk pand wordt fysiek geverifieerd. Minimum 100 m², eigen parkeerplaats, rustige omgeving, lichtinval die klopt. Wie de standaard niet haalt, komt niet in de collectie.",
  },
  {
    title: "Wij denken vooruit.",
    body: "Voor jij de deur opendoet, staat de sfeer al klaar. Temperatuur, verlichting, geur, muziek — allemaal geregeld. De eerste seconde is de belofte die we waarmaken.",
  },
  {
    title: "Wij blijven onzichtbaar.",
    body: "Geen receptie. Geen welkomstgesprek. Geen gedoe. Tijdens het verblijf waken we op de achtergrond — voor jou is dat precies hoe luxe aanvoelt: de afwezigheid van alles wat je zou kunnen storen.",
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
        <div className="space-y-6 text-moroww-black/70 leading-relaxed">
          <p className="text-xl text-moroww-black font-medium leading-relaxed">
            Je kent het wel. Sommige huizen voelen gewoon juist aan zodra je binnenstap.
            De lucht, het licht, de sfeer — alles klopt gewoon. Dat gevoel, dat is wat
            we met moroww willen vastleggen.
          </p>
          <p>
            Wij zijn Brent en Noam. Twee ondernemers die merkten hoe vaak een vakantie
            nog een gok is. Dan boek je iets dat er op foto geweldig uitziet, maar zodra
            je de deur opendoet, denk je: &lsquo;Oei, was dit het nu?&rsquo;
          </p>
          <p>
            Daarom doen wij het anders. We vinden vakantiewoningen die ademen en slim in
            elkaar zitten. Waar aan elk klein dingetje is gedacht, zodat jij bij aankomst
            niets meer hoeft uit te zoeken. We letten op die details die je niet ziet,
            maar wel voelt. Van hoe het huis ruikt tot hoe het ochtendlicht binnenvalt.
          </p>
          <p>
            Maar we zijn er evengoed voor wie de deuren van zijn woning opent. Voor de
            host die wil dat zijn eigendom met dezelfde zorg behandeld wordt als waarmee
            het gebouwd is.
          </p>
        </div>
      </div>

      {/* Mission block */}
      <div className="bg-moroww-black py-24 px-6 text-center">
        <h2 className="font-bold italic text-white text-3xl md:text-5xl max-w-2xl mx-auto leading-tight mb-6">
          A stay that works, so you don&apos;t have to.
        </h2>
        <p className="text-white/55 text-base max-w-xl mx-auto leading-relaxed mb-4">
          moroww levert gemoedsrust die je echt verdient. Stille technologie en bewust
          design maken van kwaliteitswoningen moeiteloze escapes.
        </p>
        <p className="text-white/30 text-sm">No worries for the day of moroww.</p>
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

      {/* Regions */}
      <div className="bg-white py-20 px-6 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="font-bold text-moroww-black text-2xl md:text-3xl mb-5">Waar je ons vindt.</h2>
          <p className="text-moroww-black/60 text-base leading-relaxed">
            moroww opereert vandaag in drie Belgische clusters: de Kust, de Vlaamse
            Ardennen en de Ardennen. Elke regio heeft een eigen karakter — en een eigen
            signatuurgeur.
          </p>
        </div>
      </div>
    </div>
  );
}
