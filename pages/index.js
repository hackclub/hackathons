import Grouping from '../components/grouping'
import Announcement from '../components/announcement'
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

export default ({ stats, emailStats, events, header }) => (
  <Grouping
    backgroundImage={header}
    includeMeta={false}
    includeNav={true}
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
        <Heading as="h1" variant="title" sx={{ color: 'primary', textShadow: 'elevated' }}>
          Upcoming High School Hackathons{' '}
          in {new Date().getFullYear()}
        </Heading>
        <Text as="p" variant="subtitle" sx={{ my: 3, color: 'white', textShadow: 'text'  }}>
          A curated list of high school hackathons with
          <Box as="br" sx={{ display: ['none', 'block'] }} /> {stats.total}
          &nbsp;events in {stats.state}
          &nbsp;states + {stats.country}
          &nbsp;countries.
        </Text>
        <Announcement
          copy="Organizing a hackathon? Hack Club is here to help."
          caption="This year, we've got $500 grants, fee-free usage of Hack Club Bank and an incredible community of organizers."
          href="https://epoch.hackclub.com"
          color="primary"
        />
      </>
    }
    events={events}
    footer={
      <section>
        <Box mt={[3, 4, 5]}>
          <Signup />
        </Box>
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
  />
)

export const getStaticProps = async () => {
  let { events, emailStats } = await getGroupingData()
  let headerImages = ["/header.jpg", "https://cloud-fiuzhcn11-hack-club-bot.vercel.app/0img_8991__2_.jpg", "https://cloud-bu0rfj04y-hack-club-bot.vercel.app/1screenshot_2023-08-05_at_1.12.01_pm.jpg", "https://cloud-bu0rfj04y-hack-club-bot.vercel.app/0assemble.jpg", "https://cloud-l0he31p7o-hack-club-bot.vercel.app/002e3fdc31-5201-42cf-99ca-b0c875875994.jpeg"]
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
    'start',
    'desc'
  )
  return { props: { events: [ ...upcomingEvents, ...previousEvents ], stats, emailStats, header: headerImages[Math.floor(Math.random() * headerImages.length)] }, revalidate: 1 }
}
