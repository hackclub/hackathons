import sgMail from '@sendgrid/mail'
import AirtablePlus from 'airtable-plus'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const airtable = new AirtablePlus({
  baseID: process.env.AIRTABLE_BASE_ID,
  apiKey: process.env.AIRTABLE_API_KEY,
  tableName: 'applications'
})

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

  const msg = {
    to: email,
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
