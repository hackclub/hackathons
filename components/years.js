import { Grid, Card } from '@theme-ui/components'
import { pick, split, range } from 'lodash'
import Link from 'next/link'
import { palette } from './theme'

const years = range(2017, new Date().getFullYear() + 2)
const colors = pick(palette, split('red,orange,yellow,green,cyan,blue', ','))

const rainbow = {}
Object.entries(colors).map(([name, bg], i) => {
  rainbow[`&:nth-of-type(${Object.keys(colors).length}n + ${i + 1})`] = { bg }
})

export default () => (
  <Grid columns={[1, 2, 4]} gap={[3, 4]}>
    {years.map(year => (
      <Link href={`/years/${year}`} passHref key={year}>
        <Card as="a" variant="nav" sx={{ ...rainbow, color: 'white' }}>
          {year}
        </Card>
      </Link>
    ))}
  </Grid>
)
