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
    events={[{...{
      id: 'epoch',
      name: `Hack Club's Epoch`,
      website: 'https://epoch.hackclub.com',
      start: '2022-12-30T17:00:00.000Z',
      end: '2023-01-01T18:30:00.000Z',
      banner:
        'https://cloud-15qevu1zp-hack-club-bot.vercel.app/0assemble_2.png',
      city: 'Gurugram',
      state: 'Delhi NCR',
      lead: `Let's come together to ring in the new year at....`,
      footer: (
        <>
          <b>DEC. 30 2022 TO JAN. 1 2023
            <br />
          Gurugram, Delhi NCR</b> 
          <br />
          ₹12.5 Lakh in Travel Stipends
          <br />DOORS OPEN AT 6PM; 42-HOURS LONG</>),
      hq: true,
      logo: `https://cloud-jzsq7jfvg-hack-club-bot.vercel.app/0group_9.png`
    }}, ...events]}
    footer={
      <section>
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
    useFilter
  >
    <Signup stats={emailStats} />
  </Grouping>
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
  let upcomingEvents = orderBy(
    filter(events, e => new Date(e.end) >= new Date()),
    'start'
  )
  let previousEvents = orderBy(
    filter(events, e => (new Date(e.end) < new Date() && new Date(e.end) >= new Date().setFullYear(new Date().getFullYear() - 1))),
    'start'
  )
  return { props: { events: [ ...upcomingEvents, ...previousEvents ], stats, emailStats }, revalidate: 1 }
}
