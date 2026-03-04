import { VideosContent } from '@/components/videos-content/videos-content';
import { Suspense } from 'react';

export default async function MusicasPage() {
  return (
    <main className="flex-1">
      <div className="px-6 md:px-20 py-12 max-w-7xl mx-auto">
        <div className="border-l-4 border-muted-orange pl-6">
          <h1 className="text-4xl md:text-5xl font-black text-vintage-teal uppercase tracking-tight">
            Playlists
          </h1>
          <p className="text-slate-500 mt-2 font-medium uppercase tracking-[0.2em] text-sm">
            Explore nosso universo visual e sonoro
          </p>
        </div>
      </div>
      <Suspense
        fallback={
          <p className="text-slate-500 text-center">Carregando videos...</p>
        }
      >
        <VideosContent />
      </Suspense>
    </main>
  );
}
