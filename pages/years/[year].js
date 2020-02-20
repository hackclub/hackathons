import Error from 'next/error'
import Grouping from '../../components/grouping'
import Years from '../../components/years'
import { map, filter, orderBy, startsWith, split, first, uniq } from 'lodash'
import { getEvents, getGroupingData } from '../../lib/data'

export default ({ year, events, groups }) => {
  if (!year || !events) return <Error statusCode={404} />
  return (
    <Grouping title={`${year} Events`} events={events} groups={groups}>
      <Years showAll />
    </Grouping>
  )
}

export async function unstable_getStaticPaths() {
  let events = await getEvents()
  let starts = map(filter(events, { group_id: null }), 'start')
  starts = map(starts, start => first(split(start, '-')))
  let years = uniq(starts)
  const paths = map(years, year => ({ params: { year } }))
  return { paths }
}

export async function unstable_getStaticProps({ params }) {
  const { year } = params
  let { events, groups } = await getGroupingData()
  events = orderBy(filter(events, e => startsWith(e.start, year)), 'start')
  return { props: { year, events, groups } }
}
