import Error from 'next/error'
import Grouping from '../components/grouping'
import Regions from '../components/regions'
import Meta from '@hackclub/meta'
import { Box, Heading, Text, Link } from 'theme-ui'
import Head from 'next/head'
import Signup from '../components/signup'
import Years from '../components/years'
import { map, orderBy, find, kebabCase, startCase, filter } from 'lodash'
import { getGroupingData } from '../lib/data'
import { getEvents } from '../lib/data'

export default ({ name, events, emailStats }) => {
  const title = `High School Hackathons in ${new Date().getFullYear()}`

  return (
    <Grouping
      includeMeta={false}
      header={
        <>
          <Meta
            as={Head}
            title="High School Hackathons"
            description={`${title}. A curated list of online and in-person high school hackathons in the Asia-Pacific region, maintained by Hack Club staff.`}
          />
          <Heading as="h1" variant="title" sx={{ color: 'primary' }}>
            High School Hackathons in the Asia-Pacific Region
          </Heading>
          <Text as="p" variant="subtitle" sx={{ my: 3 }}>
            A curated list of in-person and online high school hackathons.
            <Text as="p" variant="subtitle">
              {' '}
              Maintained by the{' '}
              <Link href="https://hackclub.com/">Hack Club</Link> staff.
            </Text>
          </Text>
        </>
      }
      events={events}
      footer={
        <section>
          {/* <Signup stats={emailStats} /> */}
          <Heading variant="headline" sx={{ mt: [4, 5], mb: [3, 4] }}>
            Explore popular regions
          </Heading>
          <Regions />
        </section>
      }
    />
  )
}

// const distance = (lat1, lon1, lat2, lon2) => {
//   // https://www.geodatasource.com/developers/javascript
//   const radlat1 = (Math.PI * lat1) / 180
//   const radlat2 = (Math.PI * lat2) / 180
//   const theta = lon1 - lon2
//   const radtheta = (Math.PI * theta) / 180
//   let dist =
//     Math.sin(radlat1) * Math.sin(radlat2) +
//     Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
//   dist = Math.acos(dist)
//   dist = (dist * 180) / Math.PI
//   dist = dist * 60 * 1.1515
//   return {
//     miles: dist,
//     kilometers: dist * 1.609344
//   }
// }

export const getStaticProps = async (req, res) => {
  let events = await getEvents()
  events = filter(events, 'apac')
  events = orderBy(
    filter(events, e => new Date(e.start) >= new Date()),
    'start'
  )
  return { props: { events }, revalidate: 10 }
}
