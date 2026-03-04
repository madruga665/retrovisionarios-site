import { getAllVideos } from '@/services/videos/videos';
import { Carousel } from '../carousel/carousel';

export async function VideosContent() {
  const videos = await getAllVideos();

  return (
    <>
      <Carousel title="Músicas Autorais" videoMusic={videos.originalSong} />
      <Carousel title="Covers" videoMusic={videos.cover} />
    </>
  );
}
