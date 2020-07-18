import Footer from './footer.mdx'
import { Container, Box } from 'theme-ui'

export default () => (
  <Box
    as="footer"
    sx={{ bg: 'sunken', textAlign: 'center', px: 2, py: [3, 4], mt: [4, 5] }}
  >
    <Container
      variant="narrow"
      sx={{
        p: { color: 'secondary', lineHeight: 'caption', fontSize: [2, 3] },
        a: { variant: 'styles.a', color: 'primary' }
      }}
    >
      <Footer />
    </Container>
  </Box>
)
