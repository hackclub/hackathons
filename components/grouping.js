import { Container, Box, Grid, Button, Flex, Card } from 'theme-ui'
import Header from '../components/header'
import EventCard from '../components/event-card'
import { useState } from 'react'
import FilterButton from './filter-button'
import Announcement from './announcement'

export default ({
  title,
  desc,
  header,
  backgroundImage,
  children,
  footer,
  includeNav,
  events,
  useFilter
}) => {
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
      sx={{
        bg: 'background',

        color: 'text',
        textAlign: [null, 'center']
      }}
    >
      <Header
        title={title}
        desc={desc}
        includeMeta
        includeNav={includeNav}
        backgroundImage={backgroundImage}
      >
        {header}
      </Header>
      <Container sx={{ mt: useFilter ? [2, 3, 4] : [3, 4, 5] }}>
        {children}
        {useFilter ? (
          <Box
            sx={{
              display: ['flex', 'inline-flex'],
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              bg: 'sheet',
              mb: [3, 0],
              px: [1, 2, 3],
              borderRadius: 22,
              border: '1px solid',
              borderColor: 'border',
              fontSize: [1, 2]
            }}
          >
            <FilterButton
              color="red"
              filter={filter}
              filterName="online"
              onClick={() => {
                filter === 'online' ? setFilter('') : setFilter('online')
              }}
            >
              Online
            </FilterButton>
            <FilterButton
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
              color="blue"
              filter={filter}
              filterName="inperson"
              onClick={() => {
                filter === 'inperson' ? setFilter('') : setFilter('inperson')
              }}
            >
              In-Person
            </FilterButton>
          </Box>
        ) : null}
        <Announcement
          copyLogo="https://cdn.hackclub.com/019dab4d-10e8-7269-ae5c-3c650522af2f/horizons.svg"
          logoImageMaxWidth="400px"
          href="https://horizons.hackclub.com/?ref=hackathons"
          caption="7 countries, 7 hackathons, the adventure of a lifetime."
          cta="click to see more"
          virtual={false}
          color="primary"
          backgroundImage="https://cdn.hackclub.com/019e370c-04ad-7943-b6b6-5ec4c3409ce8/horizons-bg-with-ferrets-and-lines.png"
          copyColor="#ededed"
          captionColor="black"
          sx={{
            backgroundSize: 'auto 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#f3e6cd',
            minHeight: ['200px', '260px', '320px'],
            alignItems: 'flex-start',
            pt: [3, 4],
            pb: [5, 6],
            maxWidth: 'wide',
            width: '75%'
          }}
        />
        <Grid
          columns={[1, 2, 3]}
          gap={[3, 4]}
          sx={{ mt: useFilter ? [2, 3, 4] : [3, 4, 5] }}
        >
          {events.map(event => (
            <EventCard
              id={event.id}
              key={event.id}
              {...event}
              useFilter={true}
            />
          ))}
        </Grid>
        {footer}
      </Container>
    </Box>
  )
}
