import sgMail from '@sendgrid/mail'
import AirtablePlus from 'airtable-plus'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
import { humanizedDateRange } from '../../../../lib/util'
import { getSubscribers } from '../../../../lib/data'

const airtable = new AirtablePlus({
  baseID: process.env.AIRTABLE_BASE_ID,
  apiKey: process.env.AIRTABLE_API_KEY,
  tableName: 'applications'
})

function calculateLatLngDistance(lat1, lng1, lat2, lng2) {
  // this is 100% gh copilot and i have no idea how this works
  // ^ that comment was also made by copilot
  const R = 6371e3 // metres
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lng2 - lng1) * Math.PI) / 180

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

// find nearby subscribers using latitude and longitudes, currently unused
// async function nearbySubscribers(lat, lng) {
//   const subscribers = await airtable.read(
//     {
//       // this code is broken and i have no idea how it works
//       // filterByFormula: `AND(DISTANCE(latitude, longitude, ${lat}, ${lng}) < 1, DISTANCE(latitude, longitude, ${lat}, ${lng}) > 0)`
//     },
//     {
//       tableName:
//         process.env.VERCEL_ENV === 'production'
//           ? 'subscribers'
//           : 'subscribers_development'
//     }
//   )
//   subscribers.filter(subscriber => {
//     const distance = calculateLatLngDistance(
//       subscriber.fields.latitude,
//       subscriber.fields.longitude,
//       lat,
//       lng
//     )
//     return distance < 1000 * 100 // 10km
//   })
//   return subscribers.map(s => s.fields['email'])
// }

// find subscribers that have the same city, state, and country as the event
// perhaps we could just check state in the future because people would probably be willing to travel across a state to attend a hackathon
async function nearbySubscribers(city, state, country) {
  const filter = `AND({parsed_city} = '${city}', {parsed_state_code} = '${state}', {parsed_country_code} = '${country}')`

  const subscribers = await getSubscribers(filter)
  return subscribers.map(s => s.fields['email'])
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

  const event = await airtable.find(id)

  let emails = []
  if (
    process.env.VERCEL_ENV === 'development' ||
    process.env.VERCEL_ENV === 'preview'
  ) {
    emails = ['ella@hackclub.com']
  } else {
    emails = await nearbySubscribers(
      event.fields.parsed_city,
      event.fields.parsed_state_code,
      event.fields.parsed_country_code
    )
  }

  const unsubscribeUrl = `https://${process.env.VERCEL_URL}/api/subscribers/unsubscribe?id=${event.fields.id}`

  const msg = {
    to: emails,
    from: 'bank@hackclub.com',
    subject: `${event.fields.name} is coming up! - High School Hackathons`,
    text: `${event.fields.name}, a high school hackathon, is coming up near you. Register at ${event.fields.website}.`,
    html: `
          <p>Hey hacker 👋</p>
          <p>An in-person high school hackathon coming up near
          you. Here are the details:</p>
          <p>
            <strong>${event.fields.name}</strong>
            <br />
            📍 ${event.fields.full_location}
            <br />
            🗓️ ${humanizedDateRange(event.fields.start, event.fields.end)}
            <br />
            🌐 <a href="${event.fields.website}">${event.fields.website}</a>
          </p>
  
          <p>Cheers,<br />The Hack Club Team</p>
          
          <small>PS: If you recently moved, just reply to this email with your new location or ZIP code!</small><br />
          <small>If you are no longer interested in receiving these emails, <a href=${unsubscribeUrl}>use this link</a> to disable notifications for ${
      event.fields.full_location
    }.</small>
          `
  }

  sgMail.sendMultiple(msg).then(
    () => {
      console.log('Updating event in Airtable')
      airtable.updateWhere(`{rec_id} = '${id}'`, {
        subscriber_email_sent: true
      })
    },
    error => {
      console.error(error)

      if (error.response) {
        console.error(error.response.body)
      }
    }
  )

  res.status(200).json({
    message: `Email sent to ${emails.length} subscribers.`
  })
}
