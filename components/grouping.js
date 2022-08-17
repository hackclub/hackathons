import { Container, Box, Grid, Button, Flex } from 'theme-ui'
import Header from '../components/header'
import EventCard from '../components/event-card'
import { useState } from 'react'
import FilterButton from './filter-button'

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
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            mt: [2, 4, 5],
            fontSize: [1, 2]
          }}
        >
          <FilterButton
            sx={{
              borderTopRightRadius: '0',
              borderBottomRightRadius: '0',
              borderRight: 'none'
            }}
            color="red"
            onClick={() => {
              setVirtual(virtual ? false : true)
            }}
          >
            Online
          </FilterButton>
          <FilterButton
            sx={{
              borderRadius: 0
            }}
            color="orange"
            onClick={() => {
              setVirtual(virtual ? false : true)
            }}
          >
            Hybrid
          </FilterButton>
          <FilterButton
            sx={{
              borderTopLeftRadius: '0',
              borderBottomLeftRadius: '0',
              borderLeft: 'none'
            }}
            color="blue"
            onClick={() => {
              setInPerson(inPerson ? false : true)
            }}
          >
            In-Person
          </FilterButton>
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
