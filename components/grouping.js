import { Container, Box, Grid } from '@theme-ui/components'
import Header from '../components/header'
import EventList from '../components/event-list'

export default ({
  title,
  description,
  header,
  children,
  footer,
  events,
  groups
}) => (
  <Box
    as="main"
    sx={{ bg: 'background', color: 'text', textAlign: [null, 'center'] }}
  >
    <Header
      title={title}
      description={description}
      children={header}
      includeMeta
    />
    <Container sx={{ mt: [3, 4, 5] }}>
      {children}
      <Grid columns={[1, 2, 3]} gap={[3, 4]} sx={{ mt: [3, 4] }}>
        <EventList events={events} groups={groups} />
      </Grid>
      {footer}
    </Container>
  </Box>
)
