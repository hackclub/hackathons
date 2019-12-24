import EventCard from './event-card'
import GroupCard from './group-card'

const sortingFunctions = {
  'start asc': (a, b) => {
    const [a_year, a_month, a_day] = a.start.split('-')
    const [b_year, b_month, b_day] = b.start.split('-')
    return a_year - b_year || a_month - b_month || a_day - b_day || a.id - b.id
  },
  'start desc': (a, b) => {
    const [a_year, a_month, a_day] = a.start.split('-')
    const [b_year, b_month, b_day] = b.start.split('-')
    return b_year - a_year || b_month - a_month || b_day - a_day || b.id - a.id
  }
}

const EventList = ({ events = [], groups = [], sortBy = 'start asc' }) =>
  groups
    .map(group => ({ ...group, type: 'group' }))
    .concat(
      events
        .map(event => ({ ...event, type: 'event' }))
        .filter(event => event.group_id === null)
    )
    // add events to groups
    .map(card => {
      if (card.type === 'group') {
        card.events = events.filter(e => Number(e.group_id) === Number(card.id))
      }
      return card
    })
    // remove groups that have no events
    .filter(card => card.type === 'event' || card.events.length > 0)
    // add start dates to groups
    .map(card =>
      card.type === 'group'
        ? {
            ...card,
            start: card.events.map(e => e.start).sort()[0]
          }
        : card
    )
    // sort cards by start date
    .sort(sortingFunctions[sortBy])
    .map(card =>
      card.type === 'group' ? (
        <GroupCard group={card} events={card.events} key={`group-${card.id}`} />
      ) : (
        <EventCard {...card} key={`event-${card.id}`} />
      )
    )

export default EventList
