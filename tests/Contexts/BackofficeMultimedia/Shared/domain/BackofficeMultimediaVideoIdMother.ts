import { UuidMother } from '../../../Shared/domain/UuidMother'
import { BackofficeMultimediaVideoId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaVideoId'

/**
 * Factory class for creating instances of `BackofficeMultimediaVideoId` for testing.
 */
export class BackofficeMultimediaVideoIdMother {
  /**
   * Creates a `BackofficeMultimediaVideoId` with the specified ID.
   *
   * @param value - The ID to be used for creating the instance.
   * @returns An instance of `BackofficeMultimediaVideoId`.
   */
  public static create(value: string): BackofficeMultimediaVideoId {
    return new BackofficeMultimediaVideoId(value)
  }

  /**
   * Creates a random `BackofficeMultimediaVideoId`.
   *
   * @returns A random instance of `BackofficeMultimediaVideoId`.
   */
  public static random(): BackofficeMultimediaVideoId {
    return this.create(UuidMother.random())
  }
}
