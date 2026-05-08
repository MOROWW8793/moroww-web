'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import QRCode from 'qrcode'

const PANDEN = [
  { id: 'nosso-knokke',       naam: 'Nosso Logies' },
  { id: 'ann-helena-ursel',   naam: 'Chalet Ann-Helena' },
  { id: 'moroww-oostende',    naam: 'Oostende' },
  { id: 'cozy-relax-beernem', naam: 'The Cozy Relax Home' },
]

type WelcomePage = { pand_id: string; actief: boolean }

export default function AdminDashboard() {
  const router = useRouter()
  const [pages, setPages] = useState<WelcomePage[]>([])
  const [activeTab, setActiveTab] = useState<'welkom' | 'tips'>('welkom')

  useEffect(() => {
    fetch('/api/admin/welcome/all')
      .then(r => r.json())
      .then(d => { if (d.data) setPages(d.data) })
      .catch(() => {})
  }, [])

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin')
  }

  async function downloadQR(pandId: string) {
    const url = `https://www.moroww.com/welcome/${pandId}`
    const dataUrl = await QRCode.toDataURL(url, { width: 512, margin: 2 })
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `qr-${pandId}.png`
    a.click()
  }

  function getStatus(pandId: string) {
    const p = pages.find(p => p.pand_id === pandId)
    return p?.actief ?? false
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#1A1A1A', color: '#fff' }}>
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <div className="flex items-center gap-4">
          <Image src="/images/logo.png" alt="moroww" width={100} height={28} className="h-7 w-auto brightness-0 invert" />
          <span className="text-white/40 text-sm">Admin Dashboard</span>
        </div>
        <button
          onClick={logout}
          className="text-white/50 hover:text-white text-sm transition-colors"
        >
          Uitloggen
        </button>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-52 border-r border-white/10 py-8 px-4 shrink-0">
          <nav className="space-y-1">
            {[
              { key: 'welkom', label: "Welkomstpagina's" },
              { key: 'tips',   label: 'Lokale tips' },
            ].map(item => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key as 'welkom' | 'tips')}
                className={`w-full text-left rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  activeTab === item.key
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-8">
          {activeTab === 'welkom' && (
            <>
              <h1 className="text-xl font-bold mb-6">Welkomstpagina&apos;s</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PANDEN.map(pand => {
                  const actief = getStatus(pand.id)
                  return (
                    <div key={pand.id} className="rounded-2xl p-6 flex flex-col gap-4" style={{ background: '#242424' }}>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-base">{pand.naam}</p>
                          <p className="text-white/40 text-xs mt-0.5">{pand.id}</p>
                        </div>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          actief ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/40'
                        }`}>
                          {actief ? 'Actief' : 'Inactief'}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-auto">
                        <button
                          onClick={() => router.push(`/admin/dashboard/${pand.id}`)}
                          className="flex-1 rounded-full bg-white text-[#1A1A1A] font-semibold text-sm py-2 hover:bg-white/90 transition-colors"
                        >
                          Bewerken
                        </button>
                        <button
                          onClick={() => downloadQR(pand.id)}
                          className="flex-1 rounded-full border border-white/20 text-white/70 font-semibold text-sm py-2 hover:border-white/40 hover:text-white transition-colors"
                        >
                          QR Code
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {activeTab === 'tips' && (
            <div>
              <h1 className="text-xl font-bold mb-4">Lokale tips</h1>
              <p className="text-white/50 text-sm">Beheer lokale tips per pand via de bewerkpagina van het gewenste pand.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
