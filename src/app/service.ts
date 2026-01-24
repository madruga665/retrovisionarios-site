'use server';

import { Event } from './types/event';
import { getAllEvents as getAllEventsFromService } from '@/app/api/events/service';

export async function getAllEvents(): Promise<Event[]> {
  const events = await getAllEventsFromService();

  return events;
}
