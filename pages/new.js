import { useState } from 'react'
import {
  Container,
  Heading,
  Text,
  Field,
  Box,
  Grid
} from '@theme-ui/components'
import Header from '../components/header'
import EventCard from '../components/event-card'

export default () => {
  const [fields, setFields] = useState({
    website: 'https://myhackathon.com',
    name: 'My hackathon',
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
    parsed_city: '',
    parsed_state_code: '',
    parsed_country: '',
    parsed_country_code: '',
    mlh_associated: '',
    banner: '',
    logo: ''
  })
  const onChange = (e, id) =>
    setFields(data => ({ ...data, [id]: e.target.value }))

  return [
    <Header title="Add your event" key="header" />,
    <Container
      key="body"
      sx={{
        mt: [4, 5],
        display: 'grid',
        gridGap: [4, 5],
        gridTemplateColumns: [null, '3fr 2fr'],
        alignItems: 'start'
      }}
    >
      <Box sx={{ div: { mb: 3 } }}>
        <Field
          label="Name"
          name="name"
          value={fields.name}
          onChange={e => onChange(e, 'name')}
        />
        <Field
          label="Start"
          name="start"
          value={fields.start}
          onChange={e => onChange(e, 'start')}
        />
        <Field
          label="End"
          name="end"
          value={fields.end}
          onChange={e => onChange(e, 'end')}
        />
        <Field
          label="Website"
          name="website"
          type="url"
          value={fields.website}
          onChange={e => onChange(e, 'website')}
        />
        <Field
          label="MLH associated?"
          name="mlh_associated"
          type="checkbox"
          value={fields.mlh_associated}
          onChange={e => onChange(e, 'mlh_associated')}
        />
      </Box>
      <div>
        <EventCard {...fields} />
      </div>
    </Container>
  ]
}
