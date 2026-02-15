import { EventsContainer } from '@/components/calendar/events-container';
import { Suspense } from 'react';

export default function AgendaPage() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-24">
      <h1 className="text-4xl font-bold mb-12">Agenda {year}</h1>
      <div className="w-full max-w-4xl">
        <Suspense fallback={<p className="text-center">Carregando shows...</p>}>
          <EventsContainer />
        </Suspense>
      </div>
    </main>
  );
}
