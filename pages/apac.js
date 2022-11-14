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
      events={[{...{
        id: 'epoch',
        name: `Hack Club's Epoch`,
        website: 'https://epoch.hackclub.com',
        start: '2022-12-30T17:00:00.000Z',
        end: '2023-01-01T18:30:00.000Z',
        banner:
          'https://cloud-15qevu1zp-hack-club-bot.vercel.app/0assemble_2.png',
        city: 'Gurugram',
        state: 'Delhi NCR',
        lead: `Let's come together to ring in the new year at....`,
        footer: (
          <>
            <b>DEC. 30 2022 TO JAN. 1 2023
              <br />
            Gurugram, Delhi NCR</b> 
            <br />
            ₹12.5 Lakh in Travel Stipends
            <br />DOORS OPEN AT 6PM; 42-HOURS LONG</>),
        hq: true,
        logo: `https://cloud-jzsq7jfvg-hack-club-bot.vercel.app/0group_9.png`
      }}, ...events]}
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
