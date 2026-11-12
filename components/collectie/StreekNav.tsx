import { Link } from '@/i18n/navigation'

type Actief = 'alles' | 'the shore' | 'the fields'

// Glazen pil over de hero van /collectie, /the-shore en /the-fields.
export function StreekNav({ actief, isNl }: { actief: Actief; isNl: boolean }) {
  const pil = 'inline-flex items-center min-h-[44px] rounded-full px-mw-4 text-[0.9375rem] transition-colors'
  const items: { key: Actief; href: '/collectie' | '/the-shore' | '/the-fields'; label: string }[] = [
    { key: 'alles', href: '/collectie', label: isNl ? 'alles' : 'all' },
    { key: 'the shore', href: '/the-shore', label: 'the shore' },
    { key: 'the fields', href: '/the-fields', label: 'the fields' },
  ]
  return (
    <nav
      aria-label={isNl ? 'streken' : 'regions'}
      className="mt-mw-5 inline-flex max-w-full flex-wrap items-center gap-1 rounded-[28px] md:rounded-full p-1.5 bg-white/[0.12] backdrop-blur-xl backdrop-saturate-150 border border-white/25 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)]"
    >
      {items.map((it) =>
        it.key === actief ? (
          <span key={it.key} className={`${pil} bg-white text-moroww-dark`} aria-current="page">{it.label}</span>
        ) : (
          <Link key={it.key} href={it.href} className={`${pil} text-white hover:bg-white/15`}>{it.label}</Link>
        ),
      )}
      <Link href="/boeken" className={`${pil} bg-moroww-orange text-moroww-dark font-semibold hover:bg-white`}>{isNl ? 'zoek op data' : 'search by date'}</Link>
    </nav>
  )
}
