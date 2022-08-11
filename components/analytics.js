import Script from 'next/script'

const Analytics = () => (
  <Script
    defer
    data-domain="hackathons.hackclub.com"
    src="https://plausible.io/js/plausible.js"
  />
)

export default Analytics
