import { type Video } from './Video'
import { type VideoId } from './VideoId'

export interface VideoRepository {
  /**
   * Search for a video by its id.
   *
   * @param id - The id of the video to search.
   * @returns A promise that resolves to the video with the given id, or null if no video is found.
   */
  search: (id: VideoId) => Promise<Video | null>
}
