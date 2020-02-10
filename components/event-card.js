import { Card, Box, Heading, Text, Flex, Image } from 'theme-ui'
import Tilt from './tilt'
import {
  imageSrc,
  humanizedDateRange,
  // humanizeDistance,
  formatAddress,
  trackClick
} from '../lib/util'

const EventCard = ({
  id,
  website,
  name,
  start,
  end,
  parsed_city,
  parsed_state_code,
  parsed_country,
  parsed_country_code,
  mlh_associated,
  banner,
  logo,
  // distanceTo,
  invisible = false,
  inGroup = false
}) => (
  <Tilt>
    <Card
      as="a"
      href={`https://api.hackclub.com/v1/events/${id}/redirect`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackClick({
        href: `https://api.hackclub.com/v1/events/${id}/redirect`,
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
        backgroundImage: `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.375) 75%), url('${imageSrc(
          banner
        )}')`
      }}
    >
      {mlh_associated && (
        <Image
          src="/mlh-logo-grayscale.svg"
          alt="MLH is associated"
          width={96}
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
      {logo && (
        <Image
          src={imageSrc(logo)}
          alt={`${name} logo`}
          loading="lazy"
          sx={{
            minWidth: 64,
            height: 64,
            objectFit: 'contain',
            borderRadius: 'default',
            mb: 1,
            mt: [0, 0, 5]
          }}
        />
      )}
      <Heading as="h3" itemProp="name" sx={{ fontSize: [3, 4], mt: 2, mb: 3 }}>
        {inGroup ? name.replace('LHD ', '') : name}
      </Heading>
      <Flex
        sx={{
          justifyContent: 'space-between',
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
          <span itemProp="address">
            {formatAddress(
              parsed_city,
              parsed_state_code,
              parsed_country,
              parsed_country_code
            )}
          </span>
        </Text>
      </Flex>
      <Box sx={{ display: 'none' }}>
        <span itemProp="url">{website}</span>
        <span itemProp="startDate" content={start} children={end} />
        <span itemProp="endDate" content={end} children={end} />
      </Box>
    </Card>
  </Tilt>
)

export default EventCard
