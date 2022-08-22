import AirtablePlus from 'airtable-plus'

const subscribersTable = new AirtablePlus({
  baseID: 'apptapPDAi0eBaaG1',
  apiKey: process.env.AIRTABLE_API_KEY,
  tableName: process.env.AIRTABLE_TABLE_NAME
})

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body

    const submission = await subscribersTable.create({
      email: data.email,
      location: data.location
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
