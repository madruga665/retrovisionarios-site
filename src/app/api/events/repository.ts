import { Event } from '@/app/types/Event';
import { PrismaClient } from '@/generated/client';
import { EventBody } from './route';

export const prisma = new PrismaClient();

export async function getAllEventsRepository(): Promise<Event[]> {
  const events = await prisma.events.findMany({});

  return events;
}

export async function getEventByIdRepository(id: number): Promise<Event | null> {
  const event = await prisma.events.findUnique({
    where: { id },
  });

  return event;
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

export async function deleteEventRepository(id: number): Promise<Event> {
  const deletedEvent = await prisma.events.delete({
    where: { id },
  });

  return deletedEvent;
}
