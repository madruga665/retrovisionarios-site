import { NextResponse } from 'next/server';
import { createEvent, deleteEvent, getAllEvents } from './service';

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

    if (!body.name || !body.date) {
      return NextResponse.json(
        { error: 'Missing required fields: name, date' },
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

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const id = parseInt(body.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid event ID' }, { status: 400 });
    }

    await deleteEvent(id);

    return NextResponse.json(
      { message: 'Event deleted successfully' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
