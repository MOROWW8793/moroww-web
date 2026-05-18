import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CollectieStatisch } from "./CollectieStatisch";

export const metadata: Metadata = {
  title: 'De Collectie — vakantiewoningen kust & Meetjesland',
  description:
    'Ontdek de moroww-collectie: gecertificeerde vakantiewoningen in Knokke, Oostende, Ursel en Beernem. Elk pand fysiek geïnspecteerd.',
  alternates: { canonical: 'https://www.moroww.com/collectie' },
};

export default async function CollectiePage() {
  const t = await getTranslations('collectie')
  return (
    <div className="min-h-screen bg-moroww-blush">
      <div className="px-6 md:px-16 lg:px-24 pt-32 pb-12 max-w-4xl mx-auto text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-[#C08D6E] mb-6">
          {t('label')}
        </p>
        <h1
          className="font-bold lowercase text-moroww-black leading-[1.05] tracking-[-0.02em] mb-4"
          style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)" }}
        >
          {t('title')}
        </h1>
        <p className="text-moroww-black/55 text-lg mb-8">
          {t('subtitle')}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <span
            className="text-xs font-medium uppercase tracking-widest px-4 py-2 rounded-full"
            style={{ background: "#EEBC9D", color: "#1A1A1A" }}
          >
            the shore - Kust
          </span>
          <span
            className="text-xs font-medium uppercase tracking-widest px-4 py-2 rounded-full"
            style={{ background: "#CBD085", color: "#1A1A1A" }}
          >
            the fields - Meetjesland
          </span>
        </div>
      </div>
      <CollectieStatisch />
    </div>
  );
}
