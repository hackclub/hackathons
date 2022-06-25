import Grouping from '../components/grouping'
import { Box, Heading, Text, Link, Container } from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import Signup from '../components/signup'
import Years from '../components/years'
import Regions from '../components/regions'
import EventCard from '../components/event-card'
import { filter, orderBy, slice, last, remove } from 'lodash'
import { timeSince, humanizedDateRange } from '../lib/util'
import { getGroupingData } from '../lib/data'

const title = `High School Hackathons in ${new Date().getFullYear()}`
const eventsPreview = events =>
  slice(events, 0, 4)
    .map(
      event =>
        `${event.name} (${humanizedDateRange(event.start, event.end)}) … `
    )
    .join('')

export default ({ stats, emailStats, events }) => (
  <Grouping
    includeMeta={false}
    header={
      <>
        <Meta
          as={Head}
          title={title}
          description={`${title}. A curated list of online and in-person high school hackathons with ${
            events.length
          } events in ${stats.state} states + ${
            stats.country
          } countries. Maintained by the Hack Club staff. ${eventsPreview(
            events
          )}`}
        />
        <Heading as="h1" variant="title" sx={{ color: 'primary' }}>
          High School Hackathons{' '}
          <Box as="br" sx={{ display: ['none', 'block'] }} />
          in {new Date().getFullYear()}
        </Heading>
        <Text as="p" variant="subtitle" sx={{ my: 3 }}>
          A curated list of high school hackathons with
          <Box as="br" sx={{ display: ['none', 'block'] }} /> {stats.total}
          &nbsp;events in {stats.state}
          &nbsp;states + {stats.country}
          &nbsp;countries.
        </Text>
        <Text as="p" variant="subtitle">
          {' '}
          Maintained by the <Link href="https://hackclub.com/">
            Hack Club
          </Link>{' '}
          staff.
        </Text>
        
      </>
    }
    events={events}
    footer={
      <section>
        <Signup stats={emailStats} />
        <Heading variant="headline" sx={{ mt: [4, 5], mb: [3, 4] }}>
          Explore by year
        </Heading>
        <Years />
        <Heading variant="headline" sx={{ mt: [4, 5], mb: [3, 4] }}>
          Explore popular regions
        </Heading>
        <Regions />
      </section>
    }
  > 
  <EventCard
    {...{
      id: 'assemble',
      name: 'Hack Club Assemble',
      website: 'https://assemble.hackclub.com',
      start: '2022-08-05T17:00:00.000Z',
      end: '2022-08-07T18:30:00.000Z',
      banner:
        'https://cloud-7rzmfbze1-hack-club-bot.vercel.app/0golden-bay.png',
      city: 'San Francisco',
      state: 'CA',
      lead: `Let's start an IRL hackathon renaissance at...`,
      footer: `August 5-7 ~ Figma's San Francisco HQ ~ $40k in Travel Stipends ~ Fully Open Sourced`,
      hq: true
    }}
  /></Grouping>
)

export const getStaticProps = async () => {
  let { events, emailStats } = await getGroupingData()
  let stats = {
    total: events.length,
    state: new Set(
      events
        .filter(event => ['US', 'USA', 'United States'].includes(event.country))
        .map(event => event.state)
    ).size,
    country: new Set(events.map(event => event.country)).size,
    lastUpdated: timeSince(
      last(orderBy(events, 'createdAt')).createdAt,
      false,
      new Date(),
      true
    )
  }
  // Sort upcoming events by start date
  events = orderBy(
    filter(events, e => new Date(e.start) >= new Date()),
    'start'
  )
  return { props: { events, stats, emailStats }, revalidate: 1 }
}
