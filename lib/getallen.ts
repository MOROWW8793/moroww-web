// Cijfers als woorden voor lopende tekst en meta. 1 tot 20 worden voluit
// geschreven; boven de twintig valt de helper terug op de digit-representatie.
// Reden: cijfers midden in een zin lezen prima; cijfers aan het begin van
// een zin voelen als koppen, en de merk-toon van moroww is "geen koppen zonder
// woorden". De helper laat de caller kiezen of het eerste teken hoofdletter
// moet krijgen — de meeste callsites gebruiken hem aan het zinsbegin.

const NL_WOORDEN: readonly string[] = [
  'nul', 'één', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht',
  'negen', 'tien', 'elf', 'twaalf', 'dertien', 'veertien', 'vijftien',
  'zestien', 'zeventien', 'achttien', 'negentien', 'twintig',
]

const EN_WOORDEN: readonly string[] = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
  'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
  'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty',
]

export function countWord(
  n: number,
  locale: 'nl' | 'en',
  capitalize = false,
): string {
  const table = locale === 'nl' ? NL_WOORDEN : EN_WOORDEN
  const word = n >= 0 && n <= 20 ? table[n] : String(n)
  if (!capitalize) return word
  // Nederlands "één" (accenten op beide e's) wordt aan zinsbegin "Eén":
  // hoofdletter E zonder accent, tweede é blijft. `.toUpperCase()` op de
  // eerste é zou "Één" produceren en dat willen we niet.
  if (locale === 'nl' && word === 'één') return 'Eén'
  return word.charAt(0).toUpperCase() + word.slice(1)
}
