import { EventsContainer } from '@/components/calendar/events-container';
import { Suspense } from 'react';

export default function AgendaPage() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <main className="flex-1 flex flex-col items-center">
      <div className="max-w-[1200px] w-full px-6 py-12 md:py-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 border-l-4 border-primary pl-6">
          <div className="flex flex-col gap-3">
            <span className="text-primary font-bold tracking-widest uppercase text-sm">
              On Tour {year}
            </span>
            <h1 className="text-retro-text text-5xl md:text-7xl font-black leading-none tracking-tighter">
              NOSSA AGENDA
            </h1>
            <p className="text-retro-muted text-lg max-w-lg font-medium">
              Viva a experiência retrô definitiva. Próximos shows, festivais e
              encontros exclusivos.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Suspense
            fallback={<p className="text-center">Carregando shows...</p>}
          >
            <EventsContainer />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
