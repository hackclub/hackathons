// hackathons.hackclub.com/api/country gets the country of the user in the format
// { range: [ 28966912, 29097983 ], country: 'IN' }
// If the country is "IN", they will see the banner on the homepage
export default function handler(req, res) {
  try {
    const geoip = require('geoip-country')
    const ip = req.headers['x-forwarded-for']
      ? req.headers['x-forwarded-for']
      : '1.187.255.255' // defaults to IP in APAC
    console.log(geoip.lookup(ip))
    console.log('IP is ', geoip.pretty(ip))
    res.json(geoip.lookup(ip))
  } catch (e) {
    res.json({ countryNotFound: true })
  }
}
