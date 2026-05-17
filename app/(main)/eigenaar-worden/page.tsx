import type { Metadata } from "next";
import { EigenaarContent } from "./EigenaarContent";

export const metadata: Metadata = {
  title: 'Eigenaar worden — meld uw woning aan bij moroww',
  description:
    'Heeft u een vakantiewoning die de standaard haalt? moroww installeert de tech-stack, bewaakt de kwaliteit en regelt de boekingen. Meld u aan als Founding Partner.',
  alternates: { canonical: 'https://www.moroww.com/eigenaar-worden' },
};

export default function EigenaarWordenPage() {
  return <EigenaarContent />;
}
