import { Box, Container, Heading } from 'theme-ui'
import Head from 'next/head'
import Nav from './nav'
import Meta from '@hackclub/meta'

export default ({
  centered = true,
  title,
  desc,
  img,
  children,
  includeMeta = false,
  includeNav = false,
  backgroundImage,
  sx = {}
}) => (
  <Box
    as="header"
    sx={{
      bg: 'sheet',
      backgroundImage: backgroundImage ? `linear-gradient(90deg, rgba(2,0,0,0.73) 0%, rgba(2,0,0,0.66) 100%), url(${backgroundImage})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'text',
      pt: includeNav ? 0 : [3, null, null, 4, 5],
      pb: includeNav ? [3, null, null, 5, 6] : [3, null, null, 4, 5],
      textAlign: centered && ['left', 'center'],
      ...sx
    }}
  >
    {includeNav && (<Nav />)}
    {includeMeta && (
      <Meta as={Head} title={title} description={desc} image={img} />
    )}
    <Container sx={{ maxWidth: [null, 'copy', 'copyPlus'] }}>
      {title && (
        <Heading as="h1" variant="title" sx={{ color: 'primary', textShadow: backgroundImage ? 'elevated' : 'none' }}>
          {title}
        </Heading>
      )}
      {desc && (
        <Heading
          as="h2"
          variant="subtitle"
          sx={{
            mt: 3,
            color: backgroundImage ? 'white!important' : 'text',
            mx: centered && 'auto',
            textShadow: backgroundImage ? 'text' : 'none'
          }}
        >
          {desc}
        </Heading>
      )}
      {children}
    </Container>
  </Box>
)
