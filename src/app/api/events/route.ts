import { NextResponse } from 'next/server';
import { createEvent, getAllEvents } from './service';

export async function GET() {
  const events = await getAllEvents();

  return NextResponse.json(events);
}

export type EventBody = {
  name: string;
  date: string;
  flyer: string;
};

export async function POST(request: Request) {
  try {
    const body: EventBody = await request.json();

    if (!body.name || !body.date || !body.flyer) {
      return NextResponse.json(
        { error: 'Missing required fields: name, date, flyer' },
        { status: 400 }
      );
    }

    await createEvent(body);

    return NextResponse.json(
      { message: 'Event created successfully', data: body },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
