import { ArrowLeft, Plus, Moon, GitHub } from 'react-feather'
import {
  Box,
  Container,
  IconButton,
  Image,
  Link as A
} from '@theme-ui/components'
import { useColorMode } from 'theme-ui'
import { useRouter } from 'next/router'
import Link from 'next/link'

const NavButton = ({ sx, ...props }) => (
  <IconButton
    {...props}
    sx={{
      color: 'red',
      borderRadius: 'circle',
      transition: 'box-shadow .125s ease-in-out',
      ':hover,:focus': {
        boxShadow: '0 0 0 2px',
        outline: 'none'
      },
      ...sx
    }}
  />
)

const BackButton = ({ to = '/' }) => (
  <Link href={to} passHref>
    <NavButton as="a" title={to === '/' ? 'Back to homepage' : 'Back'}>
      <ArrowLeft />
    </NavButton>
  </Link>
)

const Flag = () => (
  <A
    href="https://hackclub.com"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Hack Club homepage"
    sx={{ mt: -3 }}
  >
    <Image
      src="https://hackclub.com/orpheus_flag.svg"
      alt="Hack Club flag"
      sx={{ width: [96, 128] }}
    />
  </A>
)

const ColorSwitcher = props => {
  const [mode, setMode] = useColorMode()
  return (
    <NavButton
      {...props}
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
      title="Reverse color scheme"
    >
      <Moon size={24} />
    </NavButton>
  )
}

export default () => {
  const [mode] = useColorMode()
  const router = useRouter()
  const home = router.pathname === '/'
  return (
    <Box
      as="nav"
      sx={{
        bg: mode === 'dark' ? 'darkless' : 'snow',
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
            color: 'primary',
            textDecoration: 'none',
            mr: [3, 4]
          }
        }}
      >
        {!home ? <BackButton /> : <Flag />}
        <NavButton
          as="a"
          href="https://airtable.com/shr42MplImeMkHHWP"
          aria-label="Submit your hackathon"
          sx={{ ml: 'auto' }}
        >
          <Plus size={24} />
        </NavButton>
        <NavButton
          as="a"
          href="https://github.com/lachlanjc/hackathons"
          aria-label="View source code on GitHub"
        >
          <GitHub size={24} />
        </NavButton>
        <ColorSwitcher />
      </Container>
    </Box>
  )
}
