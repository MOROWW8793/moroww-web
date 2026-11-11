import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { MotionIn } from '@/components/MotionIn';
import { SmoothScroll } from '@/components/SmoothScroll';
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
  title: { default: 'moroww hub · voor wie huizen verhuurt of beheert', template: '%s · moroww hub' },
  description: 'moroww hub is de plek voor eigenaars, beheerders en hotels met het moroww-label: je vraagt wat je huis nodig heeft, moroww regelt het met een vakman in de buurt. Met merken, events en de academy.',
};

export default function HubLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl-BE">
      <body>
        {/* mw-js vóór render zodat data-mw-reveal zijn hidden state kan
            aannemen zonder flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('mw-js')",
          }}
        />
        <div className="merk merk-hub">{children}</div>
        <SmoothScroll />
        <MotionIn />
        <Analytics />
      </body>
    </html>
  );
}
