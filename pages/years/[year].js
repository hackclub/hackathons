import Error from 'next/error'
import Grouping from '../../components/grouping'
import Years from '../../components/years'
import { filter, orderBy, startsWith } from 'lodash'
import { getEvents } from '../../lib/data'

export default ({ year, events }) => {
  if (!year || !events) return <Error statusCode={404} />
  return (
    <Grouping
      title={`${year} High School Hackathons`}
      desc={`Browse all ${events.length} hackathons for high schoolers ${
        new Date().getFullYear().toString() === year ? 'in' : 'from'
      } ${year}.`}
      events={events}
    >
      <Years showAll />
    </Grouping>
  )
}

export const getServerSideProps = async ({ params }) => {
  const { year } = params
  let events = await getEvents()
  events = filter(events, (e) => startsWith(e.start, year))
  if (events.length === 0) return { notFound: true }
  events = orderBy(events, 'start')
  return { props: { year, events } }
}
