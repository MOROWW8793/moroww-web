// H2 met sidebar-label in het prose-kennis-raster.
//
// Rendert drie siblings binnen .prose-kennis:
//   .sectie-label      kleine kapitalen, sticky in kolom 1-3
//   .sectie-hairline   1px in --moroww-rule, kolom 1-10
//   h2                 hoofdkop in kolom 4-10
//
// De styling zit in globals.css .prose-kennis > * selectoren. Onder lg
// vervalt het raster en stapelen de siblings zoals normaal.

export function H2Section({ titel }: { titel: string }) {
  return (
    <>
      <p className="sectie-label">{titel}</p>
      <hr className="sectie-hairline" aria-hidden />
      <h2>{titel}</h2>
    </>
  )
}
