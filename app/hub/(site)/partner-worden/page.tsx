import type { Metadata } from 'next';
import { ContactForm } from '@/components/merk/ContactForm';
import { ZHeld, ZSectie, ZSectieTwee, ZRaster, ZTijdlijn } from '@/components/merk/Zwitsers';
import { hoeWeKiezen, partnerCategorieen } from '@/lib/merk/hub';

export const metadata: Metadata = { alternates: { canonical: '/hub/partner-worden' }, title: 'partner worden', description: 'Een merk, een vakman of een tool die past bij moroww? Word partner van moroww hub.' };

const stappen = [
  { titel: 'kennismaking', tekst: 'We bekijken of je aanbod past bij het label, en testen het in de huizen van de collectie.' },
  { titel: 'voordeel voor leden', tekst: 'Een korting of extra voor eigenaars met het label.' },
  { titel: 'in de hub', tekst: 'Een partnerprofiel voor de leden, en de badge voor je eigen site.' },
  { titel: 'aan het werk', tekst: 'Een merk komt in de huizen van de leden. Een vakman krijgt opdrachten via moroww.' },
];

const soorten = [
  {
    titel: 'merken',
    tekst: 'Product placement in de huizen van de collectie: gasten gebruiken je product tijdens hun verblijf. Eigenaars die je product plaatsen, krijgen korting bij jou, zo kom je in meer huizen. moroww plaatst het.',
  },
  {
    titel: 'vakmensen',
    tekst: 'Vraagt een eigenaar iets in jouw regio, dan belt moroww je met het huis, het moment en wat er moet gebeuren. Jij doet het werk, wij houden de eigenaar op de hoogte.',
  },
  {
    titel: 'tools',
    tekst: 'Software voor wie zelf verhuurt: kalender, prijzen, gastberichten. Met een voordeel voor leden.',
  },
];

export default function PartnerWorden() {
  return (
    <div className="wrap">
      <ZHeld
        nr="01 · partner worden"
        titel={<>weinig partners,<br />bewust gekozen.</>}
        fotos={[
          { src: '/images/partners/moro-essentials-sfeer.jpg', alt: 'Producten van MORO Essentials' },
          { src: '/images/partners/nuki-smart-lock.jpg', alt: 'Een Nuki smart lock aan de deur' },
          { src: '/images/hub/tools-laptop.jpg', alt: 'Laptop op tafel in een moroww-huis' },
        ]}
        lead="Een merk, een vakman of een tool die past bij wat gasten in een moroww-huis voelen? Vertel ons wat je doet, in welke regio, en welk voordeel je leden geeft."
        acties={<a href="#aanmelden" className="z-knop">vertel ons wat je doet</a>}
      />

      <ZSectie nr="02 · drie soorten partners" titel="wat je bij ons doet.">
        <ZRaster items={soorten} prefix="2" />
      </ZSectie>

      <ZSectie nr="03 · hoe we kiezen" titel="vier vragen, voor elke partner.">
        <ZRaster prefix="3" items={hoeWeKiezen.map(([titel, tekst]) => ({ titel, tekst }))} />
      </ZSectie>

      <ZSectie nr="04 · zo gaat het" titel="van kennismaking tot in de huizen.">
        <ZTijdlijn items={stappen} prefix="4" />
      </ZSectie>

      <ZSectieTwee id="aanmelden" nr="05 · aanmelden" titel="vertel ons wat je doet.">
        <ContactForm
          merk="hub"
          soort="partner"
          velden={[
            { naam: 'naam', label: 'naam', verplicht: true },
            { naam: 'bedrijf', label: 'bedrijf', verplicht: true },
            { naam: 'email', label: 'e-mail', type: 'email', verplicht: true },
            { naam: 'categorie', label: 'categorie', type: 'select', opties: [...partnerCategorieen.map((c) => c.label), 'andere'] },
            { naam: 'regio', label: 'regio' },
            { naam: 'bericht', label: 'wat doe je, en welk voordeel geef je leden', type: 'textarea', verplicht: true },
          ]}
        />
      </ZSectieTwee>
    </div>
  );
}
