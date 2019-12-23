import Footer from './footer.mdx'
import { Container, Box } from '@theme-ui/components'

export default () => (
  <Box
    as="footer"
    sx={{ bg: 'sunken', textAlign: 'center', px: 2, py: [3, 4], mt: [4, 5] }}
  >
    <Container
      sx={{
        maxWidth: 640,
        alignItems: 'center',
        justifyContent: 'center',
        p: { color: 'secondary', fontSize: [2, 3] },
        a: { color: 'primary' }
      }}
    >
      <Footer />
    </Container>
  </Box>
)
