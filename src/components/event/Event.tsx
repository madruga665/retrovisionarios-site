import Image from 'next/image';

type EventProps = {
  date: string;
  name: string;
  isCompleted: boolean;
  flyer?: string;
};

export function Event({ date, name, isCompleted, flyer }: EventProps) {
  const completedStyle = isCompleted ? 'line-through' : null;
  return (
    <div
      className={`flex sm:flex-row flex-col max-w-600 px-4 gap-4 py-2 font-bold border-2 items-center  border-cyan-600 rounded-md ${completedStyle}`}
    >
      <Image src={flyer ?? '/images/profile-image.jpg'} alt="Flyer" width={300} height={300} />
      <p className="flex flex-wrap">{`${date} - ${name}`}</p>
    </div>
  );
}
