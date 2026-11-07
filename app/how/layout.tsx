import type { Metadata } from 'next';
import { Header, Footer } from '@/components/merk/Shell';
import { MerkTeken } from '@/components/merk/Logo';
import { Analytics } from '@vercel/analytics/next';
import '@fontsource/fraunces/300.css';
import '@fontsource/fraunces/300-italic.css';
import '@fontsource/fraunces/400.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/inter-tight/300.css';
import '@fontsource/inter-tight/400.css';
import '@fontsource/inter-tight/500.css';
import '@fontsource/inter-tight/600.css';
import '@/components/merk/merk.css';


export const metadata: Metadata = {
  title: { default: 'moroww how · weet wat mag. voor je verhuurt.', template: '%s · moroww how' },
  description: 'moroww how zoekt per adres uit of kortverhuur toegelaten is, wat er ontbreekt en wat eerst moet. Scan, traject, een eigen boekingswebsite en how partner voor property managers.',
};

export default function HowLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl-BE">
      <body>
    <div className="merk merk-how">
      <Header
        donker
        home="/how"
        merk={<MerkTeken merk="how" op="donker" size={22} />}
        nav={[
          { href: '/how/scan', label: 'scan' },
          { href: '/how/traject', label: 'traject' },
          { href: '/how/website', label: 'website' },
          { href: '/how/property-managers', label: 'voor property managers' },
        ]}
        cta={{ href: '/how/contact', label: 'plan een scan' }}
      />
      <main>{children}</main>
      <Footer donker merk={<span>weet wat mag. voor je verhuurt.</span>} />
    </div>
        <Analytics />
      </body>
    </html>
  );
}
