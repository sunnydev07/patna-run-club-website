/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Served from Vercel, so let Next.js resize/convert the ~41MB of source
    // photos into modern formats instead of shipping the originals.
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
