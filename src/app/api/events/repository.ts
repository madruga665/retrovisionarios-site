import { Event } from "@/app/@types/Event";
import { PrismaClient } from "@/generated/client";

export const prisma = new PrismaClient();

export async function getAllEventsRepository(): Promise<Event[]> {
  const events = await prisma.events.findMany({
    
  });

  return events;
}
