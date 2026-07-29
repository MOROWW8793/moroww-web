import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'moroww-os — moroww',
  robots: { index: false, follow: false },
}

export default async function MorowwOsStub({
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
          moroww-os
        </h1>
        <p className="text-lg text-[#6B6B6B] leading-relaxed">
          [TODO: WP6 — het systeem dat het huis bestuurt: slot, licht, warmte,
          muziek, geur, geluidsgrens, lekdetectie. Orchestration loop van boeking
          tot review.]
        </p>
      </div>
    </main>
  )
}
