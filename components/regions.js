import { Grid, Card, Heading } from '@theme-ui/components'
import { kebabCase, snakeCase, startCase } from 'lodash'
import Link from 'next/link'

let photoSrc = q =>
  `https://source.unsplash.com/random/512x256/?${snakeCase(q)}`
let regions = [
  'Los Angeles',
  'Chicago',
  'New York',
  'the Bay Area',
  'the USA',
  'Canada',
  'India'
]

export default ({ showAll = false, sx = {} }) => (
  <Grid columns={[1, 2, 4]} gap={[3, 4]} sx={{ mb: [4, 5], ...sx }}>
    {showAll && (
      <Link href="/" passHref>
        <Card
          as="a"
          variant="primary"
          sx={{
            bg: 'elevated',
            color: 'primary',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: 3,
            fontWeight: 'bold'
          }}
        >
          All Events
        </Card>
      </Link>
    )}
    {regions.map(name => (
      <Link
        href={`/list-of-hackathons-in-${kebabCase(name)}`}
        passHref
        key={name}
      >
        <Card
          as="a"
          variant="event"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.375) 75%),
              url(${photoSrc(name)})`
          }}
        >
          <Heading as="h3" sx={{ fontSize: 3 }}>
            {startCase(name)}
          </Heading>
        </Card>
      </Link>
    ))}
  </Grid>
)
