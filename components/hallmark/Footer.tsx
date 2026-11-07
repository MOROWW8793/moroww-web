import Link from 'next/link'

export function Footer({ locale }: { locale: string }) {
  const isNl = locale === 'nl'
  const prefix = isNl ? '' : '/en'

  return (
    <footer
      className="hm-wrap"
      style={{
        paddingBlock: 'clamp(3rem, 6vw, 5rem)',
        borderTop: '1px solid var(--hm-rule)',
        marginTop: 'clamp(4rem, 8vw, 7rem)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gap: '2.5rem',
          gridTemplateColumns: 'minmax(0, 1fr)',
        }}
      >
        <div>
          <p className="hm-display" style={{ fontSize: '1.5rem', lineHeight: 1 }}>moroww</p>
          <p className="hm-dim" style={{ marginTop: '0.75rem', fontSize: '0.9375rem', maxWidth: '36ch' }}>
            {isNl
              ? 'bemiddeling in gekeurde vakantiewoningen in België.'
              : 'curated holiday homes in Belgium, each inspected in person.'}
          </p>
        </div>

        <nav
          aria-label={isNl ? 'in de voettekst' : 'footer'}
          style={{
            display: 'grid',
            gap: '0.75rem 2rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(10rem, max-content))',
            fontSize: '0.9375rem',
          }}
        >
          <Link href={`${prefix}/collectie`} className="hm-link">{isNl ? 'de woningen' : 'the homes'}</Link>
          <Link href={`${prefix}/eigenaar-worden`} className="hm-link">{isNl ? 'verhuur jouw huis' : 'host with us'}</Link>
          <Link href={`${prefix}/contact`} className="hm-link">{isNl ? 'contact' : 'contact'}</Link>
          <Link href={`${prefix}/privacy`} className="hm-link">{isNl ? 'privacy' : 'privacy'}</Link>
        </nav>

        <p className="hm-dim" style={{ fontSize: '0.8125rem' }}>
          © {new Date().getFullYear()} moroww
        </p>
      </div>
    </footer>
  )
}
