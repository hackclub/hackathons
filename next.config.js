const path = require('path')
const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })

const nextConfig = {
  trailingSlash: true,
  pageExtensions: ['js', 'jsx', 'mdx'],
  turbopack: {
    resolveAlias: {
      '@theme-ui/mdx': './lib/theme-ui-mdx-stub.js'
    }
  },
  webpack(config) {
    config.resolve.alias['@theme-ui/mdx'] = path.resolve(__dirname, 'lib/theme-ui-mdx-stub.js')
    return config
  },
  async redirects() {
    return [
      {
        source: '/india',
        destination: '/apac',
        permanent: false
      },
      {
        source: '/list-of-hackathons-in-asia-pacific',
        destination: '/apac',
        permanent: false
      },
      {
        source: '/list-of-hackathons-in-india',
        destination: '/apac',
        permanent: false
      }
    ]
  }
}

module.exports = withMDX(nextConfig)
