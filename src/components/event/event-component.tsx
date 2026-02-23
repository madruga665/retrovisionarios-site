import { Clock, MapPin } from 'lucide-react';
import Image from 'next/image';

type EventProps = {
  date: Date;
  name: string;
  flyer?: string | null;
  location?: string | null;
};

export function EventComponent({ date, name, flyer, location }: EventProps) {
  const formattedDate = new Date(date);
  const shortMonth = formattedDate.toLocaleString('pt-BR', {
    month: 'short',
  });
  const day = formattedDate.toLocaleString('pt-BR', {
    day: 'numeric',
  });
  const hour = formattedDate.toLocaleString('pt-BR', {
    hour: 'numeric',
    minute: 'numeric',
  });

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-xl shadow-retro-text/5 group flex flex-col border border-primary/5">
      <div className="relative aspect-[4/3] overflow-hidden vintage-filter">
        <div className="absolute top-4 left-4 z-10 bg-primary text-white font-black px-4 py-2 rounded-lg text-center shadow-lg transform -rotate-3">
          <span className="block text-xs uppercase opacity-80 leading-none">
            {shortMonth}
          </span>
          <span className="block text-2xl leading-none">{day}</span>
        </div>
        <Image
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter grayscale-[20%] sepia-[10%]"
          alt="event flyer"
          width={300}
          height={300}
          src={flyer || '/images/large-arena-concert.png'}
        />
      </div>
      <div className="p-6 flex flex-col flex-1 gap-4">
        <div>
          <h3 className="text-2xl font-black text-retro-text leading-tight mb-4 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-retro-muted font-bold flex items-center gap-2 mt-1">
            <MapPin size={28} className="text-vintage-teal" />
            {location || 'Local a definir'}
          </p>
        </div>
        <div className="mt-auto flex flex-col gap-4">
          <div className="flex justify-between items-center text-sm font-bold border-t border-dashed border-primary/20 pt-4">
            <span className="flex items-center gap-2">
              <Clock size={20} className="text-primary" />
              {hour} HS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
