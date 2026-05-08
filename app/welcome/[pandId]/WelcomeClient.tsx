'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Phone, Wifi, LogIn, LogOut, Copy, Check, MapPin, Globe } from 'lucide-react'

type Lang = 'nl' | 'fr' | 'en'

type WelcomePage = {
  pand_id: string
  welkomstbericht_nl: string; welkomstbericht_fr: string; welkomstbericht_en: string
  checkin_tijd: string; checkout_tijd: string
  wifi_naam: string; wifi_wachtwoord: string
  noodcontact_naam: string; noodcontact_telefoon: string
  slot_instructies_nl: string; slot_instructies_fr: string; slot_instructies_en: string
  huisregels_nl: string; huisregels_fr: string; huisregels_en: string
  handleiding_nl: string; handleiding_fr: string; handleiding_en: string
}

type Tip = {
  id: string
  categorie: string
  naam: string
  beschrijving_nl: string; beschrijving_fr: string; beschrijving_en: string
  adres: string; website: string
}

const LANG_LABELS: Record<Lang, string> = { nl: 'NL', fr: 'FR', en: 'EN' }

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  async function copy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy} className="ml-2 text-moroww-orange/70 hover:text-moroww-orange transition-colors">
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  )
}

function FormattedText({ text }: { text: string }) {
  if (!text) return null

  const lines = text.split(/(?=\b[A-Z]{2,}[A-Z\s]+ - )/)

  if (lines.length <= 1) {
    const sentences = text.split('\n').filter(Boolean)
    return (
      <div className="space-y-2">
        {sentences.map((sentence, i) => (
          <p key={i} className="text-moroww-black/70 text-sm leading-relaxed">
            {sentence}
          </p>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {lines.filter(Boolean).map((section, i) => {
        const dashIndex = section.indexOf(' - ')
        if (dashIndex === -1) return (
          <p key={i} className="text-moroww-black/70 text-sm leading-relaxed">
            {section}
          </p>
        )
        const title = section.slice(0, dashIndex)
        const content = section.slice(dashIndex + 3)
        return (
          <div key={i}>
            <p className="font-semibold text-moroww-black text-sm mb-1">
              {title}
            </p>
            <p className="text-moroww-black/70 text-sm leading-relaxed">
              {content}
            </p>
          </div>
        )
      })}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="font-bold text-moroww-black text-lg mb-4 tracking-[-0.01em]">{title}</h2>
      {children}
    </section>
  )
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl p-5 shadow-sm ${className}`}>{children}</div>
  )
}

export function WelcomeClient({ page, tips, pandNaam }: { page: WelcomePage; tips: Tip[]; pandNaam: string }) {
  const [lang, setLang] = useState<Lang>('nl')

  function t(field: string) {
    return (page as Record<string, string>)[`${field}_${lang}`] || (page as Record<string, string>)[`${field}_nl`] || ''
  }

  const tipsByCategorie = tips.reduce<Record<string, Tip[]>>((acc, tip) => {
    if (!acc[tip.categorie]) acc[tip.categorie] = []
    acc[tip.categorie].push(tip)
    return acc
  }, {})

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: 'url(/images/gradient-1.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-xl mx-auto px-5 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Image src="/images/logo.png" alt="moroww" width={90} height={24} className="h-6 w-auto" />
          {/* Lang switcher */}
          <div className="flex gap-1">
            {(['nl', 'fr', 'en'] as Lang[]).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                  lang === l
                    ? 'bg-moroww-black text-white'
                    : 'text-moroww-black/50 hover:text-moroww-black'
                }`}
              >
                {LANG_LABELS[l]}
              </button>
            ))}
          </div>
        </div>

        {/* Welkom */}
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-widest text-[#C08D6E] mb-2">
            moroww
          </p>
          <h1 className="font-bold text-moroww-black text-3xl leading-tight tracking-[-0.02em] mb-4">
            Welkom in {pandNaam}.
          </h1>
          {t('welkomstbericht') && (
            <p className="text-moroww-black/65 leading-relaxed" style={{ fontSize: 16 }}>
              {t('welkomstbericht')}
            </p>
          )}
        </div>

        {/* Info grid */}
        <Section title="Praktische info">
          <div className="space-y-3">
            {(page.checkin_tijd || page.checkout_tijd) && (
              <Card>
                <div className="flex gap-6">
                  {page.checkin_tijd && (
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-moroww-blush flex items-center justify-center shrink-0">
                        <LogIn size={15} className="text-moroww-orange" />
                      </div>
                      <div>
                        <p className="text-xs text-moroww-black/40 uppercase tracking-widest font-medium">Check-in</p>
                        <p className="font-semibold text-moroww-black">Vanaf {page.checkin_tijd}</p>
                      </div>
                    </div>
                  )}
                  {page.checkout_tijd && (
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-moroww-blush flex items-center justify-center shrink-0">
                        <LogOut size={15} className="text-moroww-orange" />
                      </div>
                      <div>
                        <p className="text-xs text-moroww-black/40 uppercase tracking-widest font-medium">Checkout</p>
                        <p className="font-semibold text-moroww-black">Voor {page.checkout_tijd}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {(page.wifi_naam || page.wifi_wachtwoord) && (
              <Card>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-moroww-blush flex items-center justify-center shrink-0 mt-0.5">
                    <Wifi size={15} className="text-moroww-orange" />
                  </div>
                  <div>
                    <p className="text-xs text-moroww-black/40 uppercase tracking-widest font-medium mb-1">Wifi</p>
                    <p className="text-sm text-moroww-black">
                      <span className="font-medium">{page.wifi_naam}</span>
                      <CopyButton text={page.wifi_naam} />
                    </p>
                    <p className="text-sm text-moroww-black/70 mt-0.5">
                      {page.wifi_wachtwoord}
                      <CopyButton text={page.wifi_wachtwoord} />
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {page.noodcontact_telefoon && (
              <Card>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-moroww-blush flex items-center justify-center shrink-0">
                    <Phone size={15} className="text-moroww-orange" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-moroww-black/40 uppercase tracking-widest font-medium mb-0.5">Noodcontact</p>
                    <p className="font-semibold text-moroww-black">{page.noodcontact_naam}</p>
                  </div>
                  <a
                    href={`tel:${page.noodcontact_telefoon}`}
                    className="rounded-full bg-moroww-orange text-white text-sm font-semibold px-4 py-2 hover:bg-moroww-orange-dark transition-colors"
                  >
                    Bellen
                  </a>
                </div>
              </Card>
            )}
          </div>
        </Section>

        {/* Slot instructies */}
        {t('slot_instructies') && (
          <Section title="Slotinstructies">
            <Card>
              <FormattedText text={t('slot_instructies')} />
            </Card>
          </Section>
        )}

        {/* Huisregels */}
        {t('huisregels') && (
          <Section title="Huisregels">
            <Card>
              <FormattedText text={t('huisregels')} />
            </Card>
          </Section>
        )}

        {/* Handleiding */}
        {t('handleiding') && (
          <Section title="Handleiding">
            <Card>
              <FormattedText text={t('handleiding')} />
            </Card>
          </Section>
        )}

        {/* Lokale tips */}
        {tips.length > 0 && (
          <Section title="Lokale tips">
            <div className="space-y-6">
              {Object.entries(tipsByCategorie).map(([categorie, catTips]) => (
                <div key={categorie}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#C08D6E] mb-3">{categorie}</p>
                  <div className="space-y-3">
                    {catTips.map(tip => {
                      const desc = (tip as Record<string, string>)[`beschrijving_${lang}`] || tip.beschrijving_nl
                      return (
                        <Card key={tip.id}>
                          <p className="font-semibold text-moroww-black text-sm mb-1">{tip.naam}</p>
                          {desc && <p className="text-moroww-black/60 text-sm leading-relaxed mb-2">{desc}</p>}
                          <div className="flex flex-wrap gap-3 mt-2">
                            {tip.adres && (
                              <span className="flex items-center gap-1 text-xs text-moroww-black/40">
                                <MapPin size={11} />
                                {tip.adres}
                              </span>
                            )}
                            {tip.website && (
                              <a
                                href={tip.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-xs text-moroww-orange hover:underline"
                              >
                                <Globe size={11} />
                                Website
                              </a>
                            )}
                          </div>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-moroww-black/10 text-center">
          <Image src="/images/logo.png" alt="moroww" width={80} height={22} className="h-5 w-auto mx-auto mb-3 opacity-40" />
          <p className="text-xs text-moroww-black/30">Een kwaliteitslabel voor vakantiewoningen</p>
        </div>
      </div>
    </div>
  )
}
