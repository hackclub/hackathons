import Grouping from '../components/grouping'
import { Heading } from '@theme-ui/components'
import Years from '../components/years'
import fetch from 'isomorphic-unfetch'
import { filter, orderBy } from 'lodash'

export default ({ events }) => (
  <Grouping
    title="High School Hackathons"
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
  events = orderBy(
    filter(events, e => e.group_id === null && new Date(e.start) >= new Date()),
    'start'
  )
  return { props: { events } }
}
