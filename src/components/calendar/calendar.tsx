import { Event } from '@/types/event';
import { EventComponent } from '../event/event-component';

type CalendarProps = {
  events: Event[];
};

export function Calendar({ events }: CalendarProps) {
  if (events.length === 0) {
    return (
      <div className="col-span-full py-20 text-center w-full">
        <p className="text-retro-muted text-xl font-medium">
          Não temos eventos agendados no momento. 😢
        </p>
        <p className="text-primary font-bold mt-2">
          Fique atento às nossas redes sociais para novidades!
        </p>
      </div>
    );
  }

  return (
    <>
      {events.map(({ id, date, name, flyer, location }) => (
        <EventComponent
          date={date}
          name={name}
          key={id}
          flyer={flyer}
          location={location}
        />
      ))}
    </>
  );
}
