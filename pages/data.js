import Head from 'next/head'
import Meta from '@hackclub/meta'
import { Container, BaseStyles } from 'theme-ui'
import Content from '../components/api.mdx'

export default () => (
  <>
    <Meta
      as={Head}
      title="Data API"
      name="Hack Club Hackathons"
      description="API for listing upcoming high school hackathons around the world."
      image="https://hackathons.hackclub.com/card.png"
    />
    <Container as={BaseStyles} variant="copy" sx={{ py: 3, fontSize: 2 }}>
      <Content />
    </Container>
  </>
)
