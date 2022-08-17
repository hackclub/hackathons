import { Container, Box, Grid, Button } from 'theme-ui'
import Header from '../components/header'
import EventCard from '../components/event-card'
import { useState } from 'react'

export default ({ title, desc, header, children, footer, events }) => {
  const [filter, setFilter] = useState(false)
  const [virtual, setVirtual] = useState(false)

  if (filter) events = events.filter(event => event.virtual === virtual)

  return (
    <Box
      as="main"
      sx={{ bg: 'background', color: 'text', textAlign: [null, 'center'] }}
    >
      <Header title={title} desc={desc} includeMeta>
        {header}
      </Header>
      <Container sx={{ mt: [3, 4, 5] }}>
        {children}
        <Container
          sx={{
            mt: [2, 4, 5],
            display: 'flex',
            fontSize: [2, 3],
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Button
            sx={{ mx: [1, 2, 3] }}
            onClick={() => {
              setFilter(true)
              setVirtual(true)
            }}
          >
            Online
          </Button>
          <Button
            sx={{ mx: [1, 2, 3] }}
            onClick={() => {
              setFilter(true)
              setVirtual(false)
            }}
          >
            In-Person
          </Button>
        </Container>
        <Grid columns={[1, 2, 3]} gap={[3, 4]} sx={{ mt: [3, 4, 5] }}>
          {events.map(event => (
            <EventCard id={event.id} key={event.id} {...event} />
          ))}
        </Grid>
        {footer}
      </Container>
    </Box>
  )
}
