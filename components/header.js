import { useColorMode } from 'theme-ui'
import { Box, Container, Heading } from '@theme-ui/components'
import Meta from './meta'

export default ({
  centered = true,
  title,
  desc,
  img,
  children,
  includeMeta = false,
  sx = {}
}) => {
  const [mode] = useColorMode()
  return (
    <Box
      as="header"
      sx={{
        bg: mode === 'dark' ? 'darkless' : 'red',
        pt: [4, null, null, null, 5],
        pb: [4, 5, null, null, 6],
        textAlign: centered && [null, 'center'],
        ...sx
      }}
    >
      {includeMeta && <Meta title={title} description={desc} image={img} />}
      <Container>
        <Heading
          as="h1"
          variant="title"
          sx={{ color: mode === 'dark' ? 'red' : 'white' }}
          children={title}
        />
        {desc && (
          <Heading
            as="h2"
            variant="subtitle"
            sx={{
              mt: 3,
              color: 'snow',
              mx: centered ? [null, 'auto'] : null
            }}
            children={desc}
          />
        )}
        {children}
      </Container>
    </Box>
  )
}
