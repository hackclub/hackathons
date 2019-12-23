import { Container, Box, Heading, Text, Grid } from '@theme-ui/components'
import Header from '../components/header'
import EventCard from '../components/event-card'

export default ({ title, description, header, children, footer, events }) => (
  <Box as="main" sx={{ bg: 'background', color: 'text', textAlign: 'center' }}>
    <Header
      title={title}
      description={description}
      children={header}
      includeMeta
    />
    <Container sx={{ mt: [3, 4, 5] }}>
      {children}
      <Grid columns={[1, 2, 3]} gap={[3, 4]} sx={{ mt: [3, 4] }}>
        {events.map(event => (
          <EventCard {...event} key={event.id} />
        ))}
      </Grid>
      {footer}
    </Container>
  </Box>
)
