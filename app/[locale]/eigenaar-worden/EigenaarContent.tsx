import Link from "next/link";
import { LeadForm } from "@/components/ui/LeadForm";
import { Statrij } from "@/components/sections/Statrij";
import { screeningsPubliek } from "@/lib/screenings";
import { TOTAL_STAYS_REVIEWED } from "@/lib/reviews";
import { Register } from "@/components/Register";
import { TekstBlok } from "@/components/sections/TekstBlok";

// WP M-versie NL. Kort, drie kolommen ("wat je krijgt"), compacte
// blokken voor kost en team, en een hero met twee CTA's.

function DefRij({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,14rem)_1fr] gap-mw-3 py-mw-4">
      <dt className="text-audit uppercase text-moroww-ink-2">{label}</dt>
      <dd className="text-body text-moroww-dark">{value}</dd>
    </div>
  )
}

export async function EigenaarContent() {
  const cijfers = await screeningsPubliek()
  const statItems = [
    cijfers?.aantal_dossier    ? { cijfer: String(cijfers.aantal_dossier),   label: 'dossiers bekeken' } : null,
    cijfers?.aantal_bezoek     ? { cijfer: String(cijfers.aantal_bezoek),    label: 'fysiek bezocht'   } : null,
    cijfers?.aantal_opgenomen  ? { cijfer: String(cijfers.aantal_opgenomen), label: 'opgenomen'        } : null,
    { cijfer: String(TOTAL_STAYS_REVIEWED), label: 'verblijven' },
  ].filter((x): x is { cijfer: string; label: string } => x !== null)

  return (
    <Register kant="eigenaar">
      {/* ── HERO — H1 + lead + twee CTA's ── */}
      <section className="w-full px-6 md:px-12 pt-28 pb-mw-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-audit uppercase text-moroww-label">voor eigenaars</p>
          <h1
            className="mt-mw-4 font-bold text-moroww-dark leading-[1.05] tracking-[-0.02em] max-w-[16ch]"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
          >
            je woning. onze standaard. één label.
          </h1>
          <p className="mt-mw-5 text-body-lg text-moroww-dark max-w-[62ch]">
            moroww is het kwaliteitslabel voor vakantiewoningen in België:
            elke moroww-woning is geauditeerd, uitgerust en opgevolgd.
          </p>
          <div className="mt-mw-6 flex flex-wrap gap-mw-3">
            <a
              href="#poortentoets"
              className="inline-flex items-center rounded-full px-mw-4 py-3 font-semibold bg-moroww-orange text-moroww-dark hover:bg-moroww-orange/85 transition-colors"
            >
              meld je woning aan
            </a>
            <a
              href="https://calendar.app.google/BH8wYeA9AGf6KrUz7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full px-mw-4 py-3 font-semibold border border-moroww-dark text-moroww-dark hover:bg-moroww-dark hover:text-white transition-colors"
            >
              plan een gesprek
            </a>
          </div>
        </div>
      </section>

      {/* ── STATRIJ — donkere cijferband ── */}
      {statItems.length > 1 && <Statrij items={statItems} />}

      <div className="mx-auto max-w-6xl px-6 md:px-12">

        {/* ── WAT JE KRIJGT ── drie kolommen */}
        <TekstBlok eyebrow="wat je krijgt">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-mw-6">
            <div>
              <p className="text-audit uppercase text-moroww-label">de standaard</p>
              <p className="mt-mw-2 text-body text-moroww-dark">
                We keuren je woning ter plaatse op vier poorten en volgen ze
                daarna op. Haalt ze de standaard niet meer, dan hoor je het
                van ons.
              </p>
            </div>
            <div>
              <p className="text-audit uppercase text-moroww-label">het systeem</p>
              <p className="mt-mw-2 text-body text-moroww-dark">
                Slim slot, licht en warmte die zich klaarzetten, een
                signatuurgeur, en sensoren voor geluid, water en rook. Je
                weet het voor er schade is.
              </p>
            </div>
            <div>
              <p className="text-audit uppercase text-moroww-label">de verhuur</p>
              <p className="mt-mw-2 text-body text-moroww-dark">
                Distributie via alle kanalen en book.moroww.com. Wij doen het
                gastcontact en sturen de schoonmaak aan. Jij volgt alles in
                je dashboard.
              </p>
            </div>
          </div>
        </TekstBlok>

        {/* ── HOE HET LOOPT ── */}
        <TekstBlok eyebrow="hoe het loopt">
          <dl className="divide-y divide-moroww-rule border-t border-b border-moroww-rule">
            <DefRij label="01 · aanmelden"              value="Binnen twee werkdagen nemen we contact op." />
            <DefRij label="02 · bezoek en installatie"  value="We keuren de woning ter plaatse en installeren het systeem." />
            <DefRij label="03 · live"                   value="Je woning draagt het label en staat in de collectie." />
          </dl>
        </TekstBlok>

        {/* ── WAT HET KOST ── compact */}
        <TekstBlok eyebrow="wat het kost">
          <p>
            <span className="font-semibold">Onboarding:</span> eenmalig,
            € 1.950.
          </p>
          <p>
            Je zit nergens aan vast. De hardware is na betaling van jou, je
            boekingen en gastgegevens ook. Stop je, dan stop je.
          </p>
        </TekstBlok>

        {/* ── MET WIE JE WERKT ── compact */}
        <TekstBlok eyebrow="met wie je werkt">
          <p>
            Met ons team, niet met een callcenter. Wij komen zelf kijken en
            blijven je aanspreekpunt.
          </p>
          <p className="text-audit uppercase">
            <a
              href="mailto:info@moroww.com"
              className="text-moroww-dark underline underline-offset-4 decoration-moroww-label hover:decoration-moroww-dark transition-colors"
            >
              info@moroww.com
            </a>
          </p>
        </TekstBlok>

        {/* ── FORMULIER ── */}
        <TekstBlok eyebrow="aanmelden" heading="meld je woning aan">
          <p>
            We nemen binnen twee werkdagen persoonlijk contact op. Elke
            woning wordt fysiek beoordeeld, ook als het antwoord uiteindelijk
            nee is.
          </p>
          <div id="poortentoets" className="mt-mw-4 max-w-[52ch]">
            <LeadForm />
          </div>
          <p className="mt-mw-5">
            <Link
              href="/kennis"
              className="text-audit uppercase text-moroww-dark underline underline-offset-4 decoration-moroww-label hover:decoration-moroww-dark transition-colors"
            >
              eerst alles zelf uitzoeken? lees de kennisbank →
            </Link>
          </p>
        </TekstBlok>

        {/* ── AFSLUITING — CTA-D gesprek ── */}
        <TekstBlok eyebrow="gesprek" heading="liever meteen iemand spreken?" headingLevel="h3">
          <p>
            Kies zelf een moment voor een digitaal gesprek van dertig minuten.
          </p>
          <p className="mt-mw-3">
            <a
              href="https://calendar.app.google/BH8wYeA9AGf6KrUz7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full px-mw-4 py-3 font-semibold bg-moroww-orange text-moroww-dark hover:bg-moroww-orange/85 transition-colors"
            >
              kies een moment
            </a>
          </p>
        </TekstBlok>
      </div>
    </Register>
  )
}
