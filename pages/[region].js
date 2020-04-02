import Error from 'next/error'
import Grouping from '../components/grouping'
import Regions from '../components/regions'
import Signup from '../components/signup'
import { map, orderBy, find, kebabCase, startCase } from 'lodash'
import { getGroupingData } from '../lib/data'

export default ({ name, events, emailStats }) => {
  if (!name || !events) return <Error statusCode={404} />
  return (
    <Grouping
      title={`High School Hackathons in ${name.replace(
        'USA',
        'United States'
      )}`}
      desc={`Find, register, and compete in ${events.length} student-led hackathons around ${name}.`}
      header={<Signup stats={emailStats} initialLocation={startCase(name)} />}
      events={events}
    >
      <Regions showAll />
    </Grouping>
  )
}

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

let regions = [
  {
    name: 'Los Angeles',
    filter: event => event.city === 'Los Angeles'
  },
  {
    name: 'Chicago',
    filter: event => {
      const position = [41.969649, -87.720643]
      return (
        distance(position[0], position[1], event.latitude, event.longitude)
          .miles < 42
      )
    }
  },
  {
    name: 'New York',
    filter: event => {
      const position = [40.7128, -74.006]
      return (
        distance(position[0], position[1], event.latitude, event.longitude)
          .miles < 50
      )
    }
  },
  {
    name: 'the Bay Area',
    filter: event => {
      const position = [37.641045, -122.228916]
      return (
        distance(position[0], position[1], event.latitude, event.longitude)
          .miles < 39
      )
    }
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

export const getStaticPaths = () => {
  const paths = map(map(regions, 'id'), id => ({
    params: { region: `list-of-hackathons-in-${id}` }
  }))
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {
  let { region } = params
  region = find(regions, ['id', region.replace('list-of-hackathons-in-', '')])
  let { name } = region
  let { events, emailStats } = await getGroupingData()
  events = orderBy(
    events.filter(event => region.filter(event)),
    'start'
  )
  return { props: { name, events, emailStats } }
}
