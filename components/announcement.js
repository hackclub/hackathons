import { Card, Text, Badge } from 'theme-ui'
import { keyframes } from '@emotion/react'
import Icon from './icon'

const unfold = keyframes({
  from: { transform: 'scaleY(0)' },
  to: { transform: 'scaleY(100%)' }
})

const Announcement = ({
  caption,
  cta,
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
  virtual,
  hybrid,
  ...props
}) => (
  <Card
	as={props.href ? 'a' : 'div'}
	variant="interactive"
	sx={{
	  variant: 'cards.translucent',
	  position: 'relative',
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
	{(virtual || hybrid || virtual === false) && (
	  <Badge
		as="span"
		sx={{
		  position: 'absolute',
		  top: 16,
		  right: 16,
		  bg: 'snow',
		  color: virtual ? 'red' : hybrid ? 'orange' : 'blue',
		  fontSize: 'inherit',
		  textShadow: 'none',
		  borderRadius: 5
		}}
	  >
		{virtual ? 'Online' : hybrid ? 'Hybrid' : 'In-Person'}
	  </Badge>
	)}
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
          display: 'block',
          mt: 1,
          fontWeight: 'bold',
          textShadow: '0 1px 4px rgba(255,255,255,0.85)',
          whiteSpace: 'pre-line'
        }}
      >
        {caption}
      </Text>
    )}
  </Text>
	{iconRight && <Icon glyph={iconRight} sx={{ ml: [2, 3], color }} />}
	{cta && (
	  <Text
		as="span"
		sx={{
		  position: 'absolute',
		  left: 0,
		  right: 0,
		  bottom: 10,
		  textAlign: 'center',
		  color: captionColor,
		  fontWeight: 'bold',
		  fontSize: 1,
		  textShadow: '0 1px 4px rgba(255,255,255,0.85)',
		  pointerEvents: 'none'
		}}
	  >
		{cta}
	  </Text>
	)}
  </Card>
)

export default Announcement
