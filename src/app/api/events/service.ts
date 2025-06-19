import { Event } from "@/app/types/Event";
import { getAllEventsRepository } from "./repository";

export async function getAllEvents(): Promise<Event[]> {
  const events = await getAllEventsRepository();

  return events;
}