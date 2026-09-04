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
          copyLogo="https://cdn.hackclub.com/01a0686a-014e-7fc7-9126-9d93991b676c/logo.png"
          logoImageMaxWidth="240px"
          href="https://haven.hackclub.com/?ref=hackathons"
          caption={'Game jams in 200+ cities worldwide\nFind one in your city!'}
          cta="click to see more"
          virtual={false}
          color="primary"
          backgroundImage="https://cdn.hackclub.com/01a06871-efc5-7f9b-80cd-dc1102904a42/haven-hero-bg-cropped.webp"
          copyColor="#ededed"
          captionColor="white"
          sx={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#f3e6cd',
            minHeight: ['200px', '260px', '320px'],
            alignItems: 'center',
            justifyContent: 'center',
            pt: [4, 5],
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
