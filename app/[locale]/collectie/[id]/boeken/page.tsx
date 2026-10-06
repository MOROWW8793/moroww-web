import { notFound } from "next/navigation";
import { Register } from "@/components/Register";
import { lw, type Locale } from "@/lib/woningen";
import { boekbareWoning, isIsoDatum } from "@/lib/boeking";
import { Checkout } from "./Checkout";

interface Props {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{ aankomst?: string; vertrek?: string; gasten?: string }>;
}

export const metadata = { robots: { index: false, follow: false } };

export default async function BoekenPage({ params, searchParams }: Props) {
  const { id, locale } = await params;
  const q = await searchParams;
  const woning = boekbareWoning(id);
  if (!woning) notFound();

  const gasten = Number(q.gasten);
  if (
    !isIsoDatum(q.aankomst) ||
    !isIsoDatum(q.vertrek) ||
    q.aankomst >= q.vertrek ||
    !Number.isInteger(gasten) ||
    gasten < 1 ||
    gasten > woning.maxGasten
  ) {
    notFound();
  }

  const review = woning.reviews?.[0];

  return (
    <Register kant="gast">
      <Checkout
        woning={{
          id: woning.id,
          naam: woning.naam,
          locatie: woning.locatie,
          heroFoto: woning.heroFoto,
          inCheckin: woning.inCheckin,
          uitCheckin: woning.uitCheckin,
          review: review ? { citaat: lw(review.citaat, locale as Locale), naam: review.naam } : null,
        }}
        aankomst={q.aankomst}
        vertrek={q.vertrek}
        gasten={gasten}
      />
    </Register>
  );
}
