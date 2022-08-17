import { merge } from 'lodash'
import base from '@hackclub/theme'

const theme = merge(base, {
  cards: {
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
    },
    
  }
})

export default theme
