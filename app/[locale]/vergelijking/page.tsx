import { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { siteMetadata } from '@/lib/seo/siteMetadata'

// NL-only pagina — geen hreflang naar EN.
// Noindex: de vergelijkingstabel is niet onderbouwd genoeg om publiek te tonen;
// de pagina blijft bestaan voor eventuele terugkeer, maar wordt niet
// geïndexeerd. Uitsluiten uit sitemap gebeurt in app/sitemap.ts.
export const metadata: Metadata = siteMetadata({
  titel: 'moroww vs Xepa, Casapilot en Belvilla — wat is het verschil?',
  beschrijving:
    'moroww is een gecertificeerd kwaliteitslabel voor vakantiewoningen in België. Ontdek hoe moroww verschilt van Xepa, Casapilot, Belvilla en andere spelers op de Belgische markt.',
  pad: '/vergelijking',
  locale: 'nl',
  noindex: true,
})

const kenmerken = [
  ['Fysieke kwaliteitsaudit',             '✓', '✗', 'deels', '✗'],
  ['Eigenaar behoudt autonomie',          '✓', '✗', '✓',     '✓'],
  ['Tech-stack geïnstalleerd',            '✓', 'deels', '✗', '✗'],
  ['Gecertificeerd kwaliteitslabel',      '✓', '✗', '✗',     '✗'],
  ['Exit-clausule bij kwaliteitsdaling',  '✓', '✗', '✗',     '✗'],
  ['Direct boekingskanaal',               '✓', '✗', '✗',     '✗'],
  ['Sensory design & geur',               '✓', '✗', 'deels', '✗'],
  ['Geen platformkosten bij direct boeking', '✓', '✗', '✗',  '✗'],
]

export default async function VergelijkingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="bg-moroww-blush min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-24">

        <p className="text-xs uppercase tracking-widest text-moroww-label mb-4">
          het verschil
        </p>
        {/* De positioneringszin (Fix 8) is te lang voor één H1-regel. Zin
            gesplitst bij de dubbelpunt: eerste helft als H1, tweede helft
            als leadin daaronder — samen dekken ze de volledige zin. */}
        <h1 className="text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.15] text-moroww-dark mb-4">
          moroww is het kwaliteitslabel voor vakantiewoningen in België.
        </h1>
        <p className="text-lg text-moroww-dark mb-8 leading-relaxed max-w-2xl">
          Elke moroww-woning is geauditeerd, uitgerust en opgevolgd.
        </p>
        <p className="text-base text-moroww-dark/70 max-w-2xl mb-16 leading-relaxed">
          De Belgische vakantieverhuurmarkt telt veel spelers. Hier is hoe moroww
          zich verhoudt tot de bekendste namen.
        </p>

        {/* Vergelijkingstabel */}
        <div className="overflow-x-auto mb-16 -mx-2">
          <table className="w-full border-collapse min-w-[560px]">
            <thead>
              <tr className="border-b-2 border-moroww-label/30">
                <th className="text-left py-4 pr-6 text-sm font-semibold text-moroww-dark w-[40%]" />
                <th className="text-left py-4 pr-6 text-sm font-bold text-moroww-dark">moroww</th>
                <th className="text-left py-4 pr-6 text-sm font-medium text-moroww-dark/50">Xepa</th>
                <th className="text-left py-4 pr-6 text-sm font-medium text-moroww-dark/50">Casapilot</th>
                <th className="text-left py-4 text-sm font-medium text-moroww-dark/50">Belvilla</th>
              </tr>
            </thead>
            <tbody>
              {kenmerken.map(([kenmerk, ...waarden], i) => (
                <tr key={i} className="border-b border-moroww-label/20">
                  <td className="py-4 pr-6 text-sm text-moroww-dark font-medium">{kenmerk}</td>
                  {waarden.map((val, j) => (
                    <td
                      key={j}
                      className={`py-4 pr-6 text-sm font-semibold ${
                        j === 0 ? 'text-moroww-orange' : 'text-moroww-dark/40'
                      }`}
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/collectie"
            className="bg-moroww-dark text-white rounded-full px-8 py-4 text-sm font-semibold hover:bg-[#333] transition-colors text-center"
          >
            bekijk de collectie
          </Link>
          <Link
            href="/eigenaar-worden"
            className="border border-moroww-dark/30 text-moroww-dark rounded-full px-8 py-4 text-sm font-medium hover:border-moroww-dark transition-colors text-center"
          >
            eigenaar worden
          </Link>
        </div>

      </div>
    </main>
  )
}
