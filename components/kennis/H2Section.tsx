// H2 met hairline erboven in het prose-kennis-raster.
//
// Vroeger rendered dit component ook een .sectie-label als eyebrow, maar
// dat label was op elke kennispagina een letterlijke herhaling van de H2.
// Nu alleen hairline + h2 — de scheiding is de hairline, de kop is de h2.

export function H2Section({ titel }: { titel: string }) {
  return (
    <>
      <hr className="sectie-hairline" aria-hidden />
      <h2>{titel}</h2>
    </>
  )
}
