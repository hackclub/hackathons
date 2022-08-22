// given an "id" parameter, geocode the given airtable user and return {ok: true} if successful
import { Client } from '@googlemaps/google-maps-services-js'
import { getSubscriber, updateSubscriber } from '../../../../lib/data'

async function geocode(address) {
  const client = new Client({ key: process.env.GOOGLE_MAPS_API_KEY })
  const { data } = await client.geocode({
    params: {
      address,
      key: process.env.GOOGLE_MAPS_API_KEY
    }
  })
  const result = data.results[0]
  return {
    latitude: result?.geometry?.location?.lat?.toString(),
    longitude: result?.geometry?.location?.lng?.toString(),
    parsed_address: result?.formatted_address,
    parsed_city: result?.address_components?.find(c =>
      c.types.includes('locality')
    )?.long_name,
    parsed_state: result?.address_components?.find(c =>
      c.types.includes('administrative_area_level_1')
    )?.long_name,
    parsed_country: result?.address_components?.find(c =>
      c.types.includes('country')
    )?.long_name,
    parsed_state_code: result?.address_components?.find(c =>
      c.types.includes('administrative_area_level_1')
    )?.short_name,
    parsed_postal_code: result?.address_components
      ?.find(c => c.types.includes('postal_code'))
      ?.long_name?.toString(),
    parsed_country_code: result?.address_components?.find(c =>
      c.types.includes('country')
    )?.short_name
  }
}

export default async (req, res) => {
  const token = process.env.TOKEN
  if (!token) {
    return res
      .status(200)
      .json({ msg: 'No token set, are you in dev/preview?' })
  }

  const authed = req.headers['authorization'] == 'Bearer ' + token

  if (!authed) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { id } = req.query

  const subscriber = await getSubscriber(id)

  const { location } = subscriber.fields
  const fields = await geocode(location)

  const result = await updateSubscriber(id, fields)
  res.json({ ok: true, result })
}
