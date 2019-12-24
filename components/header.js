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
        bg: 'header',
        color: 'text',
        pt: [4, null, null, null, 5],
        pb: [4, 5, null, null, 6],
        textAlign: centered && 'center',
        ...sx
      }}
    >
      {includeMeta && <Meta title={title} description={desc} image={img} />}
      <Container>
        <Heading
          as="h1"
          variant="title"
          sx={{
            color: 'primary',
            maxWidth: 'narrowplus',
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
}
