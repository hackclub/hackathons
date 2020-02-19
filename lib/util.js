import pluralize from 'pluralize'

export const imageSrc = file => {
  file?.file_path ? `https://api.hackclub.com${file.file_path}` : ''
}

export const humanizeDistance = num => {
  if (num <= 100) {
    return parseFloat(num.toFixed(1))
  } else {
    return Math.round(num)
  }
}

export const formatAddress = (city, stateCode, country, countryCode) => {
  const firstHalf = city
  const secondHalf = countryCode === 'US' ? stateCode : country

  const final = [firstHalf, secondHalf].filter(e => e).join(', ') // Handle case where city or country is null

  // Handle case where an event's location is outside the US and is so long that
  // it overflows the card when rendering. If the total length of the location
  // is over 16 characters and outside the US, then just show the country name.
  if (countryCode !== 'US' && final.length > 16) {
    return country
  } else {
    return final
  }
}

export const distance = (lat1, lon1, lat2, lon2) => {
  // https://www.geodatasource.com/developers/javascript
  const radlat1 = (Math.PI * lat1) / 180
  const radlat2 = (Math.PI * lat2) / 180
  const theta = lon1 - lon2
  const radtheta = (Math.PI * theta) / 180
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
  dist = Math.acos(dist)
  dist = (dist * 180) / Math.PI
  dist = dist * 60 * 1.1515
  return {
    miles: dist,
    kilometers: dist * 1.609344
  }
}

const humanizedMonth = date => date.toLocaleString('en', { month: 'long' })
const shortHumanizedMonth = date => humanizedMonth(date).substring(0, 3)

export const humanizedDateRange = (start, end) => {
  let result = ''
  const startDate = new Date(start)
  startDate.setDate(startDate.getDate() + 1)
  const endDate = new Date(end)
  endDate.setDate(endDate.getDate() + 1)
  if (startDate.getMonth() === endDate.getMonth()) {
    if (startDate.getDate() === endDate.getDate()) {
      // Same day and month means we can return the date
      result = `${humanizedMonth(startDate)} ${startDate.getDate()}`
    } else {
      result = `${humanizedMonth(
        startDate
      )} ${startDate.getDate()}–${endDate.getDate()}`
    }
  } else {
    result = `${shortHumanizedMonth(
      startDate
    )} ${startDate.getDate()}–${shortHumanizedMonth(
      endDate
    )} ${endDate.getDate()}`
  }
  if (new Date().getFullYear() !== startDate.getFullYear()) {
    result += `, ${startDate.getFullYear()}`
  }
  return result
}

export const trackClick = props => e => {
  e.preventDefault()
  try {
    window.analytics.track(props.analyticsEventName || 'Clicked Link', {
      href: props.href,
      ...(props.analyticsProperties || {})
    })
  } catch (err) {
    console.error(err)
  }
  props.onClick
    ? props.onClick(e)
    : props.noNewTab
    ? (window.location.href = props.href)
    : window.open(props.href, '_blank')
}

// based on https://github.com/withspectrum/spectrum/blob/alpha/src/helpers/utils.js#L146
export const timeSince = (
  previous,
  absoluteDuration = false,
  current = new Date(),
  longForm = false
) => {
  const msPerSecond = 1000
  const msPerMinute = msPerSecond * 60
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 24
  const msPerWeek = msPerDay * 7
  const msPerYear = msPerDay * 365

  const elapsed = new Date(current) - new Date(previous)

  let humanizedTime
  if (elapsed < msPerMinute) {
    humanizedTime = '< 1m'
  } else if (elapsed < msPerHour) {
    const now = Math.round(elapsed / msPerMinute)
    humanizedTime = longForm ? `${now} ${pluralize('minute', now)}` : `${now}m`
  } else if (elapsed < msPerDay) {
    const now = Math.round(elapsed / msPerHour)
    humanizedTime = longForm ? `${now} ${pluralize('hour', now)}` : `${now}h`
  } else if (elapsed < msPerWeek) {
    const now = Math.round(elapsed / msPerDay)
    humanizedTime = longForm ? `${now} ${pluralize('day', now)}` : `${now}d`
  } else if (elapsed < msPerYear) {
    const now = Math.round(elapsed / msPerWeek)
    humanizedTime = longForm ? `${now} ${pluralize('week', now)}` : `${now}w`
  } else {
    const now = Math.round(elapsed / msPerYear)
    humanizedTime = longForm ? `${now} ${pluralize('year', now)}` : `${now}y`
  }

  if (absoluteDuration) {
    return humanizedTime
  } else {
    return elapsed > 0 ? `${humanizedTime} ago` : `in ${humanizedTime}`
  }
}
