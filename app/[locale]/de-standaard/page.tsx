import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'de standaard — moroww',
  robots: { index: false, follow: false },
}

export default async function DeStandaardPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-4xl md:text-5xl lowercase font-serif mb-8">
          de standaard
        </h1>
        <p className="text-lg text-[#6B6B6B] leading-relaxed">
          [TODO: WP4 — vier poorten, 350 bekeken · 7 opgenomen, fysieke audit,
          jaarlijkse heraudit, uitsluitingsclausule]
        </p>
      </div>
    </main>
  )
}
