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

const EventList = ({ events = [], sortBy = 'start asc' }) =>
  events
    // sort cards by start date
    .sort(sortingFunctions[sortBy])
    .map(card => <EventCard {...card} key={`event-${card.id}`} /> )
    

export default EventList
