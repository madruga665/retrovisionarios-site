import { NextRequest, NextResponse } from 'next/server';
import { deleteEvent, getEventById } from '../service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const eventId = Number(id);

    if (isNaN(eventId)) {
      return NextResponse.json({ error: 'Invalid event ID' }, { status: 400 });
    }

    const event = await getEventById(eventId);

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json(event, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const eventId = Number(id);

    if (isNaN(eventId)) {
      return NextResponse.json({ error: 'Invalid event ID' }, { status: 400 });
    }

    const deletedEvent = await deleteEvent(eventId);

    return NextResponse.json(
      { message: 'Event deleted successfully', event: deletedEvent },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}
