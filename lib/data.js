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

export const getEmailStats = async () => {
  const response = await api_get('v1/stats/hackathons/subscriptions')

  return {
    countries: response.countries.meta.count,
    cities: response.cities.meta.count
  }
}

export const getGroupingData = async () => ({
  events: (await getEvents()) || [],
  emailStats: (await getEmailStats()) || {}
})
