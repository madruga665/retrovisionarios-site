'use client';

import Image from 'next/image';
import Link from 'next/link';

export function FeatureInfo() {
  function openYoutube(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="px-6 md:px-20 py-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl md:text-5xl font-black text-vintage-teal uppercase leading-tight italic">
            Nostalgia redefinida para a era moderna.
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed max-w-xl">
            Retrovisionarios é mais do que uma banda. É uma cápsula do tempo
            sonora que combina o calor dos sintetizadores analógicos com a
            precisão da produção contemporânea.
          </p>
          <div className="flex gap-4">
            <button
              className="px-8 py-3 bg-vintage-teal text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
              onClick={() =>
                openYoutube('https://www.youtube.com/@Retrovisionarios1986')
              }
            >
              Ouvir Agora
            </button>
            <Link
              className="px-8 py-3 border-2 border-vintage-teal text-vintage-teal font-bold rounded-lg hover:bg-vintage-teal hover:text-white transition-all"
              href={'/agenda'}
            >
              Ver Datas
            </Link>
          </div>
        </div>
        <div className="flex-1 w-full">
          <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
            <Image
              width={300}
              height={300}
              alt="Vintage concert lights"
              className="w-full h-full object-cover"
              data-alt="Close up of vintage stage lighting equipment"
              src="/images/stage-lighting.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
