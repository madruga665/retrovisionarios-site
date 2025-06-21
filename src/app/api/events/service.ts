import { Event } from '@/app/types/Event';
import {
  createEventRepository,
  deleteEventRepository,
  getAllEventsRepository,
  getEventByIdRepository,
} from './repository';
import { EventBody } from './route';

export async function getAllEvents(): Promise<Event[]> {
  const events = await getAllEventsRepository();

  return events;
}

export async function getEventById(id: number): Promise<Event | null> {
  const event = await getEventByIdRepository(id);

  return event;
}

export async function createEvent(event: EventBody): Promise<Event> {
  const createdEvent = await createEventRepository(event);

  return createdEvent;
}

export async function deleteEvent(id: number): Promise<Event> {
  const deletedEvent = await deleteEventRepository(id);

  return deletedEvent;
}
