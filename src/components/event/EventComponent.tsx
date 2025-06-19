import Image from 'next/image';

type EventProps = {
  date: Date;
  name: string;
  flyer?: string | null;
};

export function EventComponent({ date, name, flyer }: EventProps) {
  const formattedDate = new Date(date);
  const dateString = formattedDate.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <div
      className={
        'flex sm:flex-row flex-col max-w-600 px-4 gap-4 py-2 font-bold border-2 items-center  border-cyan-600 rounded-md'
      }
    >
      <Image src={flyer ?? '/images/profile-image.jpg'} alt="Flyer" width={300} height={300} />
      <p className="flex flex-wrap">{`${dateString} - ${name}`}</p>
    </div>
  );
}
