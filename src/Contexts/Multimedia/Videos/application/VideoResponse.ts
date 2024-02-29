import { type Video } from '../domain/Video'

interface IVideoResponse {
  id: string
  url: string
}

/**
 * Represents a response containing a one video
 */
export class VideoResponse {
  public readonly videoResponse: IVideoResponse

  constructor(video: Video) {
    this.videoResponse = video.toPrimitives()
  }
}
