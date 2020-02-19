import fetch from 'isomorphic-unfetch'

export const getJSON = async path => {
  let records = await fetch(path)
  records = await records.json()
  return records
}

const cleanEventRecords = (records) => {
	let newRecords = []

	records.forEach((record) => {
		let newRecord = record['fields']

		console.log(newRecord)
		console.log(newRecord.logo)

		newRecord['logo'] = (newRecord.logo !== undefined && newRecord.logo.length > 0) ? newRecord.logo[0].url : null
		newRecord['banner'] = (newRecord.banner !== undefined && newRecord.banner.length > 0) ? newRecord.banner[0].url : null

		console.log(newRecord)

		newRecords.push(newRecord)
	})

	return newRecords
}

export const getEvents = async () => {
	let cleaned = cleanEventRecords(await getJSON('https://api2.hackclub.com/v0/appSII8fzkQ1U8kvi/applications'))

	return cleaned.filter(e => e.approved == true)
}
export const getEmailStats = () => getJSON('https://api.hackclub.com/v1/event_email_subscribers/stats')

export const getGroupingData = async () => ({
  events: (await getEvents()) || [],
  emailStats: (await getEmailStats()) || {}
})
