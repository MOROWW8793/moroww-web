import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  // Next 15 streamt metadata standaard in de body voor gewone browsers en
  // schrijft ze alleen in de <head> voor bots die in htmlLimitedBots
  // matchen (Googlebot e.a.). Voor SEO-scrapers, sharing-previews en
  // link-unfurlers die een browser-UA gebruiken (LinkedIn, Slack, X, e-mail-
  // previews die JS niet uitvoeren) mist daardoor title/description/canonical/
  // og:image bij first paint. We willen metadata voor iedereen in <head>,
  // dus matchen we alle user-agents.
  htmlLimitedBots: '.*',
  images: {
    // AVIF weer aan. GHSA-2xp9-vwfh-vxw4 is gedicht in next >= 15.5.24;
    // deze branch draait op 15.5.26 (zie package.json), dus veilig om
    // AVIF terug te serveren.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Toegestane quality-waarden. 65 gebruiken we op kleine thumbs waar
    // het verschil met 75 onmerkbaar is; 75 blijft de default voor hero's.
    qualities: [65, 75],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "assets.guesty.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cdn.guesty.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/about", destination: "/over-moroww", permanent: true },
      { source: "/nl", destination: "/", permanent: true },
      { source: "/nl/:path*", destination: "/:path*", permanent: true },
      // /en/eigenaar-worden was NL-only en 301'de naar de NL-URL. Sinds
      // WP K.5 hebben we een echte EN-pagina op /en/become-an-owner; de
      // oude /en/eigenaar-worden redirect nu naar die nieuwe EN-URL.
      { source: "/en/eigenaar-worden", destination: "/en/become-an-owner", permanent: true },
      // NL-only pagina's: /en/... redirect naar de NL-URL.
      { source: "/en/vergelijking", destination: "/vergelijking", permanent: true },
      { source: "/en/privacy", destination: "/privacy", permanent: true },
      // Merkfamilie (nov 2026): het label, how en hub zijn NL-only.
      { source: "/en/het-label", destination: "/het-label", permanent: false },
      { source: "/en/voor-eigenaars", destination: "/voor-eigenaars", permanent: false },
      // moroww how heet sinds nov 2026 moroww advisory. Oude adressen verwijzen door.
      { source: "/how/scan", destination: "/advisory", permanent: true },
      { source: "/how/traject", destination: "/advisory", permanent: true },
      { source: "/how/makelaars", destination: "/advisory/property-managers", permanent: true },
      { source: "/how", destination: "/advisory", permanent: true },
      { source: "/how/:path*", destination: "/advisory/:path*", permanent: true },
      { source: "/en/how", destination: "/advisory", permanent: true },
      { source: "/en/how/:path*", destination: "/advisory/:path*", permanent: true },
      { source: "/en/advisory", destination: "/advisory", permanent: false },
      { source: "/en/advisory/:path*", destination: "/advisory/:path*", permanent: false },
      { source: "/en/hub", destination: "/hub", permanent: false },
      { source: "/en/hub/:path*", destination: "/hub/:path*", permanent: false },
      // Slug-fix Anna-Helena: oude URL bewaart permanent 301 → nieuwe URL.
      { source: "/collectie/ann-helena-ursel", destination: "/collectie/anna-helena-ursel", permanent: true },
      { source: "/en/collection/ann-helena-ursel", destination: "/en/collection/anna-helena-ursel", permanent: true },
      { source: "/welcome/ann-helena-ursel", destination: "/welcome/anna-helena-ursel", permanent: true },
      // Samenwerking Lammersdamhoeve stopgezet (okt 2026): oude pand-URL's naar the fields.
      { source: "/collectie/lammersdamhoeve", destination: "/the-fields", permanent: true },
      { source: "/en/collection/lammersdamhoeve", destination: "/en/the-fields", permanent: true },
    ]
  },
  // Basisbeveiliging voor elke pagina. Geen volledige CSP: Stripe, Vercel
  // en next/image laden van meerdere hosts en een te strikte lijst breekt
  // de afrekenpagina. frame-ancestors volstaat tegen clickjacking.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ]
  },
  // /welkom/<token> is een verblijfsgebonden gastpagina die op host.moroww.com
  // (moroww-os) leeft. We proxyen zodat de gast moroww.com in de adresbalk ziet
  // en de token binnen dit domein blijft — geen redirect.
  async rewrites() {
    return [
      {
        source: "/welkom/:token",
        destination: "https://host.moroww.com/welkom/:token",
      },
    ]
  },
}

export default withNextIntl(nextConfig)
