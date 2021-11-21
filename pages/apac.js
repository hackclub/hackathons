import Grouping from '../components/grouping'
import Regions from '../components/regions'
import Meta from '@hackclub/meta'
import Signup from '../components/signup'
import { Heading, Text, Link } from 'theme-ui'
import Head from 'next/head'
import { orderBy, filter } from 'lodash'
import { getEvents } from '../lib/data'

export default ({ events, emailStats }) => {
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
          <Signup stats={emailStats} />
          <Heading variant="headline" sx={{ mt: [4, 5], mb: [3, 4] }}>
            Explore popular regions
          </Heading>
          <Regions />
        </section>
      }
    />
  )
}

export const getStaticProps = async (req, res) => {
  let events = await getEvents()
  // events where the field apac = true
  events = filter(events, 'apac')
  // upcoming events first
  events = orderBy(events, 'start', 'desc')
  return { props: { events }, revalidate: 10 }
}
