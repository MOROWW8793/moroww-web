// Registerwissel per pagina. Bouwspec sectie 3.
//
// Zelfde tokens, zelfde componenten — ander ritme. Het verschil zit in de
// achtergrondkleur, de sectie-afstanden en de regelbreedte. Alle waarden
// komen uit de tokens; deze wrapper zet ze via CSS-vars en één achtergrond.
//
// Voor kinderen die het ritme willen aannemen: gebruik
//   padding: var(--register-space-section)
//   gap: var(--register-space-inner)
//   maxWidth: var(--register-max-width)
// Componenten die dat nog niet doen blijven werken; ze passen zich alleen
// visueel niet aan het register aan — dat is de volgende iteratie.

import type { CSSProperties, ReactNode } from 'react'

interface Props {
  kant: 'gast' | 'eigenaar'
  children: ReactNode
}

export function Register({ kant, children }: Props) {
  const isGast = kant === 'gast'

  const style = {
    '--register-space-section': isGast ? 'var(--space-12)' : 'var(--space-8)',
    '--register-space-inner':   isGast ? 'var(--space-6)'  : 'var(--space-4)',
    '--register-max-width':     isGast ? '52ch'            : '68ch',
  } as CSSProperties

  return (
    <div
      data-register={kant}
      className={isGast ? 'bg-moroww-blush' : 'bg-moroww-paper'}
      style={style}
    >
      {children}
    </div>
  )
}
