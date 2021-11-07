const nextConfig = {
  experimental: { trailingSlash: true },
  pageExtensions: ['js', 'jsx', 'mdx'],
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  }
}
const withPlugins = require('next-compose-plugins')

const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })

module.exports = withPlugins([withMDX], nextConfig)
