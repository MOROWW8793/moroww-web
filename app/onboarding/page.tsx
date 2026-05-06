'use client'

import { useState } from 'react'
import { Check, ChevronRight, ChevronLeft } from 'lucide-react'

// ── Styles ─────────────────────────────────────────────────────────────────

const inputCls =
  'w-full rounded-xl border border-moroww-border bg-white px-4 py-3 text-sm text-moroww-black placeholder-moroww-black/30 focus:outline-none focus:ring-2 focus:ring-moroww-orange/40'

const labelCls = 'block text-xs font-medium uppercase tracking-widest text-moroww-black/50 mb-1.5'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0">
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  )
}

function SelectField({
  label, name, options, required, value, onChange,
}: {
  label: string; name: string; options: string[]; required?: boolean;
  value: string; onChange: (v: string) => void
}) {
  return (
    <Field label={label}>
      <select
        name={name}
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={inputCls}
      >
        <option value="">Kies een optie...</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </Field>
  )
}

// ── Step indicator ─────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  const labels = ['Jouw gegevens', 'Jouw pand', 'Verwachtingen & foto\'s']
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-3">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="flex flex-1 items-center">
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors
              ${i < current ? 'bg-moroww-orange text-white' : i === current ? 'bg-moroww-orange text-white' : 'bg-white border-2 border-moroww-border text-moroww-black/30'}`}>
              {i < current ? <Check size={14} strokeWidth={3} /> : i + 1}
            </div>
            {i < total - 1 && (
              <div className={`flex-1 h-0.5 mx-2 transition-colors ${i < current ? 'bg-moroww-orange' : 'bg-moroww-border'}`} />
            )}
          </div>
        ))}
      </div>
      <p className="text-xs font-medium text-moroww-orange uppercase tracking-widest text-center">
        Stap {current + 1} van {total} - {labels[current]}
      </p>
    </div>
  )
}

// ── Types ──────────────────────────────────────────────────────────────────

type FormData = {
  naam: string; email: string; telefoon: string
  adres: string; type_pand: string; oppervlakte: string
  slaapkamers: string; badkamers: string; regio: string
  eigenaar_of_beheerder: string; hoe_lang_verhuurd: string
  huidig_platform: string; beschikbaarheid: string
  verwachte_inkomsten: string; opmerkingen: string
  live_gaan: string; sleuteloverdracht: string
  fotos: File[]
}

const empty: FormData = {
  naam: '', email: '', telefoon: '',
  adres: '', type_pand: '', oppervlakte: '',
  slaapkamers: '', badkamers: '', regio: '',
  eigenaar_of_beheerder: '', hoe_lang_verhuurd: '',
  huidig_platform: '', beschikbaarheid: '',
  verwachte_inkomsten: '', opmerkingen: '',
  live_gaan: '', sleuteloverdracht: '', fotos: [],
}

// ── Stap 1 ─────────────────────────────────────────────────────────────────

function Stap1({ data, set }: { data: FormData; set: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="space-y-5">
      <Field label="Volledige naam *">
        <input name="naam" required value={data.naam}
          onChange={e => set('naam', e.target.value)}
          placeholder="Bv. Jan Janssens"
          className={inputCls} />
      </Field>
      <Field label="E-mailadres *">
        <input name="email" type="email" required value={data.email}
          onChange={e => set('email', e.target.value)}
          placeholder="jan@voorbeeld.be"
          className={inputCls} />
      </Field>
      <Field label="Telefoonnummer *">
        <input name="telefoon" type="tel" required value={data.telefoon}
          onChange={e => set('telefoon', e.target.value)}
          placeholder="+32 470 00 00 00"
          className={inputCls} />
      </Field>
    </div>
  )
}

// ── Stap 2 ─────────────────────────────────────────────────────────────────

function Stap2({ data, set }: { data: FormData; set: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="space-y-5">
      <Field label="Adres van het pand *">
        <input name="adres" required value={data.adres}
          onChange={e => set('adres', e.target.value)}
          placeholder="Bv. Kustlaan 12, 8300 Knokke-Heist"
          className={inputCls} />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <SelectField label="Type pand *" name="type_pand" required
          options={['Appartement', 'Huis', 'Chalet', 'Villa', 'Andere']}
          value={data.type_pand} onChange={v => set('type_pand', v)} />
        <Field label="Oppervlakte (m²)">
          <input name="oppervlakte" type="number" value={data.oppervlakte}
            onChange={e => set('oppervlakte', e.target.value)}
            placeholder="Bv. 120"
            className={inputCls} />
        </Field>
        <SelectField label="Slaapkamers *" name="slaapkamers" required
          options={['1', '2', '3', '4', '5+']}
          value={data.slaapkamers} onChange={v => set('slaapkamers', v)} />
        <SelectField label="Badkamers *" name="badkamers" required
          options={['1', '1.5', '2', '2.5', '3+']}
          value={data.badkamers} onChange={v => set('badkamers', v)} />
      </div>
      <SelectField label="Regio *" name="regio" required
        options={['Kust', 'Meetjesland', 'Andere']}
        value={data.regio} onChange={v => set('regio', v)} />
      <Field label="Ben je eigenaar of beheerder? *">
        <div className="flex gap-6 mt-1">
          {['Eigenaar', 'Beheerder'].map(opt => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="eigenaar_of_beheerder" value={opt}
                checked={data.eigenaar_of_beheerder === opt}
                onChange={() => set('eigenaar_of_beheerder', opt)}
                className="accent-moroww-orange" />
              <span className="text-sm text-moroww-black">{opt}</span>
            </label>
          ))}
        </div>
      </Field>
      <SelectField label="Hoe lang wordt het pand al verhuurd?"
        name="hoe_lang_verhuurd"
        options={['Nog niet', 'Minder dan 1 jaar', '1-3 jaar', 'Meer dan 3 jaar']}
        value={data.hoe_lang_verhuurd} onChange={v => set('hoe_lang_verhuurd', v)} />
      <Field label="Via welk platform verhuur je nu?">
        <input name="huidig_platform" value={data.huidig_platform}
          onChange={e => set('huidig_platform', e.target.value)}
          placeholder="Bv. Airbnb, Booking.com, eigen beheer..."
          className={inputCls} />
      </Field>
    </div>
  )
}

// ── Stap 3 ─────────────────────────────────────────────────────────────────

function Stap3({ data, set, setFiles }: {
  data: FormData
  set: (k: keyof FormData, v: string) => void
  setFiles: (files: File[]) => void
}) {
  return (
    <div className="space-y-5">
      <SelectField label="Weken per jaar beschikbaar voor verhuur?"
        name="beschikbaarheid"
        options={['Minder dan 10', '10-20', '20-30', '30-40', 'Het hele jaar']}
        value={data.beschikbaarheid} onChange={v => set('beschikbaarheid', v)} />
      <SelectField label="Verwachte inkomsten per jaar"
        name="verwachte_inkomsten"
        options={['Nog geen idee', '< €10.000', '€10.000-€25.000', '€25.000-€50.000', '> €50.000']}
        value={data.verwachte_inkomsten} onChange={v => set('verwachte_inkomsten', v)} />
      <SelectField label="Wanneer wil je live gaan?"
        name="live_gaan"
        options={['Zo snel mogelijk', 'Binnen 1 maand', 'Binnen 3 maanden', 'Nog niet zeker']}
        value={data.live_gaan} onChange={v => set('live_gaan', v)} />
      <SelectField label="Voorkeur sleuteloverdracht"
        name="sleuteloverdracht"
        options={['Sleutelkluisje', 'Persoonlijke overdracht', 'Nog te bespreken']}
        value={data.sleuteloverdracht} onChange={v => set('sleuteloverdracht', v)} />
      <Field label="Opmerkingen of vragen">
        <textarea name="opmerkingen" rows={4} value={data.opmerkingen}
          onChange={e => set('opmerkingen', e.target.value)}
          placeholder="Zijn er specifieke zaken waar je rekening mee wil houden?"
          className={`${inputCls} resize-none`} />
      </Field>
      <Field label={`Foto's van je pand (optioneel, max 10)`}>
        <div className="rounded-xl border-2 border-dashed border-moroww-border bg-white px-4 py-6 text-center">
          <input
            type="file"
            name="fotos"
            accept="image/*"
            multiple
            onChange={e => {
              const files = Array.from(e.target.files ?? []).slice(0, 10)
              setFiles(files)
            }}
            className="hidden"
            id="fotos-input"
          />
          <label htmlFor="fotos-input" className="cursor-pointer">
            <p className="text-sm text-moroww-black/50">
              Klik om foto&apos;s te selecteren
            </p>
            <p className="text-xs text-moroww-black/30 mt-1">JPG, PNG, WEBP - max 10 foto&apos;s</p>
          </label>
          {data.fotos.length > 0 && (
            <p className="mt-3 text-sm font-medium text-moroww-orange">
              {data.fotos.length} foto{data.fotos.length !== 1 ? "'s" : ''} geselecteerd
            </p>
          )}
        </div>
      </Field>
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>(empty)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const TOTAL = 3

  function set(k: keyof FormData, v: string) {
    setData(prev => ({ ...prev, [k]: v }))
  }

  function setFiles(files: File[]) {
    setData(prev => ({ ...prev, fotos: files }))
  }

  function validateStep(): boolean {
    if (step === 0) return !!(data.naam && data.email && data.telefoon)
    if (step === 1) return !!(data.adres && data.type_pand && data.slaapkamers && data.badkamers && data.regio && data.eigenaar_of_beheerder)
    return true
  }

  async function handleSubmit() {
    setSubmitting(true)
    setError(null)
    try {
      const fd = new FormData()
      Object.entries(data).forEach(([k, v]) => {
        if (k === 'fotos') return
        fd.append(k, v as string)
      })
      data.fotos.forEach(f => fd.append('fotos', f))

      const res = await fetch('/api/onboarding', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Onbekende fout')
      setDone(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Er ging iets mis. Probeer opnieuw.')
    } finally {
      setSubmitting(false)
    }
  }

  const firstName = data.naam.split(' ')[0]

  // ── Success state ──────────────────────────────────────────────────────

  if (done) {
    return (
      <div className="min-h-screen bg-moroww-blush flex items-center justify-center px-6 py-24">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-moroww-orange flex items-center justify-center mx-auto mb-8">
            <Check size={28} className="text-white" strokeWidth={3} />
          </div>
          <h1 className="font-bold text-moroww-black lowercase leading-tight tracking-[-0.02em] mb-4"
            style={{ fontSize: 'clamp(2rem,5vw,3rem)' }}>
            perfect{firstName ? `, ${firstName}` : ''}. we gaan aan de slag.
          </h1>
          <p className="text-moroww-black/60 leading-relaxed" style={{ fontSize: 17 }}>
            Je onboarding is gestart. Ons team neemt binnen 24 uur contact met je op
            om de volgende stappen te bespreken.
          </p>
          <p className="mt-6 text-sm text-moroww-black/40">
            Vragen? Stuur een mail naar{' '}
            <a href="mailto:info@moroww.com" className="text-moroww-orange hover:underline">
              info@moroww.com
            </a>
          </p>
        </div>
      </div>
    )
  }

  // ── Form ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-moroww-blush px-6 py-16 md:py-24">
      <div className="mx-auto max-w-xl">

        {/* Hero */}
        <div className="mb-12 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-moroww-orange mb-4">
            Welkom bij moroww
          </p>
          <h1 className="font-bold lowercase text-moroww-black leading-[1.05] tracking-[-0.02em] mb-4"
            style={{ fontSize: 'clamp(2rem,5vw,3rem)' }}>
            goed dat je er bent. laten we starten.
          </h1>
          <p className="text-moroww-black/55 leading-relaxed max-w-sm mx-auto" style={{ fontSize: 16 }}>
            Je bent geselecteerd als moroww eigenaar. Dit formulier helpt ons jouw pand correct op te
            zetten. Vul alles zo volledig mogelijk in - hoe meer detail, hoe sneller we kunnen starten.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-sm px-8 py-10 md:px-12">
          <StepIndicator current={step} total={TOTAL} />

          {step === 0 && <Stap1 data={data} set={set} />}
          {step === 1 && <Stap2 data={data} set={set} />}
          {step === 2 && <Stap3 data={data} set={set} setFiles={setFiles} />}

          {error && (
            <div className="mt-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(s => s - 1)}
                className="flex items-center gap-2 rounded-full border-2 border-moroww-border text-moroww-black/60 hover:text-moroww-black font-semibold px-6 py-3 text-sm transition-colors"
              >
                <ChevronLeft size={16} />
                Vorige
              </button>
            )}

            {step < TOTAL - 1 ? (
              <button
                type="button"
                onClick={() => {
                  if (!validateStep()) {
                    setError('Vul alle verplichte velden in.')
                    return
                  }
                  setError(null)
                  setStep(s => s + 1)
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-moroww-orange hover:bg-moroww-orange-dark text-white font-semibold px-6 py-3 text-sm transition-colors"
              >
                Volgende
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-moroww-orange hover:bg-moroww-orange-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 text-sm transition-colors"
              >
                {submitting ? 'Versturen...' : 'Onboarding opstarten'}
              </button>
            )}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-moroww-black/30">
          moroww BV · BTW BE1030.667.956 · info@moroww.com
        </p>
      </div>
    </div>
  )
}
