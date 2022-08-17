import sgMail from '@sendgrid/mail'
import AirtablePlus from 'airtable-plus'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const airtable = new AirtablePlus({
  baseID: process.env.AIRTABLE_BASE_ID,
  apiKey: process.env.AIRTABLE_API_KEY,
  tableName: 'applications'
})

function calculateLatLngDistance(lat1, lng1, lat2, lng2) {
  // this is 100% gh copilot and i have no idea how this works
  // ^ that comment was also made by copilot
  const R = 6371e3 // metres
  const φ1 = lat1 * Math.PI / 180
  const φ2 = lat2 * Math.PI / 180
  const Δφ = (lat2 - lat1) * Math.PI / 180
  const Δλ = (lng2 - lng1) * Math.PI / 180

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

async function nearbySubscribers(lat, lng) {
  const subscribers = await airtable.findAll({
    filterByFormula: `AND(DISTANCE(latitude, longitude, ${lat}, ${lng}) < 1, DISTANCE(latitude, longitude, ${lat}, ${lng}) > 0)`
  })
  subscribers.filter(subscriber => {
    const distance = calculateLatLngDistance(subscriber.fields.latitude, subscriber.fields.longitude, lat, lng)
    return distance < 1000 * 100 // 10km
  })
  return subscribers
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

  // gib email (for event)
  const { id } = req.params

  const event = await airtable.find(id)

  const emails = ({ event }) => {
    // given an event, get the emails of subscribers that are nearby
    return 'ella@hackclub.com'
  }

  const msg = {
    to: emails,
    from: 'bank@hackclub.com',
    subject: `${event.name} is coming up! - High School Hackathons`,
    text: `${event.name}, a high school hackathon, is coming up near you. Register at ${eventUrl}.`,
    html: `
          <p>Hey hacker 👋</p>
          <p>Word on the street is that there's a new in-person high school hackathon coming up near
          you. Here are the details:</p>
          <p>
            <strong>${event.name}</strong>
            <br />
            📍 eventLocation
            <br />
            🗓️ eventDate
            <br />
            🌐 <a href="${event.website}">${event.website}</a>
          </p>
  
          <p>Cheers,<br />The Hack Club Bank Team</p>
          
          <small>PS: If you recently moved, just reply to this email with your new location or ZIP code!</small>
          `
  }

  sgMail.send(msg).then(
    () => {
      console.log('Updating event in Airtable')
      airtable.updateWhere(`{recordId} = '${id}'`, {
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
    message: 'Email sent'
  })
}
