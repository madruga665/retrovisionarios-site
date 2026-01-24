'use server';

import { Event } from '@/types/event';

export async function getAllEvents(): Promise<Event[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/events`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Falha ao buscar eventos');
  }

  const { result } = await response.json();

  return result;
}
