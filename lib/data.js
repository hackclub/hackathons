import fetch from 'isomorphic-unfetch'

export const getJSON = async url => {
  let records = await fetch(url)
  records = await records.json()
  return records
}

export const getEvents = () =>
  getJSON(
    'https://api2.hackclub.com/v0/hackathons.hackclub.com/applications?select=%7B%22filterByFormula%22:%22approved=1%22%7D'
  )
export const getEmailStats = () =>
  getJSON('https://api.hackclub.com/v1/event_email_subscribers/stats')

export const getGroupingData = async () => ({
  events: (await getEvents()) || [],
  emailStats: (await getEmailStats()) || {}
})
