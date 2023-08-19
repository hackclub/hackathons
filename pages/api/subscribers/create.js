import AirtablePlus from 'airtable-plus'
import { geocode } from './[id]/geocode'

const subscribersTable = new AirtablePlus({
  baseID: 'apptapPDAi0eBaaG1',
  apiKey: process.env.AIRTABLE_API_KEY,
  tableName:
    process.env.VERCEL_ENV == 'production'
      ? 'subscribers'
      : 'subscribers_development'
})

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body

    const location = await geocode(data.location)

    // add new submission to Airtable
    const submission = await subscribersTable.create({
      email: data.email,
      location: data.location,
      ...location
    })
    res.status(200).send(submission)
  } else {
    res.status(405).json({ status: 'error', error: 'Must send POST request' })
  }
}
