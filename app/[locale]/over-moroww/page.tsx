import type { Metadata } from "next";
import { OverMorowwContent } from "./OverMorowwContent";

export const metadata: Metadata = {
  title: 'Over moroww — het kwaliteitslabel voor vakantiewoningen',
  description:
    'moroww is geen platform en geen co-host. Een gecertificeerd kwaliteitslabel voor premium vakantiewoningen in België. Lees ons verhaal.',
  alternates: { canonical: 'https://www.moroww.com/over-moroww' },
};

export default function OverMorowwPage() {
  return <OverMorowwContent />;
}
