import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
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
      // NL-only pagina's: /en/... redirect naar de NL-URL.
      { source: "/en/become-an-owner", destination: "/eigenaar-worden", permanent: true },
      { source: "/en/eigenaar-worden", destination: "/eigenaar-worden", permanent: true },
      { source: "/en/vergelijking", destination: "/vergelijking", permanent: true },
      { source: "/en/privacy", destination: "/privacy", permanent: true },
      // Slug-fix Anna-Helena: oude URL bewaart permanent 301 → nieuwe URL.
      { source: "/collectie/ann-helena-ursel", destination: "/collectie/anna-helena-ursel", permanent: true },
      { source: "/en/collection/ann-helena-ursel", destination: "/en/collection/anna-helena-ursel", permanent: true },
      { source: "/welcome/ann-helena-ursel", destination: "/welcome/anna-helena-ursel", permanent: true },
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
