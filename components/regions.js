import { regions } from '../lib/regions.json'
import { Grid, Card, Heading } from 'theme-ui'
import { kebabCase, startCase } from 'lodash'
import Link from 'next/link'

export default ({ showAll = false, sx = {} }) => (
  <Grid
    columns={[1, 2, 4]}
    gap={[3, 4]}
    sx={{
      mb: [4, 5],
      ...sx,
      a: {
        WebkitTapHighlightColor: 'transparent',
        transition: 'transform .125s ease-in-out, box-shadow .125s ease-in-out',
        ':hover,:focus': {
          transform: 'scale(1.0625)',
          boxShadow: 'elevated'
        }
      }
    }}
  >
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
    {Object.entries(regions).map(([name, url]) => (
      <Card
        key={name}
        as="a"
        href={`/list-of-hackathons-in-${kebabCase(name)}`}
        variant="event"
        sx={{ alignItems: ['flex-start', 'center'] }}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.375) 75%),
            url(${url})`
        }}
      >
        <Heading as="h3" sx={{ fontSize: 3 }}>
          {startCase(name)}
        </Heading>
      </Card>
    ))}
  </Grid>
)
