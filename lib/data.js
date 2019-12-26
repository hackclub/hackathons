import fetch from 'isomorphic-unfetch'

export const getJSON = async path => {
  let records = await fetch(`https://api.hackclub.com/v1${path}`)
  records = await records.json()
  return records
}

export const getEvents = () => getJSON('/events')
export const getGroups = () => getJSON('/events/groups')
export const getEmailStats = () => getJSON('/event_email_subscribers/stats')

export const getGroupingData = async () => ({
  events: (await getEvents()) || [],
  groups: (await getGroups()) || [],
  emailStats: (await getEmailStats()) || {}
})
