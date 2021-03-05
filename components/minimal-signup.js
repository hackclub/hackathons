import { useState } from 'react'
import {
  Card,
  Heading,
  Text,
  Grid,
  Label,
  Input,
  Button,
  Spinner,
  Alert
} from 'theme-ui'
import { AlertTriangle, Send } from 'react-feather'

const Loading = () => (
  <Spinner
    size={24}
    color="currentColor"
    sx={{ margin: '0 !important', textAlign: 'center', minWidth: '52px' }}
  />
)

export default ({ initialLocation, stats = {} }) => {
  const [email, setEmail] = useState('')
  const [location, setLocation] = useState(
    initialLocation ? initialLocation.replace('the ', '') : ''
  )
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const onSubmit = async e => {
    e.preventDefault()
    if (email.length < 3 || location.length < 3) return
    setSubmitting(true)
    try {
      window.analytics.identify({ email })
      window.analytics.track('Submitted Email', { email, location })
    } catch (err) {
      console.error(err)
    }
    let submission = await fetch(
      'https://api.hackclub.com/v1/event_email_subscribers',
      {
        method: 'POST',
        body: JSON.stringify({ email, location, timestamp: new Date() }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    if (submission.ok) {
      submission = await submission.json()
      setEmail('')
      setLocation('')
      setSubmitting(false)
      setDone(true)
    } else {
      submission = await submission.json()
      setSubmitting(false)
      setError(submission.errors || 'Something went wrong')
    }
  }
  return (
    <Card sx={{ maxWidth: 'narrowPlus', mx: 'auto', mt: [3, 4] }}>
      <Grid
        as="form"
        onSubmit={onSubmit}
        gap={[2, 3]}
        sx={{
          mt: [null, 0],
          gridTemplateColumns: [null, '4fr 1fr auto'],
          textAlign: 'left',
          alignItems: 'end',
          input: { bg: 'sunken' }
        }}
      >
        <div>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder={`Get Email Notifications for HS Hackathons in ${location} `}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div style={{ display: 'none' }}>
          <Input
            id="location"
            placeholder="Chicago, IL"
            value={location}
            sx={{ display: 'none' }}
            onChange={e => setLocation(e.target.value)}
          />
        </div>
        <Button type="submit" sx={{ mt: [2, 0] }}>
          {submitting ? <Loading /> : 'Sign Up'}
        </Button>
      </Grid>
      {error && (
        <Alert variant="primary" sx={{ mt: [2, 3] }}>
          <AlertTriangle />
          <Text sx={{ ml: 2 }}>
            {typeof error === 'string'
              ? error
              : [
                  error.email && `Email ${error.email.join(', ')}`,
                  error.location && `Location ${error.location.join(', ')}`
                ].join('\n')}
          </Text>
        </Alert>
      )}
      {done && (
        <Alert variant="primary" sx={{ bg: 'green', mt: [2, 3] }}>
          <Send />
          <Text sx={{ ml: 2 }}>Signed up!</Text>
        </Alert>
      )}
    </Card>
  )
}
