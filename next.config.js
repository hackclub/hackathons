const nextConfig = {
  experimental: { trailingSlash: true },
  pageExtensions: ['js', 'jsx', 'mdx'],
  eslint: {
    ignoreDuringBuilds: true
  }
}
const withPlugins = require('next-compose-plugins')

const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })

module.exports = withPlugins([withMDX], nextConfig)
