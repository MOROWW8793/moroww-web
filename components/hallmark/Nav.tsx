import Image from 'next/image'
import Link from 'next/link'

export function Nav({ locale }: { locale: string }) {
  const isNl = locale === 'nl'
  const prefix = isNl ? '' : '/en'

  return (
    <header className="hm-wrap" style={{ paddingBlock: '1.25rem' }}>
      <nav
        aria-label={isNl ? 'hoofdnavigatie' : 'primary'}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}
      >
        <Link
          href={`${prefix}/`}
          aria-label="moroww"
          style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
        >
          {/* Logo.png is wordmerk + bloem (aspect 4001:612 ≈ 6.54:1). Op 24px
              hoog komt dat uit op ~157px breed. */}
          <Image
            src="/images/logo.png"
            alt=""
            width={157}
            height={24}
            style={{ height: '24px', width: 'auto', display: 'block' }}
            priority
          />
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link href={`${prefix}/collectie`} className="hm-link" style={{ fontSize: '0.9375rem' }}>
            {isNl ? 'de woningen' : 'the homes'}
          </Link>
          <Link href={`${prefix}/eigenaar-worden`} className="hm-cta" style={{ padding: '0.625rem 1.125rem', fontSize: '0.875rem' }}>
            {isNl ? 'verhuur jouw huis' : 'host with us'}
          </Link>
        </div>
      </nav>
    </header>
  )
}
