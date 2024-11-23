import Image from 'next/image';

export function Calendar() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold">Agenda</h2>
      <ul>
        <li className="flex gap-1 line-through">
          <Image src="/images/icons/calendar.png" alt="Calendar icon" width={20} height={20} />
          <p>17/11/24 - Vega Rock Day (Evento Fechado)</p>
        </li>
        <li className='flex gap-1'>
          <Image src="/images/icons/calendar.png" alt="Calendar icon" width={20} height={20} />
          <p>08/12/24 - Moto Club Cães do Litoral</p>
        </li>
      </ul>
    </div>
  );
}
