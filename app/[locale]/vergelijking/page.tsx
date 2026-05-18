import { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'moroww vs Xepa, Casapilot en Belvilla — wat is het verschil?',
  description:
    'moroww is een gecertificeerd kwaliteitslabel voor vakantiewoningen in België. Ontdek hoe moroww verschilt van Xepa, Casapilot, Belvilla en andere spelers op de Belgische markt.',
  keywords: [
    'moroww vs Xepa',
    'moroww vs Casapilot',
    'moroww vs Belvilla',
    'alternatief Xepa België',
    'alternatief Casapilot',
    'alternatief Belvilla hosts',
    'kwaliteitslabel vakantiewoning België',
    'gecertificeerde vakantiewoning',
  ],
  alternates: {
    canonical: 'https://www.moroww.com/vergelijking',
  },
}

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
    <main className="bg-[#FAE4D6] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-24">

        <p className="text-xs uppercase tracking-widest text-[#C08D6E] mb-4">
          het verschil
        </p>
        <h1 className="text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.1] text-[#1A1A1A] mb-6">
          moroww is geen beheerder.<br />
          <span className="font-light">geen platform. een label.</span>
        </h1>
        <p className="text-lg text-[#1A1A1A]/70 max-w-2xl mb-16 leading-relaxed">
          De Belgische vakantieverhuurmarkt telt veel spelers. Hier is hoe moroww
          zich verhoudt tot de bekendste namen.
        </p>

        {/* Vergelijkingstabel */}
        <div className="overflow-x-auto mb-16 -mx-2">
          <table className="w-full border-collapse min-w-[560px]">
            <thead>
              <tr className="border-b-2 border-[#C08D6E]/30">
                <th className="text-left py-4 pr-6 text-sm font-semibold text-[#1A1A1A] w-[40%]" />
                <th className="text-left py-4 pr-6 text-sm font-bold text-[#1A1A1A]">moroww</th>
                <th className="text-left py-4 pr-6 text-sm font-medium text-[#1A1A1A]/50">Xepa</th>
                <th className="text-left py-4 pr-6 text-sm font-medium text-[#1A1A1A]/50">Casapilot</th>
                <th className="text-left py-4 text-sm font-medium text-[#1A1A1A]/50">Belvilla</th>
              </tr>
            </thead>
            <tbody>
              {kenmerken.map(([kenmerk, ...waarden], i) => (
                <tr key={i} className="border-b border-[#C08D6E]/20">
                  <td className="py-4 pr-6 text-sm text-[#1A1A1A] font-medium">{kenmerk}</td>
                  {waarden.map((val, j) => (
                    <td
                      key={j}
                      className={`py-4 pr-6 text-sm font-semibold ${
                        j === 0 ? 'text-[#FEA05E]' : 'text-[#1A1A1A]/40'
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
            className="bg-[#1A1A1A] text-white rounded-full px-8 py-4 text-sm font-semibold hover:bg-[#333] transition-colors text-center"
          >
            bekijk de collectie
          </Link>
          <Link
            href="/eigenaar-worden"
            className="border border-[#1A1A1A]/30 text-[#1A1A1A] rounded-full px-8 py-4 text-sm font-medium hover:border-[#1A1A1A] transition-colors text-center"
          >
            eigenaar worden
          </Link>
        </div>

      </div>
    </main>
  )
}
