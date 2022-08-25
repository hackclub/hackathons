import { getEvents } from '../../../lib/data'

export default async (req, res) => {
  let events = await getEvents('DATETIME_DIFF(start,TODAY()) > 0')
  events = events.filter(e => (new Date(e.start) > new Date()))
  res.json(events)
}
