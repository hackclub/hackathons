import Grouping from '../components/grouping'
import { Heading, Text, Link } from '@theme-ui/components'
import Meta from '../components/meta'
import Signup from '../components/signup'
import Years from '../components/years'
import Regions from '../components/regions'
import { filter, orderBy, slice } from 'lodash'
import { timeSince, humanizedDateRange } from '../lib/util'
import { getGroupingData } from '../lib/data'

const title = `Upcoming High School Hackathons in ${new Date().getFullYear()}`
const eventsPreview = events =>
  slice(events, 0, 4)
    .map(
      event => `${event.name} (${humanizedDateRange(event.start, event.end)})…`
    )
    .join('')

export default ({ stats, emailStats, events, groups }) => (
  <Grouping
    includeMeta={false}
    title={title}
    header={
      <>
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
        <Text variant="subtitle" sx={{ mt: [3, 4], mb: 3 }}>
          A curated list of high school hackathons with {stats.total}
          &nbsp;events in {stats.state}&nbsp;states + {stats.country}
          &nbsp;countries.
        </Text>
        <Text variant="subtitle">
          Maintained by the <Link href="https://hackclub.com">Hack Club</Link>{' '}
          staff.
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
        <Heading variant="headline" sx={{ mt: [4, 5], mb: [3, 4] }}>
          Explore popular regions
        </Heading>
        <Regions />
      </section>
    }
  />
)

export async function unstable_getStaticProps() {
  let { events, groups, emailStats } = await getGroupingData()
  let stats = {
    total: events.length,
    state: new Set(
      events
        .filter(event =>
          ['US', 'USA', 'United States'].includes(event.fields.country)
        )
        .map(event => event.fields.state)
    ).size,
    country: new Set(events.map(event => event.fields.country)).size
  }
  events = orderBy(
    filter(events, e => new Date(e.fields.start_date) >= new Date()),
    'fields.start_date'
  )
  return { props: { events, groups, stats, emailStats } }
}
