import { Container, Box, Grid, Button, Flex } from 'theme-ui'
import Header from '../components/header'
import EventCard from '../components/event-card'
import { useState } from 'react'

export default ({ title, desc, header, children, footer, events }) => {
  const [filter, setFilter] = useState(false)
  const [virtual, setVirtual] = useState(false)
  const [inPerson, setInPerson] = useState(false)

  if (virtual) events = events.filter(event => event.virtual)
  else if (inPerson) events = events.filter(event => !event.virtual)

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
        <Flex
          sx={{
            mt: [2, 4, 5],
            mb: [1, 2, 3],
            fontSize: [1, 2],
            textAlign: 'center'
          }}
        >
          <Button
            sx={{

              borderTopRightRadius: '0',
              borderBottomRightRadius: '0',
            }}
            onClick={() => {
              setVirtual(virtual ? false : true)
            }}
            variant={virtual ? 'outline' : 'primary'}
          >
            Online
          </Button>
          <Button
            sx={{

              borderTopLeftRadius: '0',
              borderBottomLeftRadius: '0'
            }}
            onClick={() => {
              setInPerson(inPerson ? false : true)
            }}
            variant={inPerson ? 'outline' : 'primary'}
          >
            In-Person
          </Button>
        </Flex>

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
