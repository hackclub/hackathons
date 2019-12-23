import Grouping from '../components/grouping'
import { Heading, Text, Link } from '@theme-ui/components'
import Years from '../components/years'
import fetch from 'isomorphic-unfetch'
import { filter, orderBy } from 'lodash'
import { timeSince } from '../lib/util'

export default ({ stats, events }) => (
  <Grouping
    title={`Upcoming High School Hackathons in ${new Date().getFullYear()}`}
    header={
      <>
        <Text variant="subtitle" sx={{ mt: 4 }}>
          A curated list of high school hackathons with {stats.total} events in{' '}
          {stats.state} states + {stats.country} countries.
        </Text>
        <Text variant="subtitle" sx={{ mt: 3 }}>
          Maintained by the <Link href="https://hackclub.com">Hack Club</Link>{' '}
          staff. Last updated {stats.lastUpdated}.
        </Text>
      </>
    }
    events={events}
    footer={
      <section>
        <Heading variant="headline" sx={{ mt: [4, 5], mb: [3, 4] }}>
          Explore by year
        </Heading>
        <Years />
      </section>
    }
  />
)

export async function unstable_getStaticProps() {
  let events = await fetch('https://api.hackclub.com/v1/events')
  events = await events.json()
  const stats = {
    total: events.length,
    state: new Set(
      events
        .filter(event => event.parsed_country_code === 'US')
        .map(event => event.parsed_state)
    ).size,
    country: new Set(events.map(event => event.parsed_country)).size,
    lastUpdated: timeSince(
      Math.max(...events.map(e => Date.parse(e.updated_at))),
      false,
      new Date(),
      true
    )
  }
  events = orderBy(
    filter(events, e => e.group_id === null && new Date(e.start) >= new Date()),
    'start'
  )
  return { props: { events, stats } }
}
