import { useState } from 'react'
import { useThemeUI } from 'theme-ui'
import { Card, Box, Heading, Text, Flex, Image } from 'theme-ui'
import { orderBy, first, last } from 'lodash'
import { imageSrc, humanizedDateRange, formatAddress } from '../lib/util'
import EventCard from './event-card'

const fauxCardShadow = (px, color) => `
  1px 0 1px rgba(0,0,0,0.15),
  ${px}px 0 0 -5px ${color},
  ${px}px 0 1px -4px rgba(0,0,0,0.15),
  ${px * 2}px 0 0 -10px ${color},
  ${px * 2}px 0 1px -9px rgba(0,0,0,0.15),
  -1px 0 1px rgba(0,0,0,0.15),
  -${px}px 0 0 -5px ${color},
  -${px}px 0 1px -4px rgba(0,0,0,0.15),
  -${px * 2}px 0 0 -10px ${color},
  -${px * 2}px 0 1px -9px rgba(0,0,0,0.15)
`

const insetShadow = px => `
  inset 0 0 ${px}px ${px / 2}px rgba(0, 0, 0, 0.5),
  1px 0 1px rgba(0,0,0,0.25)
`

const GroupCard = ({ group, events }) => {
  if (events.length === 0) return
  const { theme, colorMode } = useThemeUI()
  const fauxCardColor =
    colorMode === 'dark' ? theme.colors.elevated : theme.colors.sunken
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(prev => !prev)
  events = orderBy(events, 'fields.start_date')
  const { start_date: start } = first(events).fields
  const { end_date: end } = last(events).fields
  const { id, website, name, banner, logo } = group

  return [
    <Card
      key="base"
      role="button"
      variant="event"
      itemScope
      itemType="http://schema.org/Event"
      onClick={toggle}
      style={{
        backgroundImage:
          banner &&
          `linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.375) 75%),
            url(https://api.hackclub.com${banner})`
      }}
      sx={{
        cursor: 'pointer',
        transform: open ? 'scale(0.9)' : 'scale(1)',
        transition: 'box-shadow 0.25s ease-in-out, transform 0.25s ease-in-out',
        boxShadow: open ? insetShadow(10) : fauxCardShadow(10, fauxCardColor),
        ':hover,:focus': {
          boxShadow: open ? insetShadow(15) : fauxCardShadow(14, fauxCardColor)
        }
      }}
    >
      {logo && (
        <Image
          src={`https://api.hackclub.com${logo}`}
          alt={`${name} logo`}
          loading="lazy"
          sx={{
            minWidth: 64,
            height: 64,
            objectFit: 'contain',
            borderRadius: 'default',
            mb: 1
          }}
        />
      )}
      <Heading as="h3" itemProp="name" sx={{ fontSize: [3, 4], mt: 2, mb: 3 }}>
        {name}
      </Heading>
      <Flex
        sx={{
          justifyContent: 'space-between',
          width: '100%',
          opacity: 0.875
        }}
      >
        <Text as="span">{humanizedDateRange(start, end)}</Text>
        <Text as="span">{events.length} locations</Text>
      </Flex>
      <Box sx={{ display: 'none' }}>
        <span itemProp="url">{website}</span>
        <span itemProp="startDate" content={start} children={end} />
        <span itemProp="endDate" content={end} children={end} />
      </Box>
    </Card>,
    events.map(event => (
      <EventCard
        {...event.fields}
        id={event.id}
        key={event.id}
        invisible={!open}
        inGroup
      />
    ))
  ]
}

export default GroupCard
