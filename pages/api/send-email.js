import sgMail from '@sendgrid/mail'
import AirtablePlus from 'airtable-plus'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const airtable = new AirtablePlus({
  baseID: process.env.AIRTABLE_BASE_ID,
  apiKey: process.env.AIRTABLE_API_KEY,
  tableName: 'applications'
})

export default (req, res) => {
  const { email, eventId, eventName, eventUrl } = req.body

  const msg = {
    to: email,
    from: 'bank@hackclub.com',
    subject: `${eventName} is coming up! - High School Hackathons`,
    text: `${eventName}, a high school hackathon, is coming up near you. Register at ${eventUrl}.`,
    html: `
          <p>Hi there!</p>
          <p>${eventName}, an in-person high school hackathon, is coming up near you!</p>
          <p>Register here: ${eventUrl}</p>
          <p>Cheers,</p>
          <p>The Hack Club Team</p>`
  }

  sgMail.send(msg).then(
    () => {
      console.log('Updating event in Airtable')
      airtable.updateWhere(`{id} = '${eventId}'`, {
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
