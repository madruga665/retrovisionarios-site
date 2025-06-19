import { Event } from '@/app/types/Event';
import { createEventRepository, getAllEventsRepository } from './repository';
import { EventBody } from './route';

export async function getAllEvents(): Promise<Event[]> {
  const events = await getAllEventsRepository();

  return events;
}

export async function createEvent(event: EventBody): Promise<void> {
  await createEventRepository(event);
}
