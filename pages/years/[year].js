import Error from 'next/error'
import Grouping from '../../components/grouping'
import Years from '../../components/years'
import { map, filter, orderBy, startsWith, split, first, uniq } from 'lodash'
import { getEvents } from '../../lib/data'

export default ({ year, events }) => {
  if (!year || !events) return <Error statusCode={404} />
  return (
    <Grouping title={`${year} Events`} events={events}>
      <Years showAll />
    </Grouping>
  )
}

export const getStaticPaths = async () => {
  let events = await getEvents()
  let starts = map(events, 'start')
  starts = map(starts, start => first(split(start, '-')))
  let years = uniq(starts)
  const paths = map(years, year => ({ params: { year } }))
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {
  const { year } = params
  let events = await getEvents()
  events = filter(events, e => startsWith(e.start, year))
  events = orderBy(events, 'start')
  return { props: { year, events } }
}
