import { type VideoRepository } from '@Multimedia/Videos/domain/VideoRepository'
import { VideoResponse } from '../VideoResponse'
import { VideoNotFound } from '@Multimedia/Videos/domain/VideoNotFound'
import { type VideoId } from '@Multimedia/Videos/domain/VideoId'

/**
 * Represents a class responsible for finding a video by id.
 */
export class VideoFinder {
  constructor(private readonly repository: VideoRepository) {}

  /**
   * Executes the video find based on provided id.
   */

  public async run(id: VideoId): Promise<VideoResponse> {
    const video = await this.repository.search(id)
    if (video === null) {
      throw new VideoNotFound(`The video <${id.value}> does not exist.`)
    }
    return new VideoResponse(video)
  }
}
