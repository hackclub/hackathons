import AirtablePlus from 'airtable-plus'

const subscribersTable = new AirtablePlus({
  baseID: 'apptapPDAi0eBaaG1',
  apiKey: process.env.AIRTABLE_API_KEY,
  tableName: 'subscribers'
})

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body

    const submission = await subscribersTable.create({
      email: data.email,
      location: data.location
      //   latitude: data.latitude,
      //   longitude: data.longitude,
      //   parsed_address: data.parsed_address,
      //   parsed_city: data.parsed_city,
      //   parsed_state: data.parsed_state,
      //   parsed_state_code: data.parsed_state_code,
      //   parsed_country: data.parsed_country,
      //   parsed_country_code: data.parsed_country_code
      //   unsubscribed_at: data.unsubscribed_at,
      //   unsubscribe_token: data.unsubscribe_token,
      //   confirmed_at: data.confirmed_at,
      //   confirmation_token: data.confirmation_token
    })
    const url = 'https://hackathons.hackclub.com'
    const body = JSON.stringify({
      submission
    })
    fetch(url, {
      body,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(r => {
        res.json({ status: 'success' })
        console.log(r.statusText)
      })
      .catch(error => {
        console.log(error)
        res.json({ status: 'Something went wrong', error })
      })
  } else {
    res.status(405).json({ status: 'error', error: 'Must send POST request' })
  }
}
