import { Event } from '@/app/types/Event';
import { PrismaClient } from '@/generated/client';
import { EventBody } from './route';

export const prisma = new PrismaClient();

export async function getAllEventsRepository(): Promise<Event[]> {
  const events = await prisma.events.findMany({});

  return events;
}

export async function createEventRepository(event: EventBody): Promise<Event> {
  const createdEvent = await prisma.events.create({
    data: {
      name: event.name,
      date: new Date(event.date),
      flyer: event.flyer,
    },
  });

  return createdEvent;
}
