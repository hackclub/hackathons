import { Container, Box } from 'theme-ui'
import Header from '../../components/header'
import Years from '../../components/years'

export default () => (
  <Box as="main" sx={{ bg: 'background', color: 'text', textAlign: 'center' }}>
    <Header title="Explore High School Hackathons by Year" includeMeta />
    <Container sx={{ mt: [3, 4, 5], py: [3, null, 4] }}>
      <Years />
    </Container>
  </Box>
)
