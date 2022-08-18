// given an "id" parameter, geocode the given airtable user and return {ok: true} if successful
import {Client} from "@googlemaps/google-maps-services-js"
import { getSubscriber, updateSubscriber } from "../../../../lib/data"

async function geocode(address) {
  const client = new Client({key: process.env.GOOGLE_MAPS_API_KEY})
  const { data } = await client.geocode({
    params: {
      address,
      key: process.env.GOOGLE_MAPS_API_KEY
    }
  })
  return data.results[0].geometry.location
}

export default async (req, res) => {
  const token = process.env.TOKEN
  if (!token) {
    return res
      .status(200)
      .json({ msg: 'No token set, are you in dev/preview?' })
  }

  const authed = req.headers['Authorization'] == 'Bearer ' + token

  if (!authed) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { id } = req.query

  const subscriber = await getSubscriber(id)

  const { location } = subscriber.fields
  const { lat, lng } = await geocode(location)
  
  const result = await updateSubscriber(id, {
    latitude: lat.toString(),
    longitude: lng.toString(),
  })
  res.json({ok: true, result})
}