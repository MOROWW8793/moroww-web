import Link from "next/link";
import { LeadForm } from "@/components/ui/LeadForm";
import { Statrij } from "@/components/sections/Statrij";
import { screeningsPubliek } from "@/lib/screenings";
import { TOTAL_STAYS_REVIEWED } from "@/lib/reviews";
import { Register } from "@/components/Register";
import { TekstBlok } from "@/components/sections/TekstBlok";

// WP M-versie EN. Zelfde structuur als de NL-versie; natuurlijk Engels
// (geen letterlijke vertaling).

function DefRij({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,14rem)_1fr] gap-mw-3 py-mw-4">
      <dt className="text-audit uppercase text-moroww-ink-2">{label}</dt>
      <dd className="text-body text-moroww-dark">{value}</dd>
    </div>
  )
}

export async function EigenaarContentEN() {
  const cijfers = await screeningsPubliek()
  const statItems = [
    cijfers?.aantal_dossier    ? { cijfer: String(cijfers.aantal_dossier),   label: 'files reviewed'     } : null,
    cijfers?.aantal_bezoek     ? { cijfer: String(cijfers.aantal_bezoek),    label: 'visited in person'  } : null,
    cijfers?.aantal_opgenomen  ? { cijfer: String(cijfers.aantal_opgenomen), label: 'accepted'           } : null,
    { cijfer: String(TOTAL_STAYS_REVIEWED), label: 'stays' },
  ].filter((x): x is { cijfer: string; label: string } => x !== null)

  return (
    <Register kant="eigenaar">
      {/* ── HERO ── */}
      <section className="w-full px-6 md:px-12 pt-28 pb-mw-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-audit uppercase text-moroww-label">for owners</p>
          <h1
            className="mt-mw-4 font-bold text-moroww-dark leading-[1.05] tracking-[-0.02em] max-w-[16ch]"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
          >
            your home. our standard. one label.
          </h1>
          <p className="mt-mw-5 text-body-lg text-moroww-dark max-w-[62ch]">
            moroww is the quality label for holiday homes in Belgium: every
            moroww home is audited, equipped and looked after.
          </p>
          <div className="mt-mw-6 flex flex-wrap gap-mw-3">
            <a
              href="#poortentoets"
              className="inline-flex items-center rounded-full px-mw-4 py-3 font-semibold bg-moroww-orange text-moroww-dark hover:bg-moroww-orange/85 transition-colors"
            >
              register your home
            </a>
            <a
              href="https://calendar.app.google/BH8wYeA9AGf6KrUz7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full px-mw-4 py-3 font-semibold border border-moroww-dark text-moroww-dark hover:bg-moroww-dark hover:text-white transition-colors"
            >
              book a call
            </a>
          </div>
        </div>
      </section>

      {/* ── STATRIJ ── */}
      {statItems.length > 1 && <Statrij items={statItems} />}

      <div className="mx-auto max-w-6xl px-6 md:px-12">

        {/* ── WAT JE KRIJGT ── */}
        <TekstBlok eyebrow="what you get">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-mw-6">
            <div>
              <p className="text-audit uppercase text-moroww-label">the standard</p>
              <p className="mt-mw-2 text-body text-moroww-dark">
                We assess your home in person on four gates and follow it
                afterwards. If it no longer meets the standard, you hear it
                from us.
              </p>
            </div>
            <div>
              <p className="text-audit uppercase text-moroww-label">the system</p>
              <p className="mt-mw-2 text-body text-moroww-dark">
                Smart lock, lights and heating that set themselves up, a
                signature scent, and sensors for noise, water and smoke. You
                know before there is damage.
              </p>
            </div>
            <div>
              <p className="text-audit uppercase text-moroww-label">the bookings</p>
              <p className="mt-mw-2 text-body text-moroww-dark">
                Distribution across every channel and via book.moroww.com. We
                handle guest contact and steer the cleaning. You follow it
                all in your dashboard.
              </p>
            </div>
          </div>
        </TekstBlok>

        {/* ── HOE HET LOOPT ── (exit-line uit het geschrapte 'what it
            costs'-blok verplaatst naar hier, als slotregel onder de drie
            stappen). */}
        <TekstBlok eyebrow="how it runs">
          <dl className="divide-y divide-moroww-rule border-t border-b border-moroww-rule">
            <DefRij label="01 · register"               value="We get in touch within two working days." />
            <DefRij label="02 · visit and installation" value="We assess the home in person and install the system." />
            <DefRij label="03 · live"                   value="Your home carries the label and joins the collection." />
          </dl>
          <p className="mt-mw-5">
            No lock-in. After payment the hardware is yours; so are your
            bookings and guest data. If you stop, you stop.
          </p>
        </TekstBlok>

        {/* ── MET WIE JE WERKT ── */}
        <TekstBlok eyebrow="who you work with">
          <p>
            With our team, not a call centre. We come to look at the home
            ourselves and stay your point of contact.
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
        <TekstBlok eyebrow="register" heading="register your home">
          <p>
            We get in touch personally within two working days. Every home is
            assessed in person, even when the answer turns out to be no.
          </p>
          <div id="poortentoets" className="mt-mw-4 max-w-[52ch]">
            <LeadForm />
          </div>
          <p className="mt-mw-5">
            <Link
              href="/kennis"
              className="text-audit uppercase text-moroww-dark underline underline-offset-4 decoration-moroww-label hover:decoration-moroww-dark transition-colors"
            >
              want to figure it out yourself first? read the knowledge base (in Dutch) →
            </Link>
          </p>
        </TekstBlok>

        {/* ── AFSLUITING — CTA-D gesprek ── */}
        <TekstBlok eyebrow="a talk" heading="prefer to speak to someone directly?" headingLevel="h3">
          <p>
            Book a thirty-minute video call at a time that suits you.
          </p>
          <p className="mt-mw-3">
            <a
              href="https://calendar.app.google/BH8wYeA9AGf6KrUz7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full px-mw-4 py-3 font-semibold bg-moroww-orange text-moroww-dark hover:bg-moroww-orange/85 transition-colors"
            >
              book a time
            </a>
          </p>
        </TekstBlok>
      </div>
    </Register>
  )
}
