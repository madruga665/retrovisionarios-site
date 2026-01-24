import { getAllEvents } from '@/actions/get-events';
import { Calendar } from './calendar';

export async function EventsContainer() {
  const events = await getAllEvents();

  return <Calendar events={events} />;
}
