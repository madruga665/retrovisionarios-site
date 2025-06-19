import { NextResponse } from 'next/server';
import { getAllEvents } from './service';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Revalidate every 60 seconds

export async function GET() {
  const events = await getAllEvents();

  return NextResponse.json(events);
}
