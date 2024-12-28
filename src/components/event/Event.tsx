import Image from "next/image";

type EventProps = {
  date: string;
  name: string;
  isCompleted: boolean;
}

export function Event({date, name, isCompleted}: EventProps) {
  const completedStyle = isCompleted ? 'line-through' : null
  return (
    <li className={`flex gap- ${completedStyle}`}>
      <Image src="/images/icons/calendar.png" alt="Calendar icon" width={20} height={20} />
      <p>{`${date} - ${name}`}</p>
    </li>
  );
}
