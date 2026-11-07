import Image from 'next/image'
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
        marginTop: 'clamp(3rem, 6vw, 5rem)',
      }}
    >
      <div style={{ display: 'grid', gap: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
            <Image
              src="/images/logo.png"
              alt="moroww"
              width={157}
              height={24}
              style={{ height: '24px', width: 'auto', display: 'block' }}
            />
            <p className="hm-dim" style={{ marginTop: '1rem', fontSize: '0.9375rem', maxWidth: '36ch' }}>
              {isNl
                ? 'label voor karaktervolle vakantiewoningen in België.'
                : 'a label for holiday homes with character in Belgium.'}
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
        </div>

        <hr className="hm-rule-soft" />

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <p className="hm-dim" style={{ fontSize: '0.8125rem' }}>
            © {new Date().getFullYear()} moroww
          </p>
          <p className="hm-dim" style={{ fontSize: '0.8125rem' }}>
            {isNl ? 'met de steun van Start it @KBC' : 'supported by Start it @KBC'}
          </p>
        </div>
      </div>
    </footer>
  )
}
