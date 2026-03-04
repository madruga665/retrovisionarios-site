export type Video = {
  id: number;
  title: string;
  subtitle: string;
  videoSrc: string;
  category: 'ORIGINAL SONG' | 'COVER';
};

export type VideoResponse = {
  result: { cover: Video[]; original_song: Video[] };
};
