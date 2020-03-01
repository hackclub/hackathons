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
      pt: [4, null, null, null, 5],
      pb: [4, 5, null, null, 6],
      textAlign: centered && 'center',
      ...sx
    }}
  >
    {includeMeta && (
      <Head>
        <Meta title={title} description={desc} image={img} />
        <title>{title}</title>
      </Head>
    )}
    <Container variant="copyPlus">
      <Heading
        as="h1"
        variant="title"
        sx={{
          color: 'primary',
          maxWidth: 'copyPlus',
          mx: centered && 'auto'
        }}
        children={title}
      />
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
