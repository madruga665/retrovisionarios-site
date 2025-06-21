import { NextRequest, NextResponse } from 'next/server';
import { createEvent, getAllEvents } from './service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const events = await getAllEvents();

    return NextResponse.json(events, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export type EventBody = {
  name: string;
  date: string;
  flyer: string;
};

export async function POST(request: NextRequest) {
  try {
    const body: EventBody = await request.json();

    if (!body.name || !body.date) {
      return NextResponse.json({ error: 'Missing required fields: name, date' }, { status: 400 });
    }

    const createdEvent = await createEvent(body);

    return NextResponse.json(
      { message: 'Event created successfully', event: createdEvent },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
