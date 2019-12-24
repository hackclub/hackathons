import Grouping from '../components/grouping'
import { Heading, Text, Link } from '@theme-ui/components'
import Signup from '../components/signup'
import Years from '../components/years'
import fetch from 'isomorphic-unfetch'
import { filter, orderBy } from 'lodash'
import { timeSince } from '../lib/util'

export default ({ stats, emailStats, events, groups }) => (
  <Grouping
    title={`Upcoming High School Hackathons in ${new Date().getFullYear()}`}
    header={
      <>
        <Text variant="subtitle" sx={{ mt: [3, 4], mb: 3 }}>
          A curated list of high school hackathons with {stats.total}
          &nbsp;events in {stats.state}&nbsp;states + {stats.country}
          &nbsp;countries.
        </Text>
        <Text variant="subtitle">
          Maintained by the <Link href="https://hackclub.com">Hack Club</Link>{' '}
          staff. Last&nbsp;updated {stats.lastUpdated}.
        </Text>
        <Signup stats={emailStats} />
      </>
    }
    events={events}
    groups={groups}
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
  let stats = {
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
    filter(events, e => new Date(e.start) >= new Date()),
    'start'
  )
  let groups = await fetch('https://api.hackclub.com/v1/events/groups')
  groups = await groups.json()
  let emailStats = await fetch(
    'https://api.hackclub.com/v1/event_email_subscribers/stats'
  )
  emailStats = await emailStats.json()
  return { props: { events, groups, stats, emailStats } }
}
