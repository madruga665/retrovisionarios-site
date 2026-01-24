import { fetchAdapter } from '@/adapters/fetchAdapter';
import { Event } from '@/types/event';

export async function getAllEvents(): Promise<Event[]> {
  const events = await fetchAdapter<Event[]>('/v1/events', {
    method: 'GET',
    cache: 'no-store',
  });

  return events;
}
