import Link from "next/link";
import { LeadForm } from "@/components/ui/LeadForm";
import { Statrij } from "@/components/sections/Statrij";
import { screeningsPubliek } from "@/lib/screenings";
import { TOTAL_STAYS_REVIEWED } from "@/lib/reviews";
import { Register } from "@/components/Register";
import { TekstBlok } from "@/components/sections/TekstBlok";

// Labelversie EN (nov 2026). Zelfde structuur als de NL-versie; natuurlijk
// Engels, geen letterlijke vertaling.

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

export async function EigenaarContentEN() {
  const cijfers = await screeningsPubliek()
  const statItems = [
    cijfers?.aantal_dossier    ? { cijfer: String(cijfers.aantal_dossier),   label: 'files reviewed'   } : null,
    cijfers?.aantal_bezoek     ? { cijfer: String(cijfers.aantal_bezoek),    label: 'visited in person' } : null,
    cijfers?.aantal_opgenomen  ? { cijfer: String(cijfers.aantal_opgenomen), label: 'accepted'         } : null,
    { cijfer: String(TOTAL_STAYS_REVIEWED), label: 'stays' },
  ].filter((x): x is { cijfer: string; label: string } => x !== null)

  return (
    <Register kant="eigenaar">
      {/* ── HERO ── */}
      <section className="w-full px-6 md:px-12 pt-28 pb-mw-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-audit uppercase text-moroww-label">for owners</p>
          <h1
            className="mt-mw-4 font-bold text-moroww-dark leading-[1.05] tracking-[-0.02em] max-w-[18ch]"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
          >
            you rent it out. we vouch for the standard.
          </h1>
          <p className="mt-mw-5 text-body-lg text-moroww-dark max-w-[62ch]">
            moroww is a label for holiday homes with character. We inspect
            your home in person, hold it to the standard and give it a place
            in a small collection. You keep renting through your own
            channels.
          </p>
          <div className="mt-mw-6 flex flex-wrap gap-mw-3">
            <a href="#poortentoets" className={CTA_VOL}>put your home forward</a>
            <a href={GESPREK} target="_blank" rel="noopener noreferrer" className={CTA_RAND}>
              book a call
            </a>
          </div>
        </div>
      </section>

      {/* ── STATRIJ ── */}
      {statItems.length > 1 && <Statrij items={statItems} />}

      <div className="mx-auto max-w-6xl px-6 md:px-12">

        {/* ── WAAROM ── eigenaarsverhaal uit 'De moroww-belofte'. */}
        <TekstBlok eyebrow="why moroww">
          <p>
            You did not buy it on a whim. You stood there one evening in
            September, shutters open, the sea or the hills in the distance.
            And you thought: this is where I want to be.
          </p>
          <p>
            But you are not there. You are in a meeting and your phone lights
            up. A guest who cannot find the key. A review about a stain on
            the sheets. A cleaner who did not turn up.
          </p>
          <p>That is where we start.</p>
          <p>
            We always come to look first. We walk through every room and say
            honestly what it needs. Sometimes we say no. A label that lets
            everything in protects nothing.
          </p>
        </TekstBlok>

        {/* ── WAT ER VERANDERDE ── Start it @KBC */}
        <TekstBlok eyebrow="what changed">
          <p>
            In October moroww was selected for Start it @KBC, the KBC
            accelerator for young companies. In the coaching there we took
            an honest look at the answers we got from owners, and at the
            silence.
          </p>
          <p>
            What we offered then was mostly management. The idea is simpler
            now. You keep renting as you do today. We inspect your home. If
            it passes, it carries the moroww label.
          </p>
        </TekstBlok>

        {/* ── WAT HET LABEL JE GEEFT ── */}
        <TekstBlok eyebrow="what the label gives you">
          <dl className="divide-y divide-moroww-rule border-t border-b border-moroww-rule">
            <DefRij label="the inspection" value="We inspect your home in person against the standard: no trace of the last guest, a bathroom without one hair, fresh linen every time, ready before arrival. Every year again. If it no longer meets the standard, you hear it from us." />
            <DefRij label="the label"    value="Your home carries the label on your own listings and gets a place on moroww.com, in a small collection of homes with character." />
            <DefRij label="the promise"  value="Your guests get a promise that we stand behind." />
            <DefRij label="the partners" value="Local craftspeople for cleaning, linen and maintenance, and the technology behind a smooth arrival. We choose them ourselves, hold them to the standard and agree terms for the whole collection. You decide what you use." />
            <DefRij label="a say"        value="As one of the first homes, you help shape what the standard looks like." />
          </dl>
          <p className="mt-mw-5 flex flex-wrap gap-x-mw-5 gap-y-mw-2">
            <Link href="/de-standaard" className={LINK}>read the standard →</Link>
            <Link href="/partners" className={LINK}>see the partners →</Link>
          </p>
        </TekstBlok>

        {/* ── DRIE MANIEREN ── */}
        <TekstBlok eyebrow="you choose how far we go">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-mw-6">
            <Keuze
              label="01 · the label"
              kop="you rent it out."
              tekst="We inspect, certify and follow up. Your home is in the collection and carries the label on your own channels."
            />
            <Keuze
              label="02 · help where needed"
              kop="you stay in control."
              tekst="We fix what chafes. A local partner, a smart lock, sensors for noise, water and smoke. You know before there is damage."
            />
            <Keuze
              label="03 · we do it for you"
              kop="you get your weekends back."
              tekst="Distribution across all channels and book.moroww.com. We handle guest contact and run the cleaning. You follow everything in your dashboard."
            />
          </div>
          <p className="mt-mw-5">The standard is the same for every home.</p>
        </TekstBlok>

        {/* ── DE VOLGENDE BATCH ── */}
        <TekstBlok eyebrow="the next batch" heading="ten homes">
          <p>
            We have opened our next batch to ten homes that want to test the
            label with us. Not every home passes the
            inspection.
          </p>
          <p className="mt-mw-3">
            <a href="#poortentoets" className={CTA_VOL}>put your home forward</a>
          </p>
        </TekstBlok>

        {/* ── HOE HET LOOPT ── */}
        <TekstBlok eyebrow="how it runs">
          <dl className="divide-y divide-moroww-rule border-t border-b border-moroww-rule">
            <DefRij label="01 · put it forward" value="We get in touch personally within two working days." />
            <DefRij label="02 · the inspection" value="We come to look, walk through every room and say honestly what it needs." />
            <DefRij label="03 · the label"      value="If your home passes, it carries the label and joins the collection." />
          </dl>
          <p className="mt-mw-5">
            You are not tied to anything. Your listings, your bookings and
            your guest data stay yours. If you stop, you stop.
          </p>
        </TekstBlok>

        {/* ── MET WIE JE WERKT ── */}
        <TekstBlok eyebrow="who you work with">
          <p>
            With our team, not a call centre. We come to look at the home
            ourselves and stay your point of contact.
          </p>
          <p className="text-audit uppercase">
            <a href="mailto:info@moroww.com" className={LINK}>info@moroww.com</a>
          </p>
        </TekstBlok>

        {/* ── FORMULIER ── */}
        <TekstBlok eyebrow="put your home forward" heading="put your home forward">
          <p>
            We get in touch personally within two working days. Every home is
            assessed in person, even when the answer turns out to be no.
          </p>
          <div id="poortentoets" className="mt-mw-4 max-w-[52ch]">
            <LeadForm />
          </div>
          <p className="mt-mw-5">
            <Link href="/kennis" className={LINK}>
              want to figure it out yourself first? read the knowledge base (in Dutch) →
            </Link>
          </p>
        </TekstBlok>

        {/* ── GESPREK ── */}
        <TekstBlok eyebrow="a talk" heading="prefer to speak to someone directly?" headingLevel="h3">
          <p>Book a thirty-minute video call at a time that suits you.</p>
          <p className="mt-mw-3">
            <a href={GESPREK} target="_blank" rel="noopener noreferrer" className={CTA_VOL}>
              book a time
            </a>
          </p>
        </TekstBlok>
      </div>
    </Register>
  )
}
