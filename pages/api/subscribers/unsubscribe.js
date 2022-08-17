import AirtablePlus from 'airtable-plus'

const airtable = new AirtablePlus({
  baseID: process.env.AIRTABLE_BASE_ID,
  apiKey: process.env.AIRTABLE_API_KEY,
  tableName:
    process.env.VERCEL_ENV === 'production'
      ? 'subscribers'
      : 'subscribers_development'
})

export default async (req, res) => {
  const { id } = req.query

  const subscriber = await airtable.find(id)
  airtable.updateWhere(`{id} = '${id}'`, {
    unsubscribed_at: Date.now()
  })

  res.status(200).json(subscriber)
}
