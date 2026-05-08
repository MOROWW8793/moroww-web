'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Phone, Wifi, LogIn, LogOut, Copy, Check, MapPin, Globe } from 'lucide-react'

type Lang = 'nl' | 'fr' | 'en'

type WelcomePage = Record<string, string>

type Tip = {
  id: string
  categorie: string
  naam: string
  beschrijving_nl: string; beschrijving_fr: string; beschrijving_en: string
  adres: string; website: string
}

const LANG_LABELS: Record<Lang, string> = { nl: 'NL', fr: 'FR', en: 'EN' }

const BOEK_URLS: Record<string, string> = {
  'nosso-knokke':       'https://book.moroww.com/nl/properties/698c63ff3d9a2d0013fefd72?minOccupancy=1',
  'ann-helena-ursel':   'https://book.moroww.com/nl/properties/696b49bf47f69b0013026516?minOccupancy=1',
  'moroww-oostende':    'https://book.moroww.com/nl/properties/695140859e91eb0014db3eb1?minOccupancy=1',
  'cozy-relax-beernem': 'https://book.moroww.com/nl/properties/690781db69d1700012bf6dd3?minOccupancy=1',
}

const CTA_TEXT = {
  title:  { nl: 'Wil je terugkomen?',                                   fr: 'Vous souhaitez revenir?',                                    en: 'Want to come back?' },
  sub:    { nl: 'Boek je volgende verblijf rechtstreeks via moroww.',    fr: 'Réservez votre prochain séjour directement via moroww.',     en: 'Book your next stay directly through moroww.' },
  button: { nl: 'Boek direct',                                           fr: 'Réserver',                                                   en: 'Book now' },
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  async function copy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy} className="ml-2 text-moroww-orange/70 hover:text-moroww-orange transition-colors shrink-0">
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 48 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#1A1A1A', letterSpacing: '-0.01em' }}>
        {title}
      </h2>
      {children}
    </section>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', borderRadius: 16, padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
      {children}
    </div>
  )
}

function FormattedText({ text }: { text: string }) {
  if (!text) return null

  // Splits op patronen zoals "WOORD - " of "WOORD & WOORD - "
  // Werkt voor NL (VERWARMING), FR (CHAUFFAGE), EN (HEATING)
  const sectionRegex = /(?=\b[A-ZÀÂÇÉÈÊËÎÏÔÙÛÜŸÆŒ][A-ZÀÂÇÉÈÊËÎÏÔÙÛÜŸÆŒ\s&]+\s+-\s)/
  const lines = text.split(sectionRegex).filter(Boolean)

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
        const title = section.slice(0, dashIndex).trim()
        const content = section.slice(dashIndex + 3).trim()
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

// ── Main component ───────────────────────────────────────────────────────────

export function WelcomeClient({
  page, tips, pandNaam, pandId,
}: {
  page: WelcomePage
  tips: Tip[]
  pandNaam: string
  pandId: string
}) {
  const [lang, setLang] = useState<Lang>('nl')

  function t(field: string) {
    return page[`${field}_${lang}`] || page[`${field}_nl`] || ''
  }

  const boekUrl = BOEK_URLS[pandId] ?? 'https://book.moroww.com'

  const tipsByCategorie = tips.reduce<Record<string, Tip[]>>((acc, tip) => {
    if (!acc[tip.categorie]) acc[tip.categorie] = []
    acc[tip.categorie].push(tip)
    return acc
  }, {})

  return (
    <div
      style={{
        backgroundImage: 'url(/images/gradient-1.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '40px 20px 80px' }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
          <Image src="/images/logo.png" alt="moroww" width={90} height={24} className="h-6 w-auto" />
          <div style={{ display: 'flex', gap: 4 }}>
            {(['nl', 'fr', 'en'] as Lang[]).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  fontSize: 12, fontWeight: 600, padding: '6px 12px',
                  borderRadius: 100, border: 'none', cursor: 'pointer',
                  background: lang === l ? '#1A1A1A' : 'transparent',
                  color: lang === l ? '#fff' : 'rgba(26,26,26,0.45)',
                  transition: 'all 0.15s',
                }}
              >
                {LANG_LABELS[l]}
              </button>
            ))}
          </div>
        </div>

        {/* ── Welkom hero ── */}
        <div style={{ marginBottom: 8 }}>
          <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, color: '#C08D6E', marginBottom: 10 }}>
            moroww
          </p>
          <h1 style={{ fontSize: 'clamp(28px,6vw,40px)', fontWeight: 800, color: '#1A1A1A', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 20 }}>
            Welkom in {pandNaam}.
          </h1>
          {t('welkomstbericht') && (
            <Card>
              <p style={{ color: 'rgba(26,26,26,0.65)', fontSize: 16, lineHeight: 1.7 }}>
                {t('welkomstbericht')}
              </p>
            </Card>
          )}
        </div>

        {/* ── Praktische info ── */}
        <Section title="Praktische info">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

            {/* Check-in / checkout */}
            {(page.checkin_tijd || page.checkout_tijd) && (
              <Card>
                <div style={{ display: 'flex', gap: 32 }}>
                  {page.checkin_tijd && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#FAE4D6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <LogIn size={15} className="text-moroww-orange" />
                      </div>
                      <div>
                        <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, color: 'rgba(26,26,26,0.4)', fontWeight: 600, marginBottom: 2 }}>Check-in</p>
                        <p style={{ fontWeight: 700, color: '#1A1A1A', fontSize: 15 }}>Vanaf {page.checkin_tijd}</p>
                      </div>
                    </div>
                  )}
                  {page.checkout_tijd && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#FAE4D6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <LogOut size={15} className="text-moroww-orange" />
                      </div>
                      <div>
                        <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, color: 'rgba(26,26,26,0.4)', fontWeight: 600, marginBottom: 2 }}>Checkout</p>
                        <p style={{ fontWeight: 700, color: '#1A1A1A', fontSize: 15 }}>Voor {page.checkout_tijd}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Wifi */}
            {(page.wifi_naam || page.wifi_wachtwoord) && (
              <Card>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#FAE4D6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Wifi size={15} className="text-moroww-orange" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, color: 'rgba(26,26,26,0.4)', fontWeight: 600, marginBottom: 6 }}>Wifi</p>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, color: '#1A1A1A', fontSize: 15 }}>{page.wifi_naam}</span>
                      <CopyButton text={page.wifi_naam} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: 4 }}>
                      <span style={{ color: 'rgba(26,26,26,0.6)', fontSize: 14 }}>{page.wifi_wachtwoord}</span>
                      <CopyButton text={page.wifi_wachtwoord} />
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Noodcontact */}
            {page.noodcontact_telefoon && (
              <Card>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#FAE4D6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={15} className="text-moroww-orange" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, color: 'rgba(26,26,26,0.4)', fontWeight: 600, marginBottom: 2 }}>Noodcontact</p>
                    <p style={{ fontWeight: 700, color: '#1A1A1A', fontSize: 15 }}>{page.noodcontact_naam}</p>
                  </div>
                  <a
                    href={`tel:${page.noodcontact_telefoon}`}
                    style={{ background: '#FEA05E', color: '#fff', borderRadius: 100, padding: '10px 20px', fontWeight: 700, fontSize: 14, textDecoration: 'none', flexShrink: 0 }}
                  >
                    Bellen
                  </a>
                </div>
              </Card>
            )}
          </div>
        </Section>

        {/* ── Slot instructies ── */}
        {t('slot_instructies') && (
          <Section title="Slotinstructies">
            <Card>
              <FormattedText text={t('slot_instructies')} />
            </Card>
          </Section>
        )}

        {/* ── Huisregels ── */}
        {t('huisregels') && (
          <Section title="Huisregels">
            <Card>
              <FormattedText text={t('huisregels')} />
            </Card>
          </Section>
        )}

        {/* ── Handleiding ── */}
        {t('handleiding') && (
          <Section title="Handleiding">
            <Card>
              <FormattedText text={t('handleiding')} />
            </Card>
          </Section>
        )}

        {/* ── Lokale tips ── */}
        {tips.length > 0 && (
          <Section title="Lokale tips">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {Object.entries(tipsByCategorie).map(([categorie, catTips]) => (
                <div key={categorie}>
                  <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#C08D6E', marginBottom: 10 }}>
                    {categorie}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {catTips.map(tip => {
                      const desc = (tip as Record<string, string>)[`beschrijving_${lang}`] || tip.beschrijving_nl
                      return (
                        <Card key={tip.id}>
                          <p style={{ fontWeight: 700, color: '#1A1A1A', fontSize: 15, marginBottom: 4 }}>{tip.naam}</p>
                          {desc && <p style={{ color: 'rgba(26,26,26,0.6)', fontSize: 14, lineHeight: 1.6, marginBottom: 8 }}>{desc}</p>}
                          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                            {tip.adres && (
                              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'rgba(26,26,26,0.4)' }}>
                                <MapPin size={11} />
                                {tip.adres}
                              </span>
                            )}
                            {tip.website && (
                              <a href={tip.website} target="_blank" rel="noopener noreferrer"
                                style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#FEA05E', textDecoration: 'none' }}>
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

        {/* UPSELL SECTIE - activeren wanneer klaar
        <section style={{ padding: '40px 24px', background: '#FAE4D6', borderRadius: 16, marginTop: 48 }}>
          <p style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 2, color: '#C08D6E', marginBottom: 8 }}>
            moroww marketplace
          </p>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
            De sfeer van je verblijf, mee naar huis.
          </h2>
          <p style={{ color: '#555', marginBottom: 24 }}>
            De producten die je in deze woning gebruikt, zijn beschikbaar via de moroww marketplace.
          </p>
          <a href="https://www.moroww.com/marketplace"
            style={{ background: '#FEA05E', color: 'white', padding: '12px 24px', borderRadius: 100, textDecoration: 'none', fontWeight: 600 }}>
            Ontdek de collectie
          </a>
        </section>
        */}

        {/* ── CTA ── */}
        <section style={{ marginTop: 48, background: '#1A1A1A', borderRadius: 24, padding: '40px 28px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 12 }}>
            {CTA_TEXT.title[lang]}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.6, marginBottom: 28, maxWidth: 320, margin: '0 auto 28px' }}>
            {CTA_TEXT.sub[lang]}
          </p>
          <a
            href={boekUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-block', background: '#FEA05E', color: '#fff', fontWeight: 700, fontSize: 16, padding: '14px 36px', borderRadius: 100, textDecoration: 'none' }}
          >
            {CTA_TEXT.button[lang]}
          </a>
        </section>

        {/* ── Footer ── */}
        <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(26,26,26,0.1)', textAlign: 'center' }}>
          <Image src="/images/logo.png" alt="moroww" width={80} height={22} className="h-5 w-auto mx-auto mb-3 opacity-40" />
          <p style={{ fontSize: 12, color: 'rgba(26,26,26,0.3)' }}>Een kwaliteitslabel voor vakantiewoningen</p>
        </div>

      </div>
    </div>
  )
}
