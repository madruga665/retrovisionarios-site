import { Event } from '@/types/event';
import { EventComponent } from '../event/event-component';

type CalendarProps = {
  events: Event[];
};

export function Calendar({ events }: CalendarProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold">Agenda 2025</h2>
      <div className="flex flex-col gap-4">
        {events.length > 0 ? (
          events.map(({ id, date, name, flyer }) => (
            <EventComponent date={date} name={name} key={id} flyer={flyer} />
          ))
        ) : (
          <p>Sem eventos no momento 😢</p>
        )}
      </div>
    </section>
  );
}
