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
} from '@theme-ui/components'
import { AlertTriangle, Send } from 'react-feather'
import fetch from 'isomorphic-unfetch'

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
    <Card
      variant="sunken"
      sx={{ maxWidth: 'narrowplus', mx: 'auto', mt: [3, 4] }}
    >
      <Heading as="h2" variant="subheadline" sx={{ mb: 1 }}>
        Want to hear when events are added in your area?
      </Heading>
      <Text sx={{ color: 'muted' }}>
        Join thousands of subscribers from {stats.cities}
        &nbsp;cities&nbsp;+&nbsp;
        {stats.countries}&nbsp;countries.
      </Text>
      <Grid
        as="form"
        onSubmit={onSubmit}
        gap={[2, 3]}
        sx={{
          mt: [null, 3],
          gridTemplateColumns: [null, '1fr 1fr auto'],
          textAlign: 'left',
          alignItems: 'end'
        }}
      >
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="me@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="Chicago, IL"
            value={location}
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
