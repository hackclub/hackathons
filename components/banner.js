import { Card, Text } from 'theme-ui'
import { keyframes } from '@emotion/react'
import Icon from '@hackclub/icons'

const flip = keyframes({
  from: { transform: 'scaleY(0)' },
  to: { transform: 'scaleY(100%)' }
})

const Banner = ({
  caption,
  copy,
  iconLeft,
  iconRight,
  color = 'accent',
  sx = {},
  ...props
}) => (
  <Card
    as={props.href ? 'a' : 'div'}
    variant="interactive"
    sx={{
      mx: 'auto',
      maxWidth: 'copy',
      width: '100%',
      textAlign: 'left',
      textDecoration: 'none',
      lineHeight: 'caption',
      display: 'flex',
      alignItems: 'center',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: 'primary',
      p: [2, 3],
      px: 3,
      mt: 4,
      transform: 'scale(1)',
      '@media (prefers-reduced-motion: no-preference)': {
        animation: `${flip} 0.5s ease-out`
      },
      svg: { flexShrink: 'none' },
      ...sx
    }}
    {...props}
  >
    {iconLeft && (
      <Icon
        glyph={iconLeft}
        sx={{ mr: [2, 3], ml: 2, color, display: ['none', 'block'] }}
      />
    )}
    <Text
      as="p"
      sx={{ flex: '1 1 auto', strong: { display: ['inline', 'block'] } }}
    >
      <strong>{copy}</strong>
      {caption && (
        <Text as="span" variant="caption" color="secondary">
          {' '}
          {caption}
        </Text>
      )}
    </Text>
    {iconRight && <Icon glyph={iconRight} sx={{ ml: [2, 3], color }} />}
  </Card>
)

export default Banner
