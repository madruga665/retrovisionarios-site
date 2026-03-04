'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { VideoPlayer } from '../video-player/video-player';
import { useRef } from 'react';
import { Video } from '@/types/video';

type CarouselProps = {
  title: string;
  videoMusic: Video[];
};

export function Carousel({ title, videoMusic }: CarouselProps) {
  const hasVideoMusic = videoMusic.length === 0;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = scrollRef.current.firstElementChild?.clientWidth;

      if (scrollAmount) {
        current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <section className="relative px-6 md:px-20 py-8 max-w-7xl mx-auto group">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4 flex-1">
          <h2 className="text-2xl font-bold text-vintage-teal uppercase tracking-widest italic whitespace-nowrap">
            {title}
          </h2>
          <div className="h-px bg-vintage-teal/20 flex-1"></div>
        </div>
        {hasVideoMusic ? null : (
          <div className="flex items-center gap-2 ml-4">
            <button
              className="size-10 flex items-center justify-center rounded-full border border-vintage-teal/20 text-vintage-teal hover:bg-vintage-teal hover:text-cream transition-all"
              onClick={() => scroll('left')}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="size-10 flex items-center justify-center rounded-full border border-vintage-teal/20 text-vintage-teal hover:bg-vintage-teal hover:text-cream transition-all"
              onClick={() => scroll('right')}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
      {hasVideoMusic ? (
        <div className="col-span-full py-20 text-center w-full">
          <p className="text-retro-muted text-xl font-medium">
            Nada aqui no momento. 😢
          </p>
          <p className="text-primary font-bold mt-2">
            Fique atento às nossas redes sociais para novidades!
          </p>
        </div>
      ) : (
        <div className="flex overflow-x-auto gap-8 pb-4" ref={scrollRef}>
          {videoMusic.map(({ id, title, subtitle, videoSrc }) => {
            return (
              <VideoPlayer
                key={id}
                title={title}
                subTitle={subtitle}
                videoSrc={videoSrc}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
