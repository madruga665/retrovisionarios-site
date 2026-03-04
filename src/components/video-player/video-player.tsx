type VideoPlayerProps = {
  title: string;
  subTitle: string;
  videoSrc: string;
};

export function VideoPlayer({ title, subTitle, videoSrc }: VideoPlayerProps) {
  return (
    <div className="group relative cursor-pointer min-w-[320px] md:min-w-[480px] shrink-0">
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-xl">
        <iframe
          className="w-full h-full"
          src={
            videoSrc.startsWith('https://www.youtube.com/embed/')
              ? videoSrc
              : ''
          }
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-presentation"
          referrerPolicy="strict-origin-when-cross-origin"
          loading="lazy"
        ></iframe>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold text-vintage-teal uppercase">
          {title}
        </h3>
        <p className="text-slate-500 text-sm">{subTitle}</p>
      </div>
    </div>
  );
}
