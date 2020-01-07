import { Card, Box, Heading, Text, Flex, Image } from '@theme-ui/components'
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
  name,
  website_url,
  start_date,
  end_date,
  city,
  state,
  country,
  mlh_associated,
  background_image,
  logo_image,
  // distanceTo,
  invisible = false,
  inGroup = false
}) => (
  <Tilt>
    <Card
      as="a"
      href={website_url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackClick({
        href: website_url,
        analyticsEventName: 'Event Clicked',
        analyticsProperties: {
          eventUrl: website_url,
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
          background_image
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
      {logo_image && (
        <Image
          src={imageSrc(logo_image)}
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
        {inGroup ? name.replace('LHD ', '') : name}
      </Heading>
      <Flex
        sx={{
          justifyContent: 'space-between',
          width: '100%',
          opacity: 0.875
        }}
      >
        <Text as="span">{humanizedDateRange(start_date, end_date)}</Text>
        {/* distanceTo ? (
          <Text as="span">{`${humanizeDistance(distanceTo)} miles`}</Text>
        ) : ( */}
        <Text
          as="span"
          itemProp="location"
          itemScope
          itemType="http://schema.org/Place"
        >
          <span itemProp="address">{formatAddress(city, state, country)}</span>
        </Text>
      </Flex>
      <Box sx={{ display: 'none' }}>
        <span itemProp="url">{website_url}</span>
        <span itemProp="startDate" content={start_date} children={start_date} />
        <span itemProp="endDate" content={end_date} children={end_date} />
      </Box>
    </Card>
  </Tilt>
)

export default EventCard
