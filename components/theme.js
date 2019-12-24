import { base } from '@theme-ui/presets'
import { merge } from 'lodash'

export const breakpoints = [32, 48, 64, 96, 128].map(w => `${w}em`)

export const palette = {
  darker: '#121217',
  dark: '#17171d',
  darkless: '#252429',
  black: '#1f2d3d',
  steel: '#273444',
  slate: '#3c4858',
  muted: '#8492a6',
  smoke: '#e0e6ed',
  snow: '#f9fafc',
  white: '#ffffff',
  red: '#ec3750',
  orange: '#ff8c37',
  yellow: '#f1c40f',
  green: '#33d6a6',
  cyan: '#5bc0de',
  blue: '#338eda',
  twitter: '#1da1f2',
  facebook: '#3b5998',
  instagram: '#e1306c'
}

const theme = merge(base, {
  breakpoints,
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 16, 20, 24, 32, 48, 64, 96, 128],
  initialColorMode: 'light',
  useColorSchemeMediaQuery: true,
  colors: {
    ...palette,
    text: palette.black,
    background: palette.white,
    elevated: palette.white,
    sunken: palette.smoke,
    border: palette.smoke,
    placeholder: palette.muted,
    secondary: palette.slate,
    primary: palette.red,
    muted: palette.muted,
    accent: palette.blue,
    invertedPrimary: palette.white,
    invertedText: palette.white,
    header: palette.snow,
    nav: palette.white,
    modes: {
      dark: {
        text: palette.white,
        background: palette.dark,
        elevated: palette.darkless,
        sunken: palette.darker,
        border: palette.darkless,
        placeholder: palette.slate,
        secondary: palette.muted,
        muted: palette.muted,
        accent: palette.cyan,
        invertedPrimary: palette.darker,
        invertedText: palette.dark,
        header: palette.darkless,
        nav: palette.red
      }
    }
  },
  fonts: {
    body:
      '"Phantom Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    monospace: '"SFMono-Regular", "Roboto Mono", Menlo, Consolas, monospace'
  },
  lineHeights: {
    title: 1,
    heading: 1.125,
    subheading: 1.25,
    body: 1.5
  },
  fontWeights: {
    body: 400,
    bold: 700
  },
  letterSpacings: {
    title: '-0.009em',
    headline: '0.009em'
  },
  sizes: {
    ultrawide: 2048,
    wide: 1536,
    container: 1200,
    subcontainer: 1024,
    narrowplus: 768,
    narrow: 512
  },
  radii: {
    default: 6,
    extra: 9,
    circle: 99999
  },
  shadows: {
    small: '0 1px 2px rgba(0, 0, 0, 0.0625), 0 2px 4px rgba(0, 0, 0, 0.0625)',
    card: '0 4px 8px rgba(0, 0, 0, 0.125)',
    elevated: '0 1px 2px rgba(0, 0, 0, 0.0625), 0 8px 12px rgba(0, 0, 0, 0.125)'
  },
  text: {
    heading: {
      fontWeight: 'bold',
      lineHeight: 'heading'
    },
    title: {
      fontWeight: 'bold',
      lineHeight: 'title',
      letterSpacing: 'title',
      fontSize: [4, 5, 6]
    },
    subtitle: {
      fontSize: [2, 3, null, null, 4],
      fontWeight: 'body',
      letterSpacing: 'headline',
      lineHeight: 'subheading'
    },
    headline: {
      fontWeight: 'bold',
      lineHeight: 'heading',
      letterSpacing: 'headline',
      fontSize: 4,
      mt: 3,
      mb: 3
    },
    subheadline: {
      fontWeight: 'bold',
      lineHeight: 'heading',
      letterSpacing: 'headline',
      fontSize: 2,
      mt: 0,
      mb: 3
    },
    caption: {
      color: 'muted',
      fontWeight: 'medium',
      letterSpacing: 'headline'
    }
  },
  alerts: {
    primary: {
      color: 'invertedText',
      bg: 'orange',
      fontWeight: 'body'
    }
  },
  badges: {
    pill: {
      borderRadius: 'circle'
    }
  },
  buttons: {
    primary: {
      bg: 'primary',
      color: 'background',
      cursor: 'pointer',
      fontFamily: 'body',
      fontWeight: 'bold',
      svg: { ml: -1, mr: 2 }
    },
    inverted: {
      bg: 'invertedPrimary',
      color: 'invertedText',
      cursor: 'pointer',
      fontFamily: 'body',
      fontWeight: 'bold',
      svg: { ml: -1, mr: 2 }
    }
  },
  forms: {
    input: {
      bg: 'elevated',
      color: 'text',
      fontFamily: 'body',
      borderRadius: 'base',
      boxShadow: 'small',
      transition: 'box-shadow .125s ease-in-out',
      border: 0,
      ':hover,:focus': { boxShadow: 'card' },
      '::-webkit-input-placeholder': { color: 'placeholder' },
      '::-moz-placeholder': { color: 'placeholder' },
      ':-ms-input-placeholder': { color: 'placeholder' },
      '&[type="search"]::-webkit-search-decoration': { display: 'none' }
    },
    label: {
      color: 'text',
      fontWeight: 'medium'
    },
    hidden: {
      position: 'absolute',
      height: '1px',
      width: '1px',
      overflow: 'hidden',
      clip: 'rect(1px, 1px, 1px, 1px)',
      whiteSpace: 'nowrap'
    }
  },
  cards: {
    primary: {
      bg: 'elevated',
      color: 'text',
      p: [3, 4],
      borderRadius: 'extra',
      boxShadow: 'card',
      input: { boxShadow: 'none !important' }
    },
    sunken: {
      bg: 'sunken',
      p: [3, 4],
      borderRadius: 'extra',
      'input, a': { bg: 'header', boxShadow: 'none !important' }
    },
    event: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 128,
      color: 'white',
      textAlign: 'center',
      textShadow: '0 1px 4px rgba(0, 0, 0, 0.375)',
      textDecoration: 'none',
      backgroundColor: 'black',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      borderRadius: 'extra',
      overflow: 'hidden',
      position: 'relative',
      p: 3,
      height: '100%'
    },
    nav: {
      bg: 'elevated',
      color: 'text',
      px: 3,
      py: 4,
      borderRadius: 'extra',
      boxShadow: 'card',
      textDecoration: 'none',
      position: 'relative',
      overflow: 'hidden',
      fontSize: 2,
      fontWeight: 'bold',
      lineHeight: 'title',
      WebkitTapHighlightColor: 'transparent',
      transition: 'transform .125s ease-in-out, box-shadow .125s ease-in-out',
      ':hover,:focus': {
        transform: 'scale(1.0625)',
        boxShadow: 'elevated'
      }
    }
  },
  layout: {
    container: {
      width: '100%',
      maxWidth: ['container', null, null, null, 'wide'],
      mx: 'auto',
      px: 3
    },
    wide: {
      width: '100%',
      maxWidth: ['wide', null, null, null, 'ultrawide'],
      mx: 'auto',
      px: 3
    },
    narrow: {
      width: '100%',
      maxWidth: ['narrow', null, null, null, 'container'],
      mx: 'auto',
      px: 3
    }
  },
  styles: {
    hr: {
      borderColor: 'border',
      my: [3, 4]
    }
  }
})
theme.styles.root = {
  fontFamily: theme.fonts.body,
  lineHeight: theme.lineHeights.body,
  fontWeight: theme.fontWeights.body,
  color: theme.colors.text,
  margin: 0,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column'
}

export default theme
