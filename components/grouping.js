import { Container, Box, Grid } from 'theme-ui'
import Header from '../components/header'
import EventCard from '../components/event-card'
import { useState } from 'react'

export default ({ title, desc, header, children, footer, events }) => {
  const [filter, setFilter] = useState(false);
  const [virtual, setVirtual] = useState(false);

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
        <Container sx={{ mt: [2, 4, 5] }}></Container>
        <Grid columns={[1, 2, 3]} gap={[3, 4]} sx={{ mt: [3, 4, 5] }}>
          {events
            .filter(event => event.virtual === true )
            .map(event => (
              <EventCard id={event.id} key={event.id} {...event} />
            ))}
        </Grid>
        {footer}
      </Container>
    </Box>
  )
}
