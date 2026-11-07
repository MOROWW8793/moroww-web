import Link from 'next/link'

export function Nav({ locale }: { locale: string }) {
  const isNl = locale === 'nl'
  const prefix = isNl ? '' : '/en'

  return (
    <header className="hm-wrap" style={{ paddingBlock: '1.5rem' }}>
      <nav
        aria-label={isNl ? 'hoofdnavigatie' : 'primary'}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'baseline',
          gap: '1rem',
        }}
      >
        <Link
          href={`${prefix}/`}
          className="hm-display"
          style={{ fontSize: '1.5rem', textDecoration: 'none', lineHeight: 1 }}
          aria-label="moroww"
        >
          moroww
        </Link>
        <Link href={`${prefix}/eigenaar-worden`} className="hm-link" style={{ fontSize: '0.9375rem' }}>
          {isNl ? 'verhuur jouw huis' : 'host with us'}
        </Link>
      </nav>
    </header>
  )
}
