import { VideoId } from '@Multimedia/Shared/domain/Video/VideoId'
import { UuidMother } from '../../../Shared/domain/UuidMother'

/**
 * Factoring class for VideoId.
 */
export class VideoIdMother {
  /**
   * Creates a VideoId instance from a string.
   *
   * @param value - The value of the video id.
   * @returns An instance of VideoId.
   */
  public static create(value: string): VideoId {
    return new VideoId(value)
  }

  /**
   * Create a random VideoId instance.
   *
   * @returns A random VideoId instance.
   */
  public static random(): VideoId {
    return this.create(UuidMother.random())
  }
}
