import { NextRequest, NextResponse } from "next/server";
import { deleteEvent } from "../service";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  if (request.method === 'DELETE') {
    try {
      const { id } = params;
      const eventId = Number(id);
  
      if (isNaN(eventId)) {
        return NextResponse.json({ error: 'Invalid event ID' }, { status: 400 });
      }
  
      await deleteEvent(eventId);
  
      return NextResponse.json(
        { message: 'Event deleted successfully' },
        { status: 200 }
      );
    } catch {
      return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
    }
  }
}