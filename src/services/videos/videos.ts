import { fetchAdapter } from '@/adapters/fetchAdapter';
import { Video, VideoResponse } from '@/types/video';

type VideoResult = {
  cover: Video[];
  originalSong: Video[];
};

export async function getAllVideos(): Promise<VideoResult> {
  try {
    const response = await fetchAdapter<VideoResponse>(`/v1/videos`, {
      method: 'GET',
      next: { revalidate: 3600 },
    });

    return {
      cover: response.result.cover || [],
      originalSong: response.result.original_song || [],
    };
  } catch (error) {
    console.error('Error fetching videos:', error);
    return { cover: [], originalSong: [] };
  }
}
