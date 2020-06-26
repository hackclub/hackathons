import { Box, Container, Heading } from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'

export default ({
  centered = true,
  title,
  desc,
  img,
  children,
  includeMeta = false,
  sx = {}
}) => (
  <Box
    as="header"
    sx={{
      bg: 'sheet',
      color: 'text',
      py: [3, null, null, 4, 5],
      textAlign: centered && ['left', 'center'],
      ...sx
    }}
  >
    {includeMeta && (
      <Meta as={Head} title={title} description={desc} image={img} />
    )}
    <Container sx={{ maxWidth: [null, 'copy', 'copyPlus'] }}>
      {title && (
        <Heading
          as="h1"
          variant="title"
          sx={{ color: 'primary' }}
          children={title}
        />
      )}
      {desc && (
        <Heading
          as="h2"
          variant="subtitle"
          sx={{
            mt: 3,
            color: 'text',
            mx: centered && 'auto'
          }}
          children={desc}
        />
      )}
      {children}
    </Container>
  </Box>
)
