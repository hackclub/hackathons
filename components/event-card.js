import { Card, Badge, Box, Heading, Text, Flex, Image } from 'theme-ui'
import Tilt from './tilt'
import { humanizedDateRange, formatAddress, trackClick } from '../lib/util'

const EventCard = ({
  id,
  name,
  website,
  start,
  end,
  city,
  state,
  country,
  countryCode,
  mlhAssociated,
  banner,
  logo,
  virtual,
  hybrid,
  hq = false,
  footer,
  lead,
  // distanceTo,
  invisible = false,
  useFilter = false
}) => (
  <Tilt>
    <Card
      as="a"
      href={website}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackClick({
        href: website,
        analyticsEventName: 'Event Clicked',
        analyticsProperties: {
          eventUrl: website,
          eventName: name,
          eventId: id
        }
      })}
      itemScope
      itemType="http://schema.org/Event"
      variant="event"
      sx={{ 
        display: invisible ? 'none' : hq ? 'flex' : 'flex', 
        px: 4, 
        backgroundImage: `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.375) 75%), url('${banner}')`,
        textAlign: hq ? ['center', 'right'] : 'center',
        flexDirection: hq ? ['column', 'row'] : 'column',
        gridColumn: hq ? '1 / -1' : null,
        opacity: (new Date(end) >= new Date() || !useFilter) ? null : 0.4
      }}
    >
      <Badge
        as="span"
        itemType="VirtualLocation"
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          bg: 'snow',
          color: virtual ? 'red' : hybrid ? 'orange' : 'blue',
          fontSize: 'inherit',
          textShadow: 'none',
          borderRadius: 5,
          display: hq ? 'none' : 'block'
        }}
      >
        {virtual ? 'Online' : hybrid ? 'Hybrid' : 'In-Person'}
      </Badge>
       
      {logo && (
        <Image
          src={logo}
          alt={`${name} logo`}
          loading="lazy"
          sx={{
            minWidth: 64,
            height: hq ? 200 : 64,
            width: hq ? '100%' : null,
            objectFit: hq ? 'contain' : 'contain',
            objectPosition: 'center',
            borderRadius: 'default',
            mt: 'auto'
          }}
        />
      )}
      {lead && !hq && <Box
        sx={{
          mb: hq ? 0 : 'auto',
          mt: hq ? 2 : 0,
          width: '100%',
          opacity: 1,
          fontWeight: 800,
          fontSize: 2
        }}
      >
        <Text>
         {lead}
        </Text>
      </Box>}
      <Heading
        as={'h3'}
        itemProp="name"
        sx={{
          fontSize: hq ? [4, 6] : [3, 4],
          mt: hq ? 0 : 2,
          mb: hq ? 0 : 3,
          overflowWrap: 'anywhere',
          width: '100%',
          display: hq ? 'none' : 'block'
        }}
      >
        {name}
      </Heading>
      <Box
        as="footer"
        sx={{
          mt: hq ? 0 : 'auto',
          mb: hq ? 2 : 0,
          width: '100%',
          fontSize: hq ? [2, 3] : null,
          opacity: 0.875,
          textTransform: hq ? 'uppercase' : 'none'
        }}
      >
        {footer ? (
          footer
        ) : (
          <>
            {' '}
            <Text as="span">{humanizedDateRange(start, end)}</Text>
            {/* distanceTo ? (
          <Text as="span">{`${humanizeDistance(distanceTo)} miles`}</Text>
        ) : ( */}
            <Text
              as="span"
              itemProp="location"
              itemScope
              itemType="http://schema.org/Place"
            >
              {!virtual && (
                <span itemProp="address">
                  {': '}
                  {formatAddress(city, state, country, countryCode)}
                </span>
              )}
            </Text>
          </>
        )}
      </Box>
      <Box sx={{ display: 'none' }}>
        <span itemProp="eventAttendanceMode">
          {virtual
            ? 'https://schema.org/OnlineEventAttendanceMode'
            : 'https://schema.org/OfflineEventAttendanceMode'}
        </span>
        <span itemProp="url">{website}</span>
        <span itemProp="startDate" content={start}>
          {start}
        </span>
        <span itemProp="endDate" content={end}>
          {end}
        </span>
      </Box>
    </Card>
  </Tilt>
)

export default EventCard
