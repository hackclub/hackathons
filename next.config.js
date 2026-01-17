<<<<<<< HEAD
const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })

=======
const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
>>>>>>> 3195ac3 (Update outdated packages)
const nextConfig = {
  trailingSlash: true,
  pageExtensions: ['js', 'jsx', 'mdx'],
  eslint: {
    ignoreDuringBuilds: true
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
