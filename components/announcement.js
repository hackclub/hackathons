import { Card, Text } from 'theme-ui'
import { keyframes } from '@emotion/react'
import Icon from './icon'

const unfold = keyframes({
  from: { transform: 'scaleY(0)' },
  to: { transform: 'scaleY(100%)' }
})

const Announcement = ({
  caption,
  copy,
  iconLeft,
  iconRight,
  color = 'accent',
  sx = {},
  copyLogo,
  backgroundImage,
  copyColor,
  captionColor,
  logoImageMaxWidth,
  ...props
}) => (
  <Card
	as={props.href ? 'a' : 'div'}
	variant="interactive"
	sx={{
	  variant: 'cards.translucent',
	  mx: 'auto',
	  maxWidth: 'narrow',
	  width: '100%',
	  textAlign: 'center',
	  textDecoration: 'none',
	  lineHeight: 'caption',
	  display: 'flex',
	  alignItems: 'center',
	  p: [3, 3],
	  mt: [3, 4],
	  transform: 'scale(1)',
	  '@media (prefers-reduced-motion: no-preference)': {
		animation: `${unfold} 0.5s ease-out`
	  },
	  svg: { flexShrink: 'none' },
	  backgroundImage: `url(${backgroundImage})`,
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
    sx={{ flex: '1 1 auto', strong: { display: ['inline', 'block'] }, color: copyColor }}
  >
		  {copyLogo && (
      <img src={copyLogo} alt="Copy Logo" style={{ maxWidth: logoImageMaxWidth, display: ['inline', 'block'] }} />
    )}
    <strong>{copy}</strong>
    {caption && (
      <Text
        as="span"
        variant="caption"
        color={captionColor}
        sx={{
          backgroundColor: '#01AAF9',
          borderRadius: 5,
          px: 1,
          py: 1,
          display: 'inline-block'
        }}
      >
        {' '}
        {caption}
      </Text>
    )}
  </Text>
	{iconRight && <Icon glyph={iconRight} sx={{ ml: [2, 3], color }} />}
  </Card>
)

export default Announcement
