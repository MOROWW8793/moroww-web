// Verplicht blok onderaan elke kennispagina. Een autoriteitspagina zonder
// datum wordt binnen achttien maanden je grootste geloofwaardigheidsrisico
// (kennisbank-v1, sectie 0.3).

interface Props {
  /** Datum in NL-formaat, bv. '19 augustus 2026'. */
  nagekekenOp: string
  /** Vrije bronvermelding, mag markup-vrij zijn. */
  bron?: string
  /** Volledige URL naar de bron. */
  bronUrl?: string
}

export function Actualiteitsblok({ nagekekenOp, bron, bronUrl }: Props) {
  return (
    <aside className="mt-16 border-t border-moroww-brown/20 pt-8 text-sm text-moroww-dark/70 leading-relaxed">
      <p className="font-semibold text-moroww-dark">Nagekeken op {nagekekenOp}</p>
      {bron && (
        <p className="mt-1">
          Bron:{' '}
          {bronUrl ? (
            <a href={bronUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-moroww-dark">
              {bron}
            </a>
          ) : (
            bron
          )}
        </p>
      )}
      <p className="mt-3">
        moroww kijkt deze pagina elk kwartaal na. Klopt er iets niet meer?
        Laat het weten via{' '}
        <a href="mailto:info@moroww.com" className="underline underline-offset-2 hover:text-moroww-dark">info@moroww.com</a>
        {' '}en we passen het aan.
      </p>
    </aside>
  )
}
