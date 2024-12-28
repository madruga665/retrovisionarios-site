import { Event } from '../event/Event';

export function Calendar() {
  type Event = {
    date: string;
    name: string;
    isCompleted: boolean;
  };

  const EventsList: Event[] = [
    { date: '17/11/24', name: 'Vega Rock Day (Evento Fechado)', isCompleted: true },
    { date: '08/12/24', name: 'Moto Club Cães do Litoral', isCompleted: true },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold">Agenda 2024</h2>
      <ul>
        {EventsList.map(({ date, name, isCompleted }) => (
          <Event date={date} name={name} key={date + name} isCompleted={isCompleted} />
        ))}
      </ul>
    </div>
  );
}
