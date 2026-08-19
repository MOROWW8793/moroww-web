import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CollectieStatisch } from "./CollectieStatisch";
import { Register } from "@/components/Register";

export const metadata: Metadata = {
  title: 'De Collectie — gekeurde vakantiewoningen in België',
  description:
    'De moroww-collectie: gecertificeerde vakantiewoningen in België. Elk pand fysiek geïnspecteerd voor opname.',
  alternates: { canonical: 'https://www.moroww.com/collectie' },
};

export default async function CollectiePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('collectie')
  return (
    <Register kant="gast">
      <div className="min-h-screen">
        <div className="px-6 md:px-16 lg:px-24 pt-32 pb-12 max-w-4xl mx-auto text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-moroww-label mb-6">
            {t('label')}
          </p>
          <h1
            className="font-bold lowercase text-moroww-black leading-[1.05] tracking-[-0.02em] mb-4"
            style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)" }}
          >
            {t('title')}
          </h1>
          <p className="text-moroww-black/55 text-lg">
            {t('subtitle')}
          </p>
        </div>
        <CollectieStatisch />
      </div>
    </Register>
  );
}
