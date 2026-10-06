import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Register } from "@/components/Register";
import { boekbareWoning, isIsoDatum } from "@/lib/boeking";
import { Checkout } from "./Checkout";

interface Props {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{ aankomst?: string; vertrek?: string; gasten?: string }>;
}

export const metadata = { robots: { index: false, follow: false } };

export default async function BoekenPage({ params, searchParams }: Props) {
  const { id } = await params;
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

  const t = await getTranslations("booking");

  return (
    <Register kant="gast">
      <div className="mx-auto max-w-2xl px-mw-4 pt-32 pb-mw-10">
        <p className="text-audit uppercase text-moroww-label">{t("checkout_kicker")}</p>
        <h1 className="mt-mw-3 text-h2 text-moroww-dark">{woning.naam}</h1>
        <Checkout
          woningId={woning.id}
          aankomst={q.aankomst}
          vertrek={q.vertrek}
          gasten={gasten}
        />
      </div>
    </Register>
  );
}
