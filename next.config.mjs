/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "assets.guesty.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cdn.guesty.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/over-moroww",
        permanent: true,
      },
      {
        source: "/nl",
        destination: "/",
        permanent: true,
      },
      {
        source: "/nl/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
