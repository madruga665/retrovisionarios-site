import { fetchAdapter } from '@/adapters/fetchAdapter';
import { Event, EventResponse } from '@/types/event';

export async function getAllEvents(): Promise<Event[]> {
  try {
    const response = await fetchAdapter<EventResponse>('/v1/events', {
      method: 'GET',
      cache: 'no-store',
    });

    return response.result;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}
