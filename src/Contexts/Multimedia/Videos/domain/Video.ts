import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { VideoId } from './VideoId'
import { VideoUrl } from './VideoUrl'

/**
 * This class represents a video.
 */
export class Video extends AggregateRoot {
  public readonly id: VideoId
  public readonly url: VideoUrl

  constructor(id: VideoId, url: VideoUrl) {
    super()
    this.id = id
    this.url = url
  }

  /**
   * Create a new Video from primitives.
   *
   * @param plainData - The plain object containing the video information.
   * @returns A new Video instance.
   */
  public static fromPrimitives(plainData: { id: string; url: string }): Video {
    return new Video(new VideoId(plainData.id), new VideoUrl(plainData.url))
  }

  /**
   * Convert the video to primitive values.
   *
   * @returns The plain object with the video information.
   */
  public toPrimitives(): { id: string; url: string } {
    return { id: this.id.value, url: this.url.value }
  }
}
