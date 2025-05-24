import { Event } from '../event/Event';

export function Calendar() {
  type Event = {
    date: string;
    name: string;
    flyer?: string;
  };

  function isCompleted(dateString: string): boolean {
    const [day, month, year] = dateString.split('/').map(Number);
    const fullYear = year < 100 ? 2000 + year : year;
    const eventDate = new Date(fullYear, month - 1, day, 23, 59, 59);
    const now = new Date();

    return eventDate < now;
  }

  const EventsList: Event[] = [
    { date: '07/06/25', name: 'Jamel Studio' },
    { date: '27/06/25', name: 'The Olds', flyer: '/images/events/the-olds-27-06-25.jpeg' },
    { date: '12/07/25', name: 'Moto Club Ovelhas Desgarradas', flyer: '/images/events/ovelhas-desgarradas-12-07-25.jpeg' },
  ];

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold">Agenda 2025</h2>
      <div className="flex flex-col gap-4">
        {EventsList.map(({ date, name, flyer }) => (
          <Event
            date={date}
            name={name}
            key={date + name}
            isCompleted={isCompleted(date)}
            flyer={flyer}
          />
        ))}
      </div>
    </section>
  );
}
