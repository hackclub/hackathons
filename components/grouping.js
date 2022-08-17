import { Container, Box, Grid, Button, Flex } from 'theme-ui'
import Header from '../components/header'
import EventCard from '../components/event-card'
import { useState } from 'react'
import FilterButton from './filter-button'

export default ({ title, desc, header, children, footer, events }) => {
  const [filter, setFilter] = useState('')

  switch (filter) {
    case 'online':
      events = events.filter(event => event.virtual)
      break
    case 'hybrid':
      events = events.filter(event => event.hybrid)
      break
    case 'inperson':
      events = events.filter(event => !event.virtual && !event.hybrid)
      break
  }

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
            mt: [2, 4, 5],
            fontSize: [1, 2]
          }}
        >
          <FilterButton
            sx={{
              borderTopRightRadius: '0',
              borderBottomRightRadius: '0'
            }}
            color="red"
            filter={filter}
            filterName="online"
            onClick={() => {
              filter !== 'online' ? setFilter('online') :  setFilter('')
              console.log(filter)
            }}
          >
            Online
          </FilterButton>
          <FilterButton
            sx={{
              borderRadius: 0,
              borderRight: 'none',
              borderLeft: 'none'
            }}
            color="orange"
            filter={filter}
            filterName="hybrid"
            onClick={() => {
              filter === 'hybrid' ? setFilter('') : setFilter('hybrid')
            }}
          >
            Hybrid
          </FilterButton>
          <FilterButton
            sx={{
              borderTopLeftRadius: '0',
              borderBottomLeftRadius: '0'
            }}
            color="blue"
            filter={filter}
            filterName="inperson"
            onClick={() => {
              filter === 'inperson' ? setFilter('') : setFilter('inperson')
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
