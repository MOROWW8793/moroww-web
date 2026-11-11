'use client'

import { useState } from 'react'

/**
 * Interactieve plan-wisselaar. Drie scenarios uit de 7 voorbeelden
 * (mag ik verhuren · hoe start ik · eigen boekingssite). Bezoeker klikt
 * een tab, de stappen wisselen direct. Geeft voelbaar wat 'een plan'
 * voor hun specifieke vraag betekent — in plaats van één statisch
 * voorbeeld.
 *
 * Content is per scenario geschreven; geen plaatsvervanger-tekst. De
 * eerste stap heeft een tijd-badge; de rest is open.
 */

type Stap = { titel: string; badge?: string }
type Scenario = {
  id: string
  tab: string
  vraag: string
  stappen: Stap[]
}

const SCENARIOS: Scenario[] = [
  {
    id: 'kortverhuur',
    tab: 'mag ik verhuren?',
    vraag: 'mag ik mijn huis aan zee als vakantiewoning verhuren?',
    stappen: [
      { titel: 'regels voor jouw adres nagaan', badge: 'deze week' },
      { titel: 'registratie bij de bevoegde overheid' },
      { titel: 'brandveiligheidsattest laten opmaken' },
      { titel: 'verzekering voor verhuur aanpassen' },
    ],
  },
  {
    id: 'opstart',
    tab: 'hoe start ik?',
    vraag: 'het huis is klaar — hoe begin ik met verhuren?',
    stappen: [
      { titel: 'inrichting nalopen aan de hand van onze checklist', badge: 'deze week' },
      { titel: 'eerste listings aanmaken met echte foto’s en teksten' },
      { titel: 'schoonmaak en linnen afspreken met een lokale partner' },
      { titel: 'prijzen zetten voor je eerste drie maanden' },
    ],
  },
  {
    id: 'website',
    tab: 'eigen boekingssite?',
    vraag: 'ik wil rechtstreekse boekingen via een eigen website.',
    stappen: [
      { titel: 'domeinnaam en hosting op jouw naam', badge: 'deze week' },
      { titel: 'boekingswebsite in moroww-stijl laten opmaken' },
      { titel: 'betaalprovider kiezen en aansluiten' },
      { titel: 'je listings naar jouw site laten linken' },
    ],
  },
]

export function PlanWisselaar() {
  const [actief, setActief] = useState<string>(SCENARIOS[0].id)
  const scenario = SCENARIOS.find((s) => s.id === actief) ?? SCENARIOS[0]

  return (
    <div className="adv-planwissel">
      <div className="adv-planwissel-tabs" role="tablist" aria-label="Kies een voorbeeld">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={s.id === actief}
            aria-controls={`plan-paneel-${s.id}`}
            id={`plan-tab-${s.id}`}
            className={`adv-planwissel-tab ${s.id === actief ? 'adv-planwissel-tab-actief' : ''}`}
            onClick={() => setActief(s.id)}
          >
            {s.tab}
          </button>
        ))}
      </div>

      <div
        key={scenario.id}
        id={`plan-paneel-${scenario.id}`}
        role="tabpanel"
        aria-labelledby={`plan-tab-${scenario.id}`}
        className="adv-planwissel-paneel"
      >
        <h3 className="adv-planwissel-vraag">{scenario.vraag}</h3>
        <ol className="adv-genummerd" aria-label="Stappen in dit voorbeeld-plan">
          {scenario.stappen.map((stap, i) => (
            <li key={stap.titel}>
              <span className="adv-nr">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h4
                  className="adv-vraag"
                  style={{ fontSize: 'clamp(1.125rem, 1.8vw, 1.5rem)' }}
                >
                  {stap.titel}
                </h4>
                {stap.badge && (
                  <p
                    className="adv-genummerd-tekst"
                    style={{ color: 'var(--accent)', marginTop: 8 }}
                  >
                    {stap.badge}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
        <p className="adv-prose" style={{ marginTop: 32 }}>
          <em>wie</em> jij, een partner of wij. <em>wanneer</em> per stap een datum.{' '}
          <em>wat het kost</em> vooraf, per stap.
        </p>
      </div>
    </div>
  )
}
