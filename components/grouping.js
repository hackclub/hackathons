import { Container, Box, Grid } from 'theme-ui'
import Header from '../components/header'
import EventCard from '../components/event-card'

export default ({ title, desc, header, children, footer, events }) => (
  <Box
    as="main"
    sx={{ bg: 'background', color: 'text', textAlign: [null, 'center'] }}
  >
    <Header title={title} desc={desc} children={header} includeMeta />
    <Container sx={{ mt: [3, 4, 5] }}>
      {children}
      <Grid columns={[1, 2, 3]} gap={[3, 4]} sx={{ mt: [3, 4] }}>
        {events.map(event => (
          <EventCard id={event.id} key={event.id} {...event.fields} />
        ))}
      </Grid>
      {footer}
    </Container>
  </Box>
)
