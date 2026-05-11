/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [],
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
