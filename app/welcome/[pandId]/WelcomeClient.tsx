'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Phone, Wifi, LogIn, LogOut, Copy, Check, MapPin, Globe, ChevronDown, Key, Car } from 'lucide-react'

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

const labels = {
  nl: {
    nu_nodig:     'Nu nodig',
    goed_te_weten:'Goed om te weten',
    checkin:      'Check-in',
    checkout:     'Checkout',
    wifi:         'Wifi',
    noodcontact:  'Noodcontact',
    slot:         'Toegang & slot',
    huisregels:   'Huisregels',
    handleiding:  'Handleiding',
    parkeren:     'Parkeren',
    tips:         'Lokale tips',
    cta_titel:    'Wil je terugkomen?',
    cta_sub:      'Boek je volgende verblijf rechtstreeks via moroww.',
    cta_knop:     'Boek direct',
  },
  fr: {
    nu_nodig:     'À l\'arrivée',
    goed_te_weten:'À savoir',
    checkin:      'Check-in',
    checkout:     'Check-out',
    wifi:         'Wifi',
    noodcontact:  'Contact d\'urgence',
    slot:         'Accès & clés',
    huisregels:   'Règles de la maison',
    handleiding:  'Guide pratique',
    parkeren:     'Parking',
    tips:         'Bons plans locaux',
    cta_titel:    'Vous souhaitez revenir?',
    cta_sub:      'Réservez votre prochain séjour directement via moroww.',
    cta_knop:     'Réserver',
  },
  en: {
    nu_nodig:     'On arrival',
    goed_te_weten:'Good to know',
    checkin:      'Check-in',
    checkout:     'Check-out',
    wifi:         'Wifi',
    noodcontact:  'Emergency contact',
    slot:         'Access & keys',
    huisregels:   'House rules',
    handleiding:  'House guide',
    parkeren:     'Parking',
    tips:         'Local tips',
    cta_titel:    'Want to come back?',
    cta_sub:      'Book your next stay directly through moroww.',
    cta_knop:     'Book now',
  },
}

// ── Helpers ──────────────────────────────────────────────────────────────────

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

function Card({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 16,
      padding: 20,
      boxShadow: accent ? '0 4px 20px rgba(254,160,94,0.12)' : '0 2px 12px rgba(0,0,0,0.06)',
      border: accent ? '1px solid rgba(254,160,94,0.18)' : 'none',
    }}>
      {children}
    </div>
  )
}

function ZoneLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
      letterSpacing: 2.5, color: '#C08D6E', marginBottom: 14,
    }}>
      {children}
    </p>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#1A1A1A', letterSpacing: '-0.01em' }}>
      {children}
    </h2>
  )
}

function renderLines(text: string, keyBase: string) {
  const lines = text.split('\n').filter(l => l.trim())
  const nodes: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    if (lines[i].startsWith('- ')) {
      const bulletLines: string[] = []
      const start = i
      while (i < lines.length && lines[i].startsWith('- ')) {
        bulletLines.push(lines[i].slice(2).trim())
        i++
      }
      nodes.push(
        <ul key={`${keyBase}-ul${start}`} style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {bulletLines.map((item, j) => (
            <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ color: '#C08D6E', flexShrink: 0, lineHeight: 1.6, userSelect: 'none' }} aria-hidden="true">–</span>
              <span className="text-moroww-black/70 text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      )
    } else {
      nodes.push(
        <p key={`${keyBase}-p${i}`} className="text-moroww-black/70 text-sm leading-relaxed">{lines[i]}</p>
      )
      i++
    }
  }

  return nodes
}

function FormattedText({ text }: { text: string }) {
  if (!text) return null
  const sectionRegex = /(?=\b[A-ZÀÂÇÉÈÊËÎÏÔÙÛÜŸÆŒ][A-ZÀÂÇÉÈÊËÎÏÔÙÛÜŸÆŒ\s&]+\s+-\s)/
  const sections = text.split(sectionRegex).filter(Boolean)

  if (sections.length <= 1) {
    return (
      <div className="space-y-2">
        {renderLines(text, 'root')}
      </div>
    )
  }
  return (
    <div className="space-y-4">
      {sections.map((section, i) => {
        const dashIndex = section.indexOf(' - ')
        if (dashIndex === -1) return (
          <div key={i} className="space-y-2">{renderLines(section, `s${i}`)}</div>
        )
        const title = section.slice(0, dashIndex).trim()
        const content = section.slice(dashIndex + 3).trim()
        return (
          <div key={i}>
            <p className="font-semibold text-moroww-black text-sm mb-1">{title}</p>
            <div className="space-y-2">{renderLines(content, `s${i}`)}</div>
          </div>
        )
      })}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function WelcomeClient({
  page, tips, pandNaam, pandId,
}: {
  page: WelcomePage
  tips: Tip[]
  pandNaam: string
  pandId: string
}) {
  const [lang, setLang] = useState<Lang>('nl')
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set())

  useEffect(() => {
    const bl = navigator.language.slice(0, 2).toLowerCase()
    if (bl === 'fr') setLang('fr')
    else if (bl === 'en') setLang('en')
  }, [])

  function t(field: string) {
    return page[`${field}_${lang}`] || page[`${field}_nl`] || ''
  }

  function toggleCategorie(cat: string) {
    setOpenCategories(prev => {
      const next = new Set(prev)
      if (next.has(cat)) { next.delete(cat) } else { next.add(cat) }
      return next
    })
  }

  const boekUrl = BOEK_URLS[pandId] ?? 'https://book.moroww.com/nl/properties?minOccupancy=1'
  const l = labels[lang] ?? labels.nl

  const tipsByCategorie = tips.reduce<Record<string, Tip[]>>((acc, tip) => {
    if (!acc[tip.categorie]) acc[tip.categorie] = []
    acc[tip.categorie].push(tip)
    return acc
  }, {})

  const hasNuNodig = t('slot_instructies') || page.wifi_naam || page.wifi_wachtwoord
  const hasGoed    = page.checkin_tijd || page.checkout_tijd || page.noodcontact_tel
                     || t('huisregels') || t('handleiding') || t('parkeren')

  // icon circle reused across zones
  const iconCircle = (icon: React.ReactNode) => (
    <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#FAE4D6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {icon}
    </div>
  )

  return (
    <div style={{ backgroundImage: 'url(/images/gradient-1.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '40px 20px 80px' }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
          <Image src="/images/logo.png" alt="moroww" width={90} height={24} className="h-6 w-auto" />
          <div style={{ display: 'flex', gap: 4 }}>
            {(['nl', 'fr', 'en'] as Lang[]).map(lg => (
              <button
                key={lg}
                onClick={() => setLang(lg)}
                style={{
                  fontSize: 12, fontWeight: 600, padding: '6px 12px',
                  borderRadius: 100, border: 'none', cursor: 'pointer',
                  background: lang === lg ? '#1A1A1A' : 'transparent',
                  color: lang === lg ? '#fff' : 'rgba(26,26,26,0.45)',
                  transition: 'all 0.15s',
                }}
              >
                {LANG_LABELS[lg]}
              </button>
            ))}
          </div>
        </div>

        {/* ── Welkom hero ── */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, color: '#C08D6E', marginBottom: 10 }}>
            moroww
          </p>
          <h1 style={{ fontSize: 'clamp(28px,6vw,40px)', fontWeight: 800, color: '#1A1A1A', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 28 }}>
            Welkom in {pandNaam}.
          </h1>

          {/* Certified badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#FAF7F5', borderRadius: 14, padding: '10px 16px 10px 10px', marginBottom: 32 }}>
            <div style={{ background: '#fff', borderRadius: 10, padding: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Image
                src="/images/Moroww_Certified_01_RGB.png"
                alt="moroww certified"
                width={80}
                height={80}
                style={{ width: 80, height: 80, objectFit: 'contain', display: 'block' }}
              />
            </div>
            <p style={{ fontSize: 13, color: '#C08D6E', lineHeight: 1.4, maxWidth: 220 }}>
              Dit verblijf is persoonlijk gekeurd door moroww.
            </p>
          </div>

          {/* Welkomsttekst */}
          {t('welkom') && (
            <p style={{ color: 'rgba(26,26,26,0.65)', fontSize: 16, lineHeight: 1.75, marginBottom: 0 }}>
              {t('welkom')}
            </p>
          )}
        </div>

        {/* ══════════════════════════════════════════
            Zone 1 — NU NODIG
        ══════════════════════════════════════════ */}
        {hasNuNodig && (
          <section style={{ marginTop: 56 }}>
            <ZoneLabel>{l.nu_nodig}</ZoneLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

              {/* Slotinstructies — hoogste prioriteit */}
              {t('slot_instructies') && (
                <Card accent>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                    {iconCircle(<Key size={15} className="text-moroww-orange" />)}
                    <p style={{ fontWeight: 700, color: '#1A1A1A', fontSize: 15, paddingTop: 8 }}>
                      {l.slot}
                    </p>
                  </div>
                  <FormattedText text={t('slot_instructies')} />
                </Card>
              )}

              {/* Wifi */}
              {(page.wifi_naam || page.wifi_wachtwoord) && (
                <Card>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    {iconCircle(<Wifi size={15} className="text-moroww-orange" />)}
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, color: 'rgba(26,26,26,0.4)', fontWeight: 600, marginBottom: 6 }}>{l.wifi}</p>
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
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════
            Zone 2 — GOED OM TE WETEN
        ══════════════════════════════════════════ */}
        {hasGoed && (
          <section style={{ marginTop: 72 }}>
            {/* Subtiele scheiding */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(26,26,26,0.08)' }} />
              <ZoneLabel>{l.goed_te_weten}</ZoneLabel>
              <div style={{ flex: 1, height: 1, background: 'rgba(26,26,26,0.08)' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

              {/* Check-in / checkout */}
              {(page.checkin_tijd || page.checkout_tijd) && (
                <Card>
                  <div style={{ display: 'flex', gap: 32 }}>
                    {page.checkin_tijd && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {iconCircle(<LogIn size={15} className="text-moroww-orange" />)}
                        <div>
                          <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, color: 'rgba(26,26,26,0.4)', fontWeight: 600, marginBottom: 2 }}>{l.checkin}</p>
                          <p style={{ fontWeight: 700, color: '#1A1A1A', fontSize: 15 }}>Vanaf {page.checkin_tijd}</p>
                        </div>
                      </div>
                    )}
                    {page.checkout_tijd && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {iconCircle(<LogOut size={15} className="text-moroww-orange" />)}
                        <div>
                          <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, color: 'rgba(26,26,26,0.4)', fontWeight: 600, marginBottom: 2 }}>{l.checkout}</p>
                          <p style={{ fontWeight: 700, color: '#1A1A1A', fontSize: 15 }}>Voor {page.checkout_tijd}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {/* Noodcontact */}
              {page.noodcontact_tel && (
                <Card>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {iconCircle(<Phone size={15} className="text-moroww-orange" />)}
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, color: 'rgba(26,26,26,0.4)', fontWeight: 600, marginBottom: 2 }}>{l.noodcontact}</p>
                      <p style={{ fontWeight: 700, color: '#1A1A1A', fontSize: 15 }}>{page.noodcontact_naam}</p>
                    </div>
                    <a
                      href={`tel:${page.noodcontact_tel}`}
                      style={{ background: '#FEA05E', color: '#fff', borderRadius: 100, padding: '10px 20px', fontWeight: 700, fontSize: 14, textDecoration: 'none', flexShrink: 0 }}
                    >
                      Bellen
                    </a>
                  </div>
                </Card>
              )}

              {/* Parkeren */}
              {t('parkeren') && (
                <Card>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    {iconCircle(<Car size={15} className="text-moroww-orange" />)}
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, color: 'rgba(26,26,26,0.4)', fontWeight: 600, marginBottom: 6 }}>{l.parkeren}</p>
                      <FormattedText text={t('parkeren')} />
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Huisregels */}
            {t('huisregels') && (
              <div style={{ marginTop: 40 }}>
                <SectionTitle>{l.huisregels}</SectionTitle>
                <Card>
                  <FormattedText text={t('huisregels')} />
                </Card>
              </div>
            )}

            {/* Handleiding */}
            {t('handleiding') && (
              <div style={{ marginTop: 40 }}>
                <SectionTitle>{l.handleiding}</SectionTitle>
                <Card>
                  <FormattedText text={t('handleiding')} />
                </Card>
              </div>
            )}
          </section>
        )}

        {/* ══════════════════════════════════════════
            Lokale tips — inklapbaar per categorie
        ══════════════════════════════════════════ */}
        {tips.length > 0 && (
          <section style={{ marginTop: 72 }}>
            <SectionTitle>{l.tips}</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {Object.entries(tipsByCategorie).map(([categorie, catTips]) => {
                const isOpen = openCategories.has(categorie)
                return (
                  <div
                    key={categorie}
                    style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
                  >
                    {/* Accordion trigger */}
                    <button
                      onClick={() => toggleCategorie(categorie)}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#C08D6E' }}>
                        {categorie}
                        <span style={{ marginLeft: 8, color: 'rgba(26,26,26,0.3)', fontWeight: 600 }}>
                          {catTips.length}
                        </span>
                      </span>
                      <ChevronDown
                        size={16}
                        style={{
                          color: 'rgba(26,26,26,0.35)',
                          transition: 'transform 260ms ease',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          flexShrink: 0,
                        }}
                      />
                    </button>

                    {/* Accordion content — grid-template-rows animatie */}
                    <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 280ms ease' }}>
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, borderTop: '1px solid rgba(26,26,26,0.06)' }}>
                          {catTips.map((tip, i) => {
                            const desc = (tip as Record<string, string>)[`beschrijving_${lang}`] || tip.beschrijving_nl
                            return (
                              <div
                                key={tip.id}
                                style={{
                                  padding: '16px 20px',
                                  borderTop: i > 0 ? '1px solid rgba(26,26,26,0.06)' : 'none',
                                }}
                              >
                                <p style={{ fontWeight: 700, color: '#1A1A1A', fontSize: 15, marginBottom: desc ? 4 : 0 }}>{tip.naam}</p>
                                {desc && <p style={{ color: 'rgba(26,26,26,0.6)', fontSize: 14, lineHeight: 1.6, marginBottom: 8 }}>{desc}</p>}
                                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                                  {tip.adres && (
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'rgba(26,26,26,0.4)' }}>
                                      <MapPin size={11} />
                                      {tip.adres}
                                    </span>
                                  )}
                                  {tip.website && (
                                    <a
                                      href={tip.website}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#FEA05E', textDecoration: 'none' }}
                                    >
                                      <Globe size={11} />
                                      Website
                                    </a>
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section style={{ marginTop: 72, background: '#1A1A1A', borderRadius: 24, padding: '40px 28px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 12 }}>
            {l.cta_titel}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.6, marginBottom: 28, maxWidth: 320, margin: '0 auto 28px' }}>
            {l.cta_sub}
          </p>
          <a
            href={boekUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-block', background: '#FEA05E', color: '#fff', fontWeight: 700, fontSize: 16, padding: '14px 36px', borderRadius: 100, textDecoration: 'none' }}
          >
            {l.cta_knop}
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
