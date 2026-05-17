'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import QRCode from 'qrcode'

type Lang = 'nl' | 'fr' | 'en'
const LANGS: Lang[] = ['nl', 'fr', 'en']
const LANG_LABELS = { nl: 'NL', fr: 'FR', en: 'EN' }

type Tip = {
  id?: string
  pand_id: string
  categorie: string
  naam: string
  beschrijving_nl: string
  beschrijving_fr: string
  beschrijving_en: string
  adres: string
  website: string
}

type WelcomeData = {
  pand_id: string
  actief: boolean
  welkomstbericht_nl: string
  welkomstbericht_fr: string
  welkomstbericht_en: string
  checkin_tijd: string
  checkout_tijd: string
  wifi_naam: string
  wifi_wachtwoord: string
  noodcontact_naam: string
  noodcontact_telefoon: string
  slot_instructies_nl: string
  slot_instructies_fr: string
  slot_instructies_en: string
  huisregels_nl: string
  huisregels_fr: string
  huisregels_en: string
  handleiding_nl: string
  handleiding_fr: string
  handleiding_en: string
}

const EMPTY: WelcomeData = {
  pand_id: '',
  actief: true,
  welkomstbericht_nl: '', welkomstbericht_fr: '', welkomstbericht_en: '',
  checkin_tijd: '', checkout_tijd: '',
  wifi_naam: '', wifi_wachtwoord: '',
  noodcontact_naam: '', noodcontact_telefoon: '',
  slot_instructies_nl: '', slot_instructies_fr: '', slot_instructies_en: '',
  huisregels_nl: '', huisregels_fr: '', huisregels_en: '',
  handleiding_nl: '', handleiding_fr: '', handleiding_en: '',
}

const CATEGORIEEN = ['Restaurant', 'Bakker', 'Activiteit', 'Natuur', 'Winkelen', 'Overige']

const EMPTY_TIP: Omit<Tip, 'id' | 'pand_id'> = {
  categorie: 'Restaurant',
  naam: '',
  beschrijving_nl: '', beschrijving_fr: '', beschrijving_en: '',
  adres: '', website: '',
}

const inputCls = 'w-full rounded-xl px-4 py-3 text-sm text-white bg-white/10 border border-white/10 placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/20'
const labelCls = 'block text-xs font-medium uppercase tracking-widest text-white/40 mb-1.5'

export default function PandEditor() {
  const { pandId } = useParams<{ pandId: string }>()
  const router = useRouter()

  const [tab, setTab] = useState<'algemeen' | 'regels' | 'tips' | 'qr'>('algemeen')
  const [data, setData] = useState<WelcomeData>({ ...EMPTY, pand_id: pandId })
  const [tips, setTips] = useState<Tip[]>([])
  const [newTip, setNewTip] = useState<Omit<Tip, 'id' | 'pand_id'>>({ ...EMPTY_TIP })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [qrUrl, setQrUrl] = useState('')

  const welcomeUrl = `https://www.moroww.com/welcome/${pandId}`

  useEffect(() => {
    fetch(`/api/admin/welcome/${pandId}`)
      .then(r => r.json())
      .then(d => {
        if (d.data) setData({ ...EMPTY, ...d.data })
        if (d.tips) setTips(d.tips)
      })
      .catch(() => {})
  }, [pandId])

  useEffect(() => {
    if (tab === 'qr') {
      QRCode.toDataURL(welcomeUrl, { width: 400, margin: 2 })
        .then(setQrUrl)
        .catch(() => {})
    }
  }, [tab, welcomeUrl])

  function set(k: keyof WelcomeData, v: string | boolean) {
    setData(prev => ({ ...prev, [k]: v }))
  }

  async function save() {
    setSaving(true)
    setSaved(false)
    try {
      const res = await fetch(`/api/admin/welcome/${pandId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) setSaved(true)
    } finally {
      setSaving(false)
    }
  }

  async function addTip() {
    const res = await fetch('/api/admin/tips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newTip, pand_id: pandId }),
    })
    const d = await res.json()
    if (d.data) {
      setTips(prev => [...prev, d.data])
      setNewTip({ ...EMPTY_TIP })
    }
  }

  async function deleteTip(id: string) {
    await fetch('/api/admin/tips', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setTips(prev => prev.filter(t => t.id !== id))
  }

  function downloadQR() {
    const a = document.createElement('a')
    a.href = qrUrl
    a.download = `qr-${pandId}.png`
    a.click()
  }

  const tabs = [
    { key: 'algemeen', label: 'Algemeen' },
    { key: 'regels',   label: 'Huisregels & handleiding' },
    { key: 'tips',     label: 'Lokale tips' },
    { key: 'qr',       label: 'QR Code' },
  ] as const

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#1A1A1A', color: '#fff' }}>
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <div className="flex items-center gap-4">
          <Image src="/images/logo.png" alt="moroww" width={100} height={28} className="h-7 w-auto brightness-0 invert" />
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="text-white/40 hover:text-white text-sm transition-colors"
          >
            ← Terug
          </button>
          <span className="text-white/20">/</span>
          <span className="text-sm font-medium">{pandId}</span>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-green-400 text-sm">Opgeslagen ✓</span>}
          <button
            onClick={save}
            disabled={saving}
            className="rounded-full bg-white text-[#1A1A1A] font-semibold text-sm px-6 py-2.5 hover:bg-white/90 disabled:opacity-50 transition-colors"
          >
            {saving ? 'Opslaan...' : 'Opslaan'}
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-1 px-8 pt-6 border-b border-white/10 pb-0">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
              tab === t.key
                ? 'bg-white/10 text-white border border-b-0 border-white/10'
                : 'text-white/40 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-8 max-w-3xl">

        {/* ── Tab: Algemeen ── */}
        {tab === 'algemeen' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.actief}
                  onChange={e => set('actief', e.target.checked)}
                  className="accent-white w-4 h-4"
                />
                <span className="text-sm text-white/70">Pagina actief (zichtbaar voor gasten)</span>
              </label>
            </div>

            <div>
              <p className={labelCls}>Welkomstbericht</p>
              <div className="space-y-3">
                {LANGS.map(lang => (
                  <div key={lang}>
                    <p className="text-xs text-white/30 mb-1">{LANG_LABELS[lang]}</p>
                    <textarea
                      rows={3}
                      value={(data as unknown as Record<string, string>)[`welkomstbericht_${lang}`]}
                      onChange={e => set(`welkomstbericht_${lang}` as keyof WelcomeData, e.target.value)}
                      placeholder={`Welkomstbericht in ${LANG_LABELS[lang]}...`}
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Check-in tijd</label>
                <input type="time" value={data.checkin_tijd}
                  onChange={e => set('checkin_tijd', e.target.value)}
                  className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Checkout tijd</label>
                <input type="time" value={data.checkout_tijd}
                  onChange={e => set('checkout_tijd', e.target.value)}
                  className={inputCls} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Wifi naam</label>
                <input value={data.wifi_naam}
                  onChange={e => set('wifi_naam', e.target.value)}
                  placeholder="Netwerknaam"
                  className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Wifi wachtwoord</label>
                <input value={data.wifi_wachtwoord}
                  onChange={e => set('wifi_wachtwoord', e.target.value)}
                  placeholder="Wachtwoord"
                  className={inputCls} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Noodcontact naam</label>
                <input value={data.noodcontact_naam}
                  onChange={e => set('noodcontact_naam', e.target.value)}
                  placeholder="Naam"
                  className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Noodcontact telefoon</label>
                <input value={data.noodcontact_telefoon}
                  onChange={e => set('noodcontact_telefoon', e.target.value)}
                  placeholder="+32 470 00 00 00"
                  className={inputCls} />
              </div>
            </div>

            <div>
              <p className={labelCls}>Slot instructies</p>
              <div className="space-y-3">
                {LANGS.map(lang => (
                  <div key={lang}>
                    <p className="text-xs text-white/30 mb-1">{LANG_LABELS[lang]}</p>
                    <textarea
                      rows={3}
                      value={(data as unknown as Record<string, string>)[`slot_instructies_${lang}`]}
                      onChange={e => set(`slot_instructies_${lang}` as keyof WelcomeData, e.target.value)}
                      placeholder={`Slot instructies in ${LANG_LABELS[lang]}...`}
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Tab: Huisregels & handleiding ── */}
        {tab === 'regels' && (
          <div className="space-y-8">
            <div>
              <p className={labelCls}>Huisregels</p>
              <div className="space-y-3">
                {LANGS.map(lang => (
                  <div key={lang}>
                    <p className="text-xs text-white/30 mb-1">{LANG_LABELS[lang]}</p>
                    <textarea
                      rows={5}
                      value={(data as unknown as Record<string, string>)[`huisregels_${lang}`]}
                      onChange={e => set(`huisregels_${lang}` as keyof WelcomeData, e.target.value)}
                      placeholder={`Huisregels in ${LANG_LABELS[lang]}...`}
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className={labelCls}>Handleiding</p>
              <div className="space-y-3">
                {LANGS.map(lang => (
                  <div key={lang}>
                    <p className="text-xs text-white/30 mb-1">{LANG_LABELS[lang]}</p>
                    <textarea
                      rows={5}
                      value={(data as unknown as Record<string, string>)[`handleiding_${lang}`]}
                      onChange={e => set(`handleiding_${lang}` as keyof WelcomeData, e.target.value)}
                      placeholder={`Handleiding in ${LANG_LABELS[lang]}...`}
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Tab: Lokale tips ── */}
        {tab === 'tips' && (
          <div className="space-y-8">
            {/* Bestaande tips */}
            {tips.length > 0 && (
              <div className="space-y-3">
                <p className={labelCls}>Bestaande tips ({tips.length})</p>
                {tips.map(tip => (
                  <div key={tip.id} className="rounded-xl p-4 flex items-start justify-between gap-4" style={{ background: '#242424' }}>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-[#C08D6E] uppercase tracking-widest">{tip.categorie}</span>
                      </div>
                      <p className="font-medium text-sm">{tip.naam}</p>
                      {tip.beschrijving_nl && (
                        <p className="text-white/50 text-xs mt-0.5 truncate">{tip.beschrijving_nl}</p>
                      )}
                      {tip.adres && <p className="text-white/30 text-xs mt-0.5">{tip.adres}</p>}
                    </div>
                    <button
                      onClick={() => tip.id && deleteTip(tip.id)}
                      className="text-white/30 hover:text-red-400 text-xs shrink-0 transition-colors"
                    >
                      Verwijderen
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Nieuwe tip */}
            <div className="rounded-2xl p-6 space-y-4" style={{ background: '#242424' }}>
              <p className={labelCls}>Nieuwe tip toevoegen</p>
              <div>
                <label className="text-xs text-white/30 mb-1 block">Categorie</label>
                <select
                  value={newTip.categorie}
                  onChange={e => setNewTip(prev => ({ ...prev, categorie: e.target.value }))}
                  className={inputCls}
                >
                  {CATEGORIEEN.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-white/30 mb-1 block">Naam</label>
                <input
                  value={newTip.naam}
                  onChange={e => setNewTip(prev => ({ ...prev, naam: e.target.value }))}
                  placeholder="Naam van de tip"
                  className={inputCls}
                />
              </div>
              {LANGS.map(lang => (
                <div key={lang}>
                  <label className="text-xs text-white/30 mb-1 block">Beschrijving {LANG_LABELS[lang]}</label>
                  <textarea
                    rows={2}
                    value={(newTip as unknown as Record<string, string>)[`beschrijving_${lang}`]}
                    onChange={e => setNewTip(prev => ({ ...prev, [`beschrijving_${lang}`]: e.target.value }))}
                    placeholder={`Beschrijving in ${LANG_LABELS[lang]}...`}
                    className={`${inputCls} resize-none`}
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/30 mb-1 block">Adres</label>
                  <input value={newTip.adres}
                    onChange={e => setNewTip(prev => ({ ...prev, adres: e.target.value }))}
                    placeholder="Straat, gemeente"
                    className={inputCls} />
                </div>
                <div>
                  <label className="text-xs text-white/30 mb-1 block">Website</label>
                  <input value={newTip.website}
                    onChange={e => setNewTip(prev => ({ ...prev, website: e.target.value }))}
                    placeholder="https://..."
                    className={inputCls} />
                </div>
              </div>
              <button
                onClick={addTip}
                disabled={!newTip.naam}
                className="rounded-full bg-white text-[#1A1A1A] font-semibold text-sm px-6 py-2.5 hover:bg-white/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Tip toevoegen
              </button>
            </div>
          </div>
        )}

        {/* ── Tab: QR Code ── */}
        {tab === 'qr' && (
          <div className="space-y-6">
            <div>
              <p className={labelCls}>Welkomst URL</p>
              <p className="text-white/60 text-sm font-mono bg-white/5 rounded-xl px-4 py-3 mt-1">
                {welcomeUrl}
              </p>
            </div>

            {qrUrl && (
              <div className="flex flex-col items-start gap-4">
                <div className="rounded-2xl overflow-hidden bg-white p-4 inline-block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qrUrl} alt="QR Code" style={{ width: 200, height: 200 }} />
                </div>
                <button
                  onClick={downloadQR}
                  className="rounded-full bg-white text-[#1A1A1A] font-semibold text-sm px-6 py-2.5 hover:bg-white/90 transition-colors"
                >
                  Download als PNG
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
