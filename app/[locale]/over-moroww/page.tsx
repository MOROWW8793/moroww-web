import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { OverMorowwContent } from "./OverMorowwContent";

export const metadata: Metadata = {
  title: 'Over moroww — het kwaliteitslabel voor vakantiewoningen',
  description:
    'moroww is geen platform en geen co-host. Een gecertificeerd kwaliteitslabel voor premium vakantiewoningen in België. Lees ons verhaal.',
  alternates: { canonical: 'https://www.moroww.com/over-moroww' },
};

export default async function OverMorowwPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return <OverMorowwContent locale={locale} />;
}
