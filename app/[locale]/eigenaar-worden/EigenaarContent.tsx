import Link from "next/link";
import { LeadForm } from "@/components/ui/LeadForm";
import { Statrij } from "@/components/sections/Statrij";
import { screeningsPubliek } from "@/lib/screenings";
import { TOTAL_STAYS_REVIEWED } from "@/lib/reviews";
import { Register } from "@/components/Register";
import { TekstBlok } from "@/components/sections/TekstBlok";

// Labelversie NL (nov 2026). Zelfde verhaal als de eigenaarsmails na
// Start it @KBC: je verhuurt zelf, wij keuren en houden de standaard,
// partners en merken horen bij het label, beheer is een van drie keuzes.

const LINK = "text-audit uppercase text-moroww-dark underline underline-offset-4 decoration-moroww-label hover:decoration-moroww-dark transition-colors"
const CTA_VOL = "inline-flex items-center rounded-full px-mw-4 py-3 font-semibold bg-moroww-orange text-moroww-dark hover:bg-moroww-orange/85 transition-colors"
const CTA_RAND = "inline-flex items-center rounded-full px-mw-4 py-3 font-semibold border border-moroww-dark text-moroww-dark hover:bg-moroww-dark hover:text-white transition-colors"
const GESPREK = "https://calendar.app.google/BH8wYeA9AGf6KrUz7"

function DefRij({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,14rem)_1fr] gap-mw-3 py-mw-4">
      <dt className="text-audit uppercase text-moroww-ink-2">{label}</dt>
      <dd className="text-body text-moroww-dark">{value}</dd>
    </div>
  )
}

function Keuze({ label, kop, tekst }: { label: string; kop: string; tekst: string }) {
  return (
    <div>
      <p className="text-audit uppercase text-moroww-label">{label}</p>
      <p className="mt-mw-2 text-body font-semibold text-moroww-dark">{kop}</p>
      <p className="mt-mw-2 text-body text-moroww-dark">{tekst}</p>
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
      {/* ── HERO ── */}
      <section className="w-full px-6 md:px-12 pt-28 pb-mw-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-audit uppercase text-moroww-label">voor eigenaars</p>
          <h1
            className="mt-mw-4 font-bold text-moroww-dark leading-[1.05] tracking-[-0.02em] max-w-[18ch]"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
          >
            je verhuurt zelf. wij staan in voor de standaard.
          </h1>
          <p className="mt-mw-5 text-body-lg text-moroww-dark max-w-[62ch]">
            moroww is een label voor karaktervolle vakantiewoningen. We keuren
            je huis ter plaatse, houden het aan de standaard en geven het een
            plaats in een kleine collectie. Je blijft verhuren via je eigen
            kanalen.
          </p>
          <div className="mt-mw-6 flex flex-wrap gap-mw-3">
            <a href="#poortentoets" className={CTA_VOL}>stel je huis kandidaat</a>
            <a href={GESPREK} target="_blank" rel="noopener noreferrer" className={CTA_RAND}>
              plan een gesprek
            </a>
          </div>
        </div>
      </section>

      {/* ── STATRIJ ── */}
      {statItems.length > 1 && <Statrij items={statItems} />}

      <div className="mx-auto max-w-6xl px-6 md:px-12">

        {/* ── WAAROM ── eigenaarsverhaal uit 'De moroww-belofte'. */}
        <TekstBlok eyebrow="waarom moroww">
          <p>
            Je kocht het niet zomaar. Je stond er op een avond in september,
            de luiken open, de zee of de heuvels in de verte. En je dacht:
            hier wil ik zijn.
          </p>
          <p>
            Maar je bent er niet. Je zit in een vergadering en je telefoon
            licht op. Een gast die de sleutel niet vindt. Een recensie over
            een vlek op het laken. Een poetshulp die niet kwam.
          </p>
          <p>Daar beginnen wij.</p>
          <p>
            We komen eerst kijken. Altijd. We lopen door elke kamer en zeggen
            eerlijk wat er nodig is. Soms zeggen we nee. Een label dat alles
            toelaat, beschermt niets.
          </p>
        </TekstBlok>

        {/* ── WAT ER VERANDERDE ── Start it @KBC */}
        <TekstBlok eyebrow="wat er veranderde">
          <p>
            In oktober werd moroww geselecteerd voor Start it @KBC, het
            acceleratorprogramma van KBC voor jonge ondernemingen. In de
            coaching daar keken we eerlijk naar de antwoorden die we van
            eigenaars kregen, en naar de stilte.
          </p>
          <p>
            Wat we toen voorstelden, ging vooral over beheer. Het idee is nu
            eenvoudiger. Jij blijft verhuren zoals vandaag. Wij keuren je
            huis. Haalt het de keuring, dan draagt het het moroww-label.
          </p>
        </TekstBlok>

        {/* ── WAT HET LABEL JE GEEFT ── */}
        <TekstBlok eyebrow="wat het label je geeft">
          <dl className="divide-y divide-moroww-rule border-t border-b border-moroww-rule">
            <DefRij label="de keuring"   value="We keuren je huis ter plaatse op de standaard: geen spoor van de vorige gast, een badkamer zonder één haar, vers linnen elke keer, klaar vóór aankomst. Elk jaar opnieuw. Haalt het de standaard niet meer, dan hoor je het van ons." />
            <DefRij label="het label"    value="Je huis draagt het label op je eigen listings en krijgt een plaats op moroww.com, in een kleine collectie karaktervolle huizen." />
            <DefRij label="de belofte"   value="Je gasten krijgen een belofte waar wij mee voor instaan." />
            <DefRij label="de partners"  value="Lokale vakmensen voor schoonmaak, linnen en onderhoud, en de techniek achter een vlotte aankomst. Wij kiezen ze zelf, houden ze aan de standaard en spreken voorwaarden af voor de hele collectie. Jij beslist wat je gebruikt." />
            <DefRij label="mee bepalen"  value="Als een van de eerste huizen bepaal je mee hoe de standaard eruitziet." />
          </dl>
          <p className="mt-mw-5 flex flex-wrap gap-x-mw-5 gap-y-mw-2">
            <Link href="/de-standaard" className={LINK}>lees de standaard →</Link>
            <Link href="/partners" className={LINK}>bekijk de partners →</Link>
          </p>
        </TekstBlok>

        {/* ── DRIE MANIEREN ── */}
        <TekstBlok eyebrow="jij kiest hoe ver wij gaan">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-mw-6">
            <Keuze
              label="01 · het label"
              kop="je verhuurt zelf."
              tekst="Wij keuren, certificeren en volgen op. Je huis staat in de collectie en draagt het label op je eigen kanalen."
            />
            <Keuze
              label="02 · hulp op maat"
              kop="je houdt de touwtjes."
              tekst="Wij lossen op wat wringt. Een partner ter plaatse, een slim slot, sensoren voor geluid, water en rook. Je weet het voor er schade is."
            />
            <Keuze
              label="03 · wij doen het voor je"
              kop="je krijgt je weekends terug."
              tekst="Distributie via alle kanalen en book.moroww.com. Wij doen het gastcontact en sturen de schoonmaak aan. Jij volgt alles in je dashboard."
            />
          </div>
          <p className="mt-mw-5">De standaard is voor elk huis dezelfde.</p>
        </TekstBlok>

        {/* ── DE VOLGENDE BATCH ── */}
        <TekstBlok eyebrow="de volgende batch" heading="tien woningen">
          <p>
            We hebben onze volgende batch geopend voor tien woningen die het
            label samen met ons willen testen. Niet
            elk huis haalt de keuring.
          </p>
          <p className="mt-mw-3">
            <a href="#poortentoets" className={CTA_VOL}>stel je huis kandidaat</a>
          </p>
        </TekstBlok>

        {/* ── HOE HET LOOPT ── */}
        <TekstBlok eyebrow="hoe het loopt">
          <dl className="divide-y divide-moroww-rule border-t border-b border-moroww-rule">
            <DefRij label="01 · kandidaat stellen" value="Binnen twee werkdagen nemen we persoonlijk contact op." />
            <DefRij label="02 · de keuring"        value="We komen kijken, lopen door elke kamer en zeggen eerlijk wat er nodig is." />
            <DefRij label="03 · het label"         value="Haalt je huis de keuring, dan draagt het het label en staat het in de collectie." />
          </dl>
          <p className="mt-mw-5">
            Je zit nergens aan vast. Je listings, je boekingen en je
            gastgegevens blijven van jou. Stop je, dan stop je.
          </p>
        </TekstBlok>

        {/* ── MET WIE JE WERKT ── */}
        <TekstBlok eyebrow="met wie je werkt">
          <p>
            Met ons team, niet met een callcenter. Wij komen zelf kijken en
            blijven je aanspreekpunt.
          </p>
          <p className="text-audit uppercase">
            <a href="mailto:info@moroww.com" className={LINK}>info@moroww.com</a>
          </p>
        </TekstBlok>

        {/* ── FORMULIER ── */}
        <TekstBlok eyebrow="kandidaat stellen" heading="stel je huis kandidaat">
          <p>
            We nemen binnen twee werkdagen persoonlijk contact op. Elke
            woning wordt fysiek beoordeeld, ook als het antwoord uiteindelijk
            nee is.
          </p>
          <div id="poortentoets" className="mt-mw-4 max-w-[52ch]">
            <LeadForm />
          </div>
          <p className="mt-mw-5">
            <Link href="/kennis" className={LINK}>
              eerst alles zelf uitzoeken? lees de kennisbank →
            </Link>
          </p>
        </TekstBlok>

        {/* ── GESPREK ── */}
        <TekstBlok eyebrow="gesprek" heading="liever meteen iemand spreken?" headingLevel="h3">
          <p>Kies zelf een moment voor een digitaal gesprek van dertig minuten.</p>
          <p className="mt-mw-3">
            <a href={GESPREK} target="_blank" rel="noopener noreferrer" className={CTA_VOL}>
              kies een moment
            </a>
          </p>
        </TekstBlok>
      </div>
    </Register>
  )
}
