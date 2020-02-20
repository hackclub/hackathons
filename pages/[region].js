import Error from 'next/error'
import Grouping from '../components/grouping'
import Regions from '../components/regions'
import Signup from '../components/signup'
import { map, orderBy, find, kebabCase, startCase } from 'lodash'
import { getGroupingData } from '../lib/data'

export default ({ name, events, groups, emailStats }) => {
  if (!name || !events) return <Error statusCode={404} />
  return (
    <Grouping
      title={`High School Hackathons in ${name.replace(
        'USA',
        'United States'
      )}`}
      desc={`Find, register, and compete in ${
        events.length
      } student-led hackathons around ${name}.`}
      header={<Signup stats={emailStats} initialLocation={startCase(name)} />}
      events={events}
      groups={groups}
    >
      <Regions showAll />
    </Grouping>
  )
}

/*
const distance = (lat1, lon1, lat2, lon2) => {
  // https://www.geodatasource.com/developers/javascript
  const radlat1 = (Math.PI * lat1) / 180
  const radlat2 = (Math.PI * lat2) / 180
  const theta = lon1 - lon2
  const radtheta = (Math.PI * theta) / 180
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
  dist = Math.acos(dist)
  dist = (dist * 180) / Math.PI
  dist = dist * 60 * 1.1515
  return {
    miles: dist,
    kilometers: dist * 1.609344
  }
}
*/

let regions = [
  {
    name: 'Los Angeles',
    filter: event => event.city === 'Los Angeles'
  },
  {
    name: 'Chicago',
    filter: event => ['IL', 'Illinois'].includes(event.state)
  },
  {
    name: 'New York',
    filter: event =>
      ['NJ', 'NY', 'New York', 'New Jersey'].includes(event.state)
  },
  {
    name: 'the Bay Area',
    filter: event => ['CA', 'California'].includes(event.state)
  },
  {
    name: 'the USA',
    filter: event => ['US', 'USA', 'United States'].includes(event.country)
  },
  {
    name: 'Canada',
    filter: event => ['CA', 'Canada'].includes(event.country)
  },
  {
    name: 'India',
    filter: event => ['IN', 'India'].includes(event.country)
  }
]
regions = map(regions, region => ({ id: kebabCase(region.name), ...region }))

export const unstable_getStaticPaths = () => {
  const paths = map(map(regions, 'id'), id => ({
    params: { region: `list-of-hackathons-in-${id}` }
  }))
  return { paths }
}

export const unstable_getStaticProps = async ({ params }) => {
  let { region } = params
  region = find(regions, ['id', region.replace('list-of-hackathons-in-', '')])
  let { name } = region
  let { events, groups, emailStats } = await getGroupingData()
  events = orderBy(events.filter(event => region.filter(event)), 'start')
  return { props: { name, events, groups, emailStats } }
}
