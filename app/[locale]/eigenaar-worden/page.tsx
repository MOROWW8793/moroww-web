import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { EigenaarContent } from "./EigenaarContent";
import { FaqJsonLd } from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: 'Eigenaar worden — meld uw woning aan bij moroww',
  description:
    'Heb je een vakantiewoning die de standaard haalt? moroww installeert de tech-stack, bewaakt de kwaliteit en regelt de boekingen. Meld je aan als eigenaar.',
  alternates: { canonical: 'https://www.moroww.com/eigenaar-worden' },
};

export default async function EigenaarWordenPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <>
      <EigenaarContent />
      <FaqJsonLd />
    </>
  );
}
