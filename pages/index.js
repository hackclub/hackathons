import Grouping from '../components/grouping'
import { Heading, Text, Link } from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import Signup from '../components/signup'
import Years from '../components/years'
import Regions from '../components/regions'
import { filter, orderBy, slice, last } from 'lodash'
import { timeSince, humanizedDateRange } from '../lib/util'
import { getGroupingData } from '../lib/data'

const title = `Online High School Hackathons in ${new Date().getFullYear()}`
const eventsPreview = (events) =>
  slice(events, 0, 4)
    .map(
      (event) =>
        `${event.name} (${humanizedDateRange(event.start, event.end)})…`
    )
    .join('')

export default ({ stats, emailStats, events }) => (
  <Grouping
    includeMeta={false}
    header={
      <>
        <Head>
          <title>{title}</title>
          <Meta
            title={title}
            description={`${title}. A curated list of high school hackathons with ${
              events.length
            } events in ${stats.state} states + ${
              stats.country
            } countries. Maintained by the Hack Club staff. ${eventsPreview(
              events
            )}`}
          />
        </Head>
        <Heading as="h1" variant="title" sx={{ color: 'primary' }}>
          Online High School Hackathons in {new Date().getFullYear()}
        </Heading>
        <Text variant="subtitle" sx={{ mt: [3, 4], mb: 3 }}>
          A curated list of high school hackathons with {stats.total}
          &nbsp;events in {stats.state}
          &nbsp;states + {stats.country}
          &nbsp;countries. Last&nbsp;updated {stats.lastUpdated}.
        </Text>
        <Text variant="subtitle">
          Maintained by the <Link href="https://hackclub.com/">Hack Club</Link>{' '}
          staff.
        </Text>
        <Signup stats={emailStats} />
      </>
    }
    events={events}
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
  />
)

export const getStaticProps = async () => {
  let { events, emailStats } = await getGroupingData()
  let stats = {
    total: events.length,
    state: new Set(
      events
        .filter((event) =>
          ['US', 'USA', 'United States'].includes(event.country)
        )
        .map((event) => event.state)
    ).size,
    country: new Set(events.map((event) => event.country)).size,
    lastUpdated: timeSince(
      last(orderBy(events, 'createdAt')).createdAt,
      false,
      new Date(),
      true
    )
  }
  // Sort upcoming events by start date
  events = orderBy(
    filter(events, (e) => new Date(e.start) >= new Date()),
    'start'
  )
  return { props: { events, stats, emailStats } }
}
