import Link from "next/link";
import { LeadForm } from "@/components/ui/LeadForm";
import { Statrij } from "@/components/sections/Statrij";
import { screeningsPubliek } from "@/lib/screenings";
import { TOTAL_STAYS_REVIEWED } from "@/lib/reviews";
import { Register } from "@/components/Register";
import { AuditLijn } from "@/components/AuditLijn";

// EN-tegenhanger van EigenaarContent. Gerouteerd naar /en/become-an-owner
// via next-intl pathnames. Copy is hardgecodeerd EN — dezelfde structuur als
// de NL-versie, geen tarieven behalve onboarding € 1,950.

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
            moroww is a label for holiday homes, not a manager. You stay the
            owner of your home, your bookings and your guests. We bring the
            standard, the audit, the system and the distribution.
          </p>
        </div>
      </section>

      {/* ── STATRIJ ── */}
      {statItems.length > 1 && <Statrij items={statItems} />}

      {/* ── WAT HET LABEL DOET ── */}
      <section className="w-full px-6 md:px-12 py-mw-8">
        <div className="mx-auto max-w-6xl">
          <AuditLijn density="quiet" items={['what the label does']} />
          <h2 className="mt-mw-4 text-h2 text-moroww-dark max-w-[68ch]">
            the standard is ours. the home stays yours.
          </h2>
          <div className="mt-mw-4 max-w-[68ch] space-y-mw-3 text-body text-moroww-dark">
            <p>
              Before a home enters the collection, we visit in person. We
              assess it on four gates: at least 100 m² with two bedrooms,
              character in natural materials, a quiet setting, and we have
              been there. Most of what we look at does not make it.
            </p>
            <p>
              If a home does make it, we install the systems that carry the
              stay. Every year we re-audit. If a home no longer meets the
              standard, it leaves the collection. Even when it books well.
            </p>
          </div>
        </div>
      </section>

      {/* ── WAT HET LABEL KOST ── */}
      <section className="w-full px-6 md:px-12 py-mw-8">
        <div className="mx-auto max-w-6xl">
          <AuditLijn density="quiet" items={['what it costs']} />
          <h2 className="mt-mw-4 text-h2 text-moroww-dark">what the label costs</h2>
          <dl className="mt-mw-5 max-w-[68ch] divide-y divide-moroww-rule border-t border-b border-moroww-rule">
            <DefRij
              label="onboarding"
              value="one-off, € 1,950"
            />
          </dl>
          <p className="mt-mw-5">
            <Link
              href="/kennis/wat-kost-een-nacht-vakantiewoning"
              className="text-audit uppercase text-moroww-dark underline underline-offset-4 decoration-moroww-label hover:decoration-moroww-dark transition-colors"
            >
              work out your income, all costs included →
            </Link>
          </p>
        </div>
      </section>

      {/* ── JE ZIT NERGENS AAN VAST ── */}
      <section className="w-full px-6 md:px-12 py-mw-8">
        <div className="mx-auto max-w-6xl">
          <AuditLijn density="quiet" items={['exit clause']} />
          <h2 className="mt-mw-4 text-h2 text-moroww-dark">no lock-in.</h2>
          <div className="mt-mw-4 max-w-[68ch] space-y-mw-3 text-body text-moroww-dark">
            <p>
              A label that needs a contract to keep owners doesn&apos;t need a
              label. It needs a lawyer. After full payment, the hardware is
              yours. The software stays under licence. Your bookings and your
              guest data remain yours. If you stop, you stop.
            </p>
          </div>
        </div>
      </section>

      {/* ── TECH ── */}
      <section className="w-full px-6 md:px-12 py-mw-8">
        <div className="mx-auto max-w-6xl">
          <AuditLijn density="quiet" items={['the tech layer']} />
          <h2 className="mt-mw-4 text-h2 text-moroww-dark">
            three things the system watches over
          </h2>

          <div className="mt-mw-6 grid grid-cols-1 md:grid-cols-3 gap-mw-6">
            <div>
              <p className="text-audit uppercase text-moroww-label">your permit</p>
              <p className="mt-mw-3 text-body text-moroww-dark">
                A decibel sensor watches the noise. It measures noise level,
                not conversations. Disturbance is picked up before it becomes
                a problem.
              </p>
            </div>
            <div>
              <p className="text-audit uppercase text-moroww-label">your property</p>
              <p className="mt-mw-3 text-body text-moroww-dark">
                A leak, smoke, unusual temperature or humidity: you are warned
                before there is damage. The system notices before anyone else
                does.
              </p>
            </div>
            <div>
              <p className="text-audit uppercase text-moroww-label">your time</p>
              <p className="mt-mw-3 text-body text-moroww-dark">
                Keyless arrival, lights and heating ready before you arrive,
                cleaning triggered by the calendar. Occupancy and reporting
                in your dashboard. You never have to be there.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HET TRAJECT ── */}
      <section className="w-full px-6 md:px-12 py-mw-8">
        <div className="mx-auto max-w-6xl">
          <AuditLijn density="quiet" items={['the journey']} />
          <h2 className="mt-mw-4 text-h2 text-moroww-dark">from registration to live</h2>

          <dl className="mt-mw-5 max-w-[68ch] divide-y divide-moroww-rule border-t border-b border-moroww-rule">
            <DefRij
              label="01 · registration"
              value="You fill in the form. We get in touch within two working days and assess every home on the four gates."
            />
            <DefRij
              label="02 · audit and installation"
              value="Our team visits the home, runs the audit, gives interior advice and installs the tech stack."
            />
            <DefRij
              label="03 · live in the collection"
              value="The home carries the label. We start distribution on every channel and via book.moroww.com. You follow it all through the host dashboard."
            />
          </dl>
        </div>
      </section>

      {/* ── DE OPRICHTER ── */}
      <section className="w-full px-6 md:px-12 py-mw-8">
        <div className="mx-auto max-w-6xl">
          <AuditLijn density="quiet" items={['the team']} />
          <h2 className="mt-mw-4 text-h2 text-moroww-dark">you work with the founder</h2>
          <p className="mt-mw-4 text-body text-moroww-dark max-w-[62ch]">
            You work with Noam. No call centre, no account manager, no
            intermediary. He comes to look at the home himself and stays your
            point of contact.
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

      {/* ── VOOR JE BESLIST ── */}
      <section className="w-full px-6 md:px-12 py-mw-8">
        <div className="mx-auto max-w-6xl">
          <AuditLijn density="quiet" items={['before you decide']} />
          <h3 className="mt-mw-4 text-h3 text-moroww-dark">figure out how it works first</h3>

          <div className="mt-mw-5 grid grid-cols-1 md:grid-cols-3 gap-mw-6">
            <Link
              href="/kennis/wat-kost-een-nacht-vakantiewoning"
              className="group block"
            >
              <p className="text-audit uppercase text-moroww-label">income and yield</p>
              <p className="mt-mw-3 text-h3 text-moroww-dark group-hover:text-moroww-orange transition-colors">
                what a night costs →
              </p>
            </Link>
            <Link
              href="/kennis/verblijfsbelasting-vakantiewoning"
              className="group block"
            >
              <p className="text-audit uppercase text-moroww-label">rules and permits</p>
              <p className="mt-mw-3 text-h3 text-moroww-dark group-hover:text-moroww-orange transition-colors">
                rules and taxes →
              </p>
            </Link>
            <Link
              href="/kennis/vakantiewoning-verhuren-zelf-platform-beheerder-label"
              className="group block"
            >
              <p className="text-audit uppercase text-moroww-label">choosing how to rent</p>
              <p className="mt-mw-3 text-h3 text-moroww-dark group-hover:text-moroww-orange transition-colors">
                yourself, platform, manager or label →
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FORMULIER ── */}
      <section className="w-full px-6 md:px-12 py-mw-8" id="poortentoets">
        <div className="mx-auto max-w-6xl">
          <AuditLijn density="quiet" items={['register']} />
          <h2 className="mt-mw-4 text-h2 text-moroww-dark">register your home</h2>
          <p className="mt-mw-4 text-body text-moroww-dark max-w-[62ch]">
            We get in touch personally within two working days. Every home is
            assessed in person, even when the answer turns out to be no.
          </p>
          <div className="mt-mw-6 max-w-[52ch]">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* ── AFSLUITING ── */}
      <section className="w-full px-6 md:px-12 pt-mw-8 pb-mw-10">
        <div className="mx-auto max-w-6xl">
          <Hr />
          <AuditLijn density="quiet" items={['a talk']} />
          <h3 className="mt-mw-4 text-h3 text-moroww-dark">prefer to speak to someone directly?</h3>
          <p className="mt-mw-3 text-body text-moroww-dark max-w-[62ch]">
            Book a thirty-minute video call at a time that suits you.
          </p>
          <p className="mt-mw-5">
            <a
              href="https://calendar.app.google/BH8wYeA9AGf6KrUz7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full px-mw-4 py-3 font-semibold bg-moroww-orange text-moroww-dark hover:bg-moroww-orange/85 transition-colors"
            >
              book a time
            </a>
          </p>
        </div>
      </section>
    </Register>
  )
}
