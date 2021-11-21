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
  // distanceTo,
  invisible = false
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
      sx={{ display: invisible ? 'none' : 'flex' }}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.375) 75%), url('${banner}')`
      }}
    >
      {mlhAssociated && (
        <Image
          src="/mlh-logo-grayscale.svg"
          alt="MLH is associated"
          width={64}
          sx={{
            position: 'absolute',
            top: 16,
            left: 0,
            bg: 'snow',
            p: 2,
            borderTopRightRadius: 'default',
            borderBottomRightRadius: 'default'
          }}
        />
      )}

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
          borderRadius: 5
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
            height: 64,
            objectFit: 'contain',
            borderRadius: 'default',
            mt: 'auto'
          }}
        />
      )}
      <Heading
        as="h3"
        itemProp="name"
        sx={{ fontSize: [3, 4], mt: 2, mb: 3, overflowWrap: 'anywhere' }}
      >
        {name}
      </Heading>
      <Box
        as="footer"
        sx={{
          mt: 'auto',
          width: '100%',
          opacity: 0.875
        }}
      >
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
