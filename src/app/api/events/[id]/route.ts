import { NextRequest, NextResponse } from 'next/server';
import { deleteEvent, getEventById, updateEvent } from '../service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function validateFlyerUrl(flyer: string): boolean {
  return (
    typeof flyer === 'string' &&
    (flyer.startsWith('http://') ||
      flyer.startsWith('https://') ||
      flyer.startsWith('/'))
  );
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const eventId = Number(id);
    const body = await request.json();
    const isValidFlyerUrl = validateFlyerUrl(body.flyer);

    if (isNaN(eventId)) {
      return NextResponse.json({ error: 'Invalid event ID' }, { status: 400 });
    }

    if (!isValidFlyerUrl) {
      return NextResponse.json(
        {
          error:
            'Invalid flyer URL. It must start with http://, https://, or /',
        },
        { status: 400 }
      );
    }

    const updatedEvent = await updateEvent(eventId, body);

    return NextResponse.json(
      { message: 'Event updated successfully', event: updatedEvent },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to update event', error },
      { status: 500 }
    );
  }
}
