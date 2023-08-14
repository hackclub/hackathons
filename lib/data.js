export const api_url_for = path =>
  process.env.NEXT_PUBLIC_HACKATHONS_API_URL + path
const getJSON = url => fetch(url).then(r => r.json())
const api_get = path => getJSON(api_url_for(path))

export const MODALITY = {
  IN_PERSON: 'in_person',
  VIRTUAL: 'online',
  HYBRID: 'hybrid'
}

export const getEvents = async ({ upcoming } = { upcoming: false }) => {
  let response = await api_get('v1/hackathons')

  let events = response.data

  events = events.map(event => ({
    id: event.id,
    name: event.name,
    website: event.website || '',
    start: event.starts_at,
    end: event.ends_at,
    createdAt: event.created_at,
    logo: event.logo_url,
    banner: event.banner_url,
    city: event.location.city,
    state: event.location.province,
    country: event.location.country,
    countryCode: event.location.country_code,
    latitude: event.location.latitude,
    longitude: event.location.longitude,
    virtual: event.modality === MODALITY.VIRTUAL,
    hybrid: event.modality === MODALITY.HYBRID,
    mlhAssociated: false, // This field is deprecated
    apac: event.apac
  }))

  if (upcoming) {
    const now = new Date()
    events = events.filter(event => {
      const start = new Date(event.start)
      return start > now
    })
  }

  // Remove events missing required keys
  const requiredKeys = ['id', 'name', 'website', 'start', 'end']
  events = events.filter(e => {
    var missingRequired = false
    requiredKeys.forEach(key => {
      if (typeof e[key] === 'undefined' || e[key] === '') {
        missingRequired = true
      }
    })
    return !missingRequired
  })

  // Fill in `undefined` values with empty strings
  events = events.map(e => {
    Object.keys(e).forEach(key => {
      if (typeof e[key] === 'undefined') e[key] = ''
    })
    return e
  })

  return events
}

const uniquify = arr => [...new Set(arr)]

export const getEmailStats = async () => {
  const select = { fields: ['parsed_city', 'parsed_country_code'] }
  const subscribers = await getJSON(
    `https://api2.hackclub.com/v0.1/hackathons.hackclub.com/${subscriberTable}?select=${JSON.stringify(
      select
    )}&authKey=${process.env.AIRTABLE_API_KEY}`
  )

  return {
    countries: uniquify(subscribers.map(s => s.fields.parsed_country_code)).length,
    cities: uniquify(subscribers.map(s => s.fields.parsed_city)).length,
  }
}

export const getGroupingData = async () => ({
  events: (await getEvents()) || [],
  emailStats: (await getEmailStats()) || {}
})

const subscriberTable =
  process.env.VERCEL_ENV === 'production'
    ? 'subscribers'
    : 'subscribers_development'

export const getSubscriber = async id => {
  const select = { filterByFormula: `{id} = '${id}'`, maxRecords: 1 }
  let subscribers = await getJSON(
    `https://api2.hackclub.com/v0.1/hackathons.hackclub.com/${subscriberTable}?select=${JSON.stringify(
      select
    )}&authKey=${process.env.AIRTABLE_API_KEY}`
  )
  return subscribers[0]
}

export const getSubscribers = async (formula = 'TRUE()') => {
  const filterByFormula = `AND(unsubscribed = FALSE(), ${formula})`

  const select = { filterByFormula: filterByFormula }
  const url = `https://api2.hackclub.com/v0.1/hackathons.hackclub.com/${subscriberTable}?select=${JSON.stringify(
    select
  )}&authKey=${process.env.AIRTABLE_API_KEY}`
  let subscribers = await getJSON(url)

  return subscribers
}

export const updateSubscriber = async (id, fields) => {
  return await fetch(
    `https://api2.hackclub.com/v0.1/hackathons.hackclub.com/${subscriberTable}?authKey=${process.env.AIRTABLE_API_KEY}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, fields })
    }
  ).then(r => r.json())
}
