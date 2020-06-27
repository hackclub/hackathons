const withMDX = require('@nex/-mdx')({ extension: /\.mdx?$/ })
module.exports = withMDX({ pageExtensions: ['js', 'jsx', 'mdx'] })
