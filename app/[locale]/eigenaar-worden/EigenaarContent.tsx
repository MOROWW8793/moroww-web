import Link from "next/link";
import { LeadForm } from "@/components/ui/LeadForm";
import { Statrij } from "@/components/sections/Statrij";
import { SCREENINGS_TOTAL, SCREENINGS_ACCEPTED } from "@/lib/screenings";
import { TOTAL_STAYS_REVIEWED } from "@/lib/reviews";
import { Register } from "@/components/Register";
import { AuditLijn } from "@/components/AuditLijn";

// Herschreven in het eigenaarsregister (bouwspec stap 5B). Paper-achtergrond,
// hairlines tussen secties, geen witte kaarten, geen afgeronde blokken, geen
// schaduwen. Copy hardgecodeerd in NL — deze pagina is NL-only.

// Hairline in --moroww-rule tussen inhoudsblokken.
function Hr() {
  return <hr className="mt-mw-8 mb-mw-6 border-0 border-t border-moroww-rule" aria-hidden />
}

function DefRij({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,14rem)_1fr] gap-mw-3 py-mw-4">
      <dt className="text-audit uppercase text-moroww-ink-2">{label}</dt>
      <dd className="text-body text-moroww-dark">{value}</dd>
    </div>
  )
}

export function EigenaarContent() {
  return (
    <Register kant="eigenaar">
      <h1 className="sr-only">
        Vakantiewoning verhuren in België via moroww — gecertificeerd kwaliteitslabel met smart lock, audit en directe boeking
      </h1>

      {/* ── HERO ── */}
      <section className="w-full px-6 md:px-12 pt-28 pb-mw-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-audit uppercase text-moroww-label">voor eigenaars</p>
          <h2
            className="mt-mw-4 font-bold text-moroww-dark leading-[1.05] tracking-[-0.02em] max-w-[16ch]"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
          >
            je woning. onze standaard. één label.
          </h2>
          <p className="mt-mw-5 text-body-lg text-moroww-dark max-w-[62ch]">
            moroww is een label voor vakantiewoningen, geen beheerder. Je blijft
            eigenaar van je woning, van je boekingen en van je gasten. Wij
            leveren de standaard, de audit, het systeem en de distributie.
          </p>
        </div>
      </section>

      {/* ── STATRIJ — het bewijs in cijfers ── */}
      <Statrij items={[
        { cijfer: String(SCREENINGS_TOTAL),     label: 'woningen bekeken' },
        { cijfer: String(SCREENINGS_ACCEPTED),  label: 'opgenomen' },
        { cijfer: String(TOTAL_STAYS_REVIEWED), label: 'verblijven' },
        { cijfer: '10/10',                      label: 'beoordeling' },
      ]} />

      {/* ── WAT HET LABEL DOET ── */}
      <section className="w-full px-6 md:px-12 py-mw-8">
        <div className="mx-auto max-w-6xl">
          <AuditLijn density="quiet" items={['wat het label doet']} />
          <h2 className="mt-mw-4 text-h2 text-moroww-dark max-w-[68ch]">
            de standaard komt van ons, de woning blijft van jou
          </h2>
          <div className="mt-mw-4 max-w-[68ch] space-y-mw-3 text-body text-moroww-dark">
            <p>
              Voor een woning in de collectie komt, staan we er ter plaatse. We
              beoordelen op vier poorten: ruimte, ligging, karakter en staat.
              Van de woningen die we bekijken, haalt de meerderheid de standaard
              niet.
            </p>
            <p>
              Halen we de standaard wel: dan installeren we de systemen die het
              verblijf dragen. We voeren jaarlijks een heraudit uit. Voldoet
              een woning niet meer, dan verlaat ze de collectie. Ook als ze
              goed verhuurt.
            </p>
          </div>
        </div>
      </section>

      {/* ── WAT HET LABEL KOST ── */}
      <section className="w-full px-6 md:px-12 py-mw-8">
        <div className="mx-auto max-w-6xl">
          <AuditLijn density="quiet" items={['wat het kost']} />
          <h2 className="mt-mw-4 text-h2 text-moroww-dark">wat het label kost</h2>
          <dl className="mt-mw-5 max-w-[68ch] divide-y divide-moroww-rule border-t border-b border-moroww-rule">
            <DefRij
              label="commissie"
              value="15 % op de logiesfare, exclusief btw en exclusief schoonmaak"
            />
            <DefRij
              label="collectielidmaatschap"
              value="€ 149,99 per maand, of jaarlijks vooruitbetaald met 10 % korting"
            />
            <DefRij
              label="onboarding"
              value="eenmalig, afhankelijk van de omvang van de woning"
            />
          </dl>
          <p className="mt-mw-5 text-body text-moroww-dark max-w-[62ch]">
            Het collectielidmaatschap is geen abonnement op een dienst. Het is
            het lidmaatschap van het label: de audit, de heraudit, de standaard
            en het systeem eronder.
          </p>
          <p className="mt-mw-5">
            <Link
              href="/kennis/wat-kost-een-nacht-vakantiewoning"
              className="text-audit uppercase text-moroww-dark underline underline-offset-4 decoration-moroww-label hover:decoration-moroww-dark transition-colors"
            >
              reken je opbrengst door met alle kosten erin →
            </Link>
          </p>
        </div>
      </section>

      {/* ── JE ZIT NERGENS AAN VAST ── */}
      <section className="w-full px-6 md:px-12 py-mw-8">
        <div className="mx-auto max-w-6xl">
          <AuditLijn density="quiet" items={['uitstapclausule']} />
          <h2 className="mt-mw-4 text-h2 text-moroww-dark">je zit nergens aan vast</h2>
          <div className="mt-mw-4 max-w-[68ch] space-y-mw-3 text-body text-moroww-dark">
            <p>
              Een label dat mensen moet vasthouden met een contract, heeft geen
              label nodig maar een advocaat. De hardware wordt na volledige
              betaling jouw eigendom. De software blijft in licentie. Je
              boekingen en je gastgegevens blijven van jou. Stop je, dan stop je.
            </p>
          </div>
        </div>
      </section>

      {/* ── TECH: DRIE DINGEN DIE EEN EIGENAAR 'S NACHTS WAKKER HOUDEN ── */}
      <section className="w-full px-6 md:px-12 py-mw-8">
        <div className="mx-auto max-w-6xl">
          <AuditLijn density="quiet" items={['de tech-laag']} />
          <h2 className="mt-mw-4 text-h2 text-moroww-dark">
            drie dingen die het systeem bewaakt
          </h2>

          <div className="mt-mw-6 grid grid-cols-1 md:grid-cols-3 gap-mw-6">
            <div>
              <p className="text-audit uppercase text-moroww-label">je vergunning</p>
              <p className="mt-mw-3 text-body text-moroww-dark">
                Een decibelsensor bewaakt of het rustig blijft. Hij meet
                geluidsniveau, geen gesprekken. Overlast wordt gedetecteerd
                voor het een probleem wordt.
              </p>
            </div>
            <div>
              <p className="text-audit uppercase text-moroww-label">je vastgoed</p>
              <p className="mt-mw-3 text-body text-moroww-dark">
                Waterlek, rookontwikkeling, klimaatafwijking: je wordt
                gewaarschuwd voor er schade is. Het systeem merkt het voor
                iemand het merkt.
              </p>
            </div>
            <div>
              <p className="text-audit uppercase text-moroww-label">je tijd</p>
              <p className="mt-mw-3 text-body text-moroww-dark">
                Sleutelloze aankomst, sfeer die zichzelf klaarzet, schoonmaak
                die vanzelf wordt aangestuurd. Bezetting en rapportage in je
                dashboard. Je hoeft er nooit bij te zijn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HET TRAJECT ── */}
      <section className="w-full px-6 md:px-12 py-mw-8">
        <div className="mx-auto max-w-6xl">
          <AuditLijn density="quiet" items={['het traject']} />
          <h2 className="mt-mw-4 text-h2 text-moroww-dark">van aanmelding tot live</h2>

          <dl className="mt-mw-5 max-w-[68ch] divide-y divide-moroww-rule border-t border-b border-moroww-rule">
            <DefRij
              label="01 · aanmelding"
              value="Je vult het formulier in. We nemen binnen twee werkdagen contact op en beoordelen elke woning op locatie, oppervlakte en karakter."
            />
            <DefRij
              label="02 · audit en installatie"
              value="Ons team bezoekt de woning, voert de audit uit, geeft interieuradvies en installeert de tech-stack."
            />
            <DefRij
              label="03 · live in de collectie"
              value="De woning draagt het label. We starten de distributie via alle kanalen en via book.moroww.com. Je volgt alles op via het host-dashboard."
            />
          </dl>
        </div>
      </section>

      {/* ── DE OPRICHTER — één, niet meerdere ── */}
      <section className="w-full px-6 md:px-12 py-mw-8">
        <div className="mx-auto max-w-6xl">
          <AuditLijn density="quiet" items={['het team']} />
          <h2 className="mt-mw-4 text-h2 text-moroww-dark">je werkt met de oprichter</h2>
          <p className="mt-mw-4 text-body text-moroww-dark max-w-[62ch]">
            Je werkt met Noam. Geen callcenter, geen accountmanager, geen
            tussenpersoon. Hij komt zelf kijken en blijft je aanspreekpunt.
          </p>
          <p className="mt-mw-3 text-body text-moroww-dark">
            <a
              href="mailto:info@moroww.com"
              className="underline underline-offset-4 decoration-moroww-label hover:decoration-moroww-dark transition-colors"
            >
              info@moroww.com
            </a>
          </p>
        </div>
      </section>

      {/* ── VOOR JE BESLIST — doorverwijzing kennisbank ── */}
      <section className="w-full px-6 md:px-12 py-mw-8">
        <div className="mx-auto max-w-6xl">
          <AuditLijn density="quiet" items={['voor je beslist']} />
          <h3 className="mt-mw-4 text-h3 text-moroww-dark">eerst uitzoeken hoe het zit</h3>

          <div className="mt-mw-5 grid grid-cols-1 md:grid-cols-3 gap-mw-6">
            <Link
              href="/kennis/wat-kost-een-nacht-vakantiewoning"
              className="group block"
            >
              <p className="text-audit uppercase text-moroww-label">opbrengst en rendement</p>
              <p className="mt-mw-3 text-h3 text-moroww-dark group-hover:text-moroww-orange transition-colors">
                wat een nacht kost →
              </p>
            </Link>
            <Link
              href="/kennis/verblijfsbelasting-vakantiewoning"
              className="group block"
            >
              <p className="text-audit uppercase text-moroww-label">regels en vergunningen</p>
              <p className="mt-mw-3 text-h3 text-moroww-dark group-hover:text-moroww-orange transition-colors">
                regels en belasting →
              </p>
            </Link>
            <Link
              href="/kennis/vakantiewoning-verhuren-zelf-platform-beheerder-label"
              className="group block"
            >
              <p className="text-audit uppercase text-moroww-label">kiezen hoe je verhuurt</p>
              <p className="mt-mw-3 text-h3 text-moroww-dark group-hover:text-moroww-orange transition-colors">
                zelf, platform, beheerder of label →
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FORMULIER ── */}
      <section className="w-full px-6 md:px-12 py-mw-8" id="poortentoets">
        <div className="mx-auto max-w-6xl">
          <AuditLijn density="quiet" items={['aanmelden']} />
          <h2 className="mt-mw-4 text-h2 text-moroww-dark">meld je woning aan</h2>
          <p className="mt-mw-4 text-body text-moroww-dark max-w-[62ch]">
            We nemen binnen twee werkdagen persoonlijk contact op. Elke woning
            wordt fysiek beoordeeld, ook als het antwoord uiteindelijk nee is.
          </p>
          <div className="mt-mw-6 max-w-[52ch]">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* ── AFSLUITING — CTA-D gesprek ── */}
      <section className="w-full px-6 md:px-12 pt-mw-8 pb-mw-10">
        <div className="mx-auto max-w-6xl">
          <Hr />
          <AuditLijn density="quiet" items={['gesprek']} />
          <h3 className="mt-mw-4 text-h3 text-moroww-dark">liever meteen iemand spreken?</h3>
          <p className="mt-mw-3 text-body text-moroww-dark max-w-[62ch]">
            Kies zelf een moment voor een digitaal gesprek van dertig minuten.
          </p>
          <p className="mt-mw-5">
            <a
              href="https://calendar.app.google/BH8wYeA9AGf6KrUz7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full px-mw-4 py-3 font-semibold bg-moroww-orange text-moroww-dark hover:bg-moroww-orange/85 transition-colors"
            >
              kies een moment
            </a>
          </p>
        </div>
      </section>
    </Register>
  )
}
