import fetch from 'isomorphic-unfetch'
import { filter } from 'lodash'

export const getJSON = (url) => fetch(url).then((r) => r.json())

const normalizeWebsite = (url) => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  } else {
    return 'http://' + url
  }
}

export const getEvents = async () => {
  let events = await getJSON(
    'https://api2.hackclub.com/v0/hackathons.hackclub.com/applications?select=%7B%22filterByFormula%22:%22approved=1%22%7D'
  )
  events = filter(events, 'fields.approved')
  events = events.map(
    ({ id, fields: { name, website, start, end, ...fields } }) => ({
      id,
      name,
      website: normalizeWebsite(website),
      start,
      end,
      createdAt: fields.created_at,
      logo: fields.logo?.[0]?.thumbnails?.large?.url,
      banner: fields.banner?.[0]?.thumbnails?.large?.url,
      city: fields.parsed_city,
      state: fields.parsed_state_code,
      country: fields.parsed_country,
      countryCode: fields.parsed_country_code,
      latitude: fields.lat,
      longitude: fields.lng,
      virtual: fields.virtual,
      mlhAssociated: fields.mlh_associated || false
    })
  )
  events = events.map((e) => {
    Object.keys(e).forEach((key) => {
      if (typeof e[key] === 'undefined') e[key] = ''
    })
    return e
  })
  return events
}

export const getEmailStats = () =>
  getJSON('https://api.hackclub.com/v1/event_email_subscribers/stats')

export const getGroupingData = async () => ({
  events: (await getEvents()) || [],
  emailStats: (await getEmailStats()) || {}
})
