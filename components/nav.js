/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui'
import { Box, Container, IconButton, Text, NavLink } from '@theme-ui/components'
import Link from 'next/link'
import { Moon } from 'react-feather'

const ColorSwitcher = props => {
  const [mode, setMode] = useColorMode()
  return (
    <IconButton
      {...props}
      onClick={e => setMode(mode === 'dark' ? 'light' : 'dark')}
      title="Cycle Color Mode"
      sx={{
        borderRadius: 9999,
        transition: 'box-shadow .125s ease-in-out',
        ...props.sx,
        ':hover,:focus': {
          color: 'accent',
          boxShadow: '0 0 0 3px',
          outline: 'none'
        }
      }}
    >
      <Moon size={24} />
    </IconButton>
  )
}

export default () => {
  const [mode] = useColorMode()
  return (
    <Box
      as="nav"
      sx={{
        bg: mode === 'dark' ? 'darkless' : 'red',
        color: 'nav',
        py: 3
      }}
      key="nav"
    >
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          a: {
            fontSize: 1,
            color: mode === 'dark' ? 'red' : 'white',
            textDecoration: 'none',
            mr: [3, 4],
            ':focus,:hover': { color: mode === 'dark' ? 'red' : 'white' }
          }
        }}
      >
        <Link href="/" passHref>
          <Text
            as="a"
            variant="logo"
            sx={{
              flex: '1 1 auto'
            }}
          >
            Hackathons
          </Text>
        </Link>
        <NavLink href="https://hackclub.com">Hack Club</NavLink>
        <NavLink href="https://airtable.com/shr42MplImeMkHHWP">
          Add your event
        </NavLink>
        <ColorSwitcher />
      </Container>
    </Box>
  )
}
