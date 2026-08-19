'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (data.success) {
        router.push('/admin/dashboard')
      } else {
        setError('Ongeldig wachtwoord.')
      }
    } catch {
      setError('Er ging iets mis. Probeer opnieuw.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#1A1A1A' }}>
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-10">
          <Image
            src="/images/logo.png"
            alt="moroww"
            width={120}
            height={32}
            className="h-8 w-auto brightness-0 invert"
          />
        </div>

        <h1 className="text-white text-2xl font-bold text-center mb-8 tracking-[-0.02em]">
          Admin
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Wachtwoord"
            required
            className="w-full rounded-xl px-4 py-3 text-sm bg-white/10 text-white placeholder-white/30 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
          />

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-white text-moroww-dark font-semibold py-3 text-sm hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Laden...' : 'Inloggen'}
          </button>
        </form>
      </div>
    </div>
  )
}
