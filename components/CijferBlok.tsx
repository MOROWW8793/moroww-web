// De publieke cijferzin op /de-standaard en /kennis/waarom-vakantiewoningen-afvallen.
// Één component om te garanderen dat beide plekken exact dezelfde formulering en
// bron gebruiken.
//
// Bij data=null (view onbereikbaar): toont de zin zonder getallen in plaats van
// een nul of placeholder. Nooit "0 woningen bezocht" — dat zou een echt cijfer
// suggereren dat er geen keuring is geweest, wat de kern van het label ondermijnt.

import { AuditLijn } from '@/components/AuditLijn'
import { formatBijgewerktMaand, type ScreeningsPubliek } from '@/lib/screenings'

interface Props {
  data: ScreeningsPubliek | null
}

export function CijferBlok({ data }: Props) {
  if (!data) {
    return (
      <div className="max-w-[62ch]">
        <AuditLijn density="quiet" items={['de cijfers']} />
        <p className="mt-mw-5 text-body text-moroww-ink-2">
          Cijfers uit het moroww-systeem, bijgewerkt bij elke keuring.
          Ze zijn nu even niet bereikbaar — probeer later opnieuw.
        </p>
      </div>
    )
  }

  const maand = formatBijgewerktMaand(data.bijgewerkt_op)
  return (
    <div className="max-w-[62ch]">
      <AuditLijn
        density="quiet"
        items={['de cijfers', maand ? `bijgewerkt ${maand}` : '']}
      />
      <div className="mt-mw-5">
        <h2 className="text-h2 text-moroww-dark">
          {data.aantal_bezoek} woningen bezocht
        </h2>
        <hr
          className="my-mw-5 border-0 border-t border-moroww-rule"
          aria-hidden
        />
        <h2 className="text-h2 text-moroww-dark">
          {data.aantal_opgenomen} opgenomen
        </h2>
      </div>
      <p className="mt-mw-5 text-body text-moroww-ink-2">
        Daarvoor lagen er {data.aantal_dossier} dossiers op tafel. Cijfers uit
        het moroww-systeem, bijgewerkt bij elke keuring.
      </p>
    </div>
  )
}
