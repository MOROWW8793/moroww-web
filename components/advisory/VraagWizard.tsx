'use client'

import { useState } from 'react'
import Link from 'next/link'

/**
 * Interactieve vragen-wizard. Drie korte vragen, radio-achtige keuzes.
 * Na de derde vraag toont een persoonlijke 'eerste stap' en een knop die
 * de keuzes meestuurt als query naar /advisory/contact. Zo bereidt het
 * contactformulier (en Noam z'n inbox) zich al voor voor de bezoeker.
 *
 * Geen externe dependency. State in useState. 'Opnieuw'-knop resett.
 */

type Keuze = { id: string; label: string }
type Vraag = { id: string; vraag: string; opties: Keuze[] }

const VRAGEN: Vraag[] = [
  {
    id: 'situatie',
    vraag: 'waar sta je nu?',
    opties: [
      { id: 'nog-niets', label: 'nog niets gedaan' },
      { id: 'al-verhuurd', label: 'al verhuurd via een platform' },
      { id: 'vastgelopen', label: 'ervaring, maar vastgelopen' },
    ],
  },
  {
    id: 'knelpunt',
    vraag: 'waar wringt het?',
    opties: [
      { id: 'regels', label: 'vergunning of regels' },
      { id: 'prijzen', label: 'prijzen of rendement' },
      { id: 'foto-tekst', label: 'foto’s of teksten' },
      { id: 'anders', label: 'iets anders' },
    ],
  },
  {
    id: 'uitvoering',
    vraag: 'wie voert het uit?',
    opties: [
      { id: 'zelf', label: 'ik doe het zelf' },
      { id: 'partner', label: 'met een partner' },
      { id: 'moroww', label: 'moroww regelt het' },
    ],
  },
]

type Antwoorden = Partial<Record<string, string>>

function eersteStap(a: Antwoorden): string {
  if (a.knelpunt === 'regels') return 'We gaan de regels voor jouw adres na — vergunning, registratie, brandveiligheid.'
  if (a.knelpunt === 'prijzen') return 'We kijken je prijzen na en zetten op een rij wat beter kan.'
  if (a.knelpunt === 'foto-tekst') return 'We lopen je foto’s en teksten door en zeggen wat gasten mist.'
  if (a.situatie === 'nog-niets') return 'We zetten op een rij wat nog ontbreekt en in welke volgorde het moet.'
  return 'We beginnen met een kort gesprek om je situatie te begrijpen.'
}

export function VraagWizard() {
  const [stap, setStap] = useState(0)
  const [antwoorden, setAntwoorden] = useState<Antwoorden>({})
  const klaar = stap >= VRAGEN.length

  function kies(vraagId: string, optieId: string) {
    const nieuw = { ...antwoorden, [vraagId]: optieId }
    setAntwoorden(nieuw)
    setStap(stap + 1)
  }

  function opnieuw() {
    setAntwoorden({})
    setStap(0)
  }

  if (klaar) {
    const query = new URLSearchParams(
      Object.entries(antwoorden).map(([k, v]) => [k, v as string]),
    ).toString()
    return (
      <div className="adv-wizard adv-wizard-klaar" data-mw-reveal>
        <span className="adv-wizard-boven">jouw eerste stap</span>
        <h3 className="adv-wizard-uitkomst">{eersteStap(antwoorden)}</h3>
        <div className="adv-wizard-keuzes">
          {VRAGEN.map((v) => {
            const g = v.opties.find((o) => o.id === antwoorden[v.id])
            return (
              <div key={v.id} className="adv-wizard-keuze">
                <span className="adv-wizard-keuze-label">{v.vraag}</span>
                <span className="adv-wizard-keuze-waarde">{g?.label}</span>
              </div>
            )
          })}
        </div>
        <div className="adv-wizard-acties">
          <Link
            href={`/advisory/contact?${query}`}
            className="btn btn-primair"
          >
            stuur deze vraag naar moroww
          </Link>
          <button type="button" onClick={opnieuw} className="btn btn-lijn">
            opnieuw
          </button>
        </div>
      </div>
    )
  }

  const v = VRAGEN[stap]
  return (
    <div className="adv-wizard" aria-live="polite">
      <div className="adv-wizard-voortgang">
        <span className="adv-wizard-boven">vraag {stap + 1} van {VRAGEN.length}</span>
        <div className="adv-wizard-staaf" aria-hidden>
          {VRAGEN.map((_, i) => (
            <span
              key={i}
              className={`adv-wizard-staaf-stuk ${i <= stap ? 'adv-wizard-staaf-vol' : ''}`}
            />
          ))}
        </div>
      </div>
      <h3 className="adv-wizard-vraag" key={v.id}>{v.vraag}</h3>
      <div className="adv-wizard-opties">
        {v.opties.map((o) => (
          <button
            key={o.id}
            type="button"
            className="adv-wizard-optie"
            onClick={() => kies(v.id, o.id)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}
