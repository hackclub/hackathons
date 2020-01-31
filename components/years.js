import { Grid, Card } from 'theme-ui'
import { pick, split, range } from 'lodash'
import Link from 'next/link'
import { colors } from './theme'

const years = range(2017, new Date().getFullYear() + 1)

const palette = pick(colors, split('red,orange,yellow,green,cyan,blue', ','))
const rainbow = {}
Object.entries(palette).map(([name, bg], i) => {
  rainbow[`&:nth-of-type(${Object.keys(palette).length}n + ${i + 1})`] = { bg }
})

export default ({ showAll = false }) => (
  <Grid columns={[1, 2, showAll ? 5 : 4]} gap={[3, 4]}>
    {showAll && (
      <Link href="/" passHref>
        <Card as="a" variant="nav" sx={{ bg: 'elevated', color: 'primary' }}>
          All Events
        </Card>
      </Link>
    )}
    {years.map(year => (
      <Link href={`/years/${year}`} passHref key={year}>
        <Card as="a" variant="nav" sx={{ ...rainbow, color: 'white' }}>
          {year}
        </Card>
      </Link>
    ))}
  </Grid>
)
