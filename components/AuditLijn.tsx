// De signatuur van moroww. Bouwspec sectie 1.
//
// Een hairline in --moroww-label met daaronder metadata in kleine kapitalen.
// Geen decoratie: de lijn draagt altijd echte gegevens uit het systeem.
//
// - density 'quiet' (gastenkant): alleen een lijn erboven, één regel eronder.
// - density 'structural' (eigenaarskant): lijn erboven én eronder.
//
// De lijn mag nooit decoratief zijn. Aanroepen zonder items, met een lege
// array of met lege strings gooit in ontwikkeling een fout; in productie
// rendert het component niets. Zo kan er nooit een "mooie" lijn met verzonnen
// tekst op een pagina belanden.

import React from 'react'

interface Props {
  items: string[]
  density: 'quiet' | 'structural'
}

export function AuditLijn({ items, density }: Props) {
  const invalid =
    !Array.isArray(items) ||
    items.length === 0 ||
    items.some((it) => typeof it !== 'string' || it.trim() === '')

  if (invalid) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(
        '[AuditLijn] items is verplicht en mag geen lege waarden bevatten. ' +
          'De lijn mag nooit decoratief zijn — zet er echte data uit het systeem in.',
      )
    }
    return null
  }

  const text = items.join(' · ')

  return (
    <div className="w-full">
      <hr className="border-0 border-t border-moroww-label" aria-hidden />
      <p className="mt-3 text-audit uppercase text-moroww-ink-2">{text}</p>
      {density === 'structural' && (
        <hr className="mt-3 border-0 border-t border-moroww-label" aria-hidden />
      )}
    </div>
  )
}
