import { Container, Box, Grid } from 'theme-ui'
import Header from '../components/header'
import EventList from '../components/event-list'

export default ({ title, desc, header, children, footer, events }) => (
  <Box
    as="main"
    sx={{ bg: 'background', color: 'text', textAlign: [null, 'center'] }}
  >
    <Header title={title} desc={desc} children={header} includeMeta />
    <Container sx={{ mt: [3, 4, 5] }}>
      {children}
      <Grid columns={[1, 2, 3]} gap={[3, 4]} sx={{ mt: [3, 4] }}>
        <EventList events={events} />
      </Grid>
      {footer}
    </Container>
  </Box>
)
