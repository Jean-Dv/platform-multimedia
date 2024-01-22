import { UuidMother } from './../../../Shared/domain/UuidMother'
import { BackofficeMultimediaSeasonId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSeasonId'

/**
 * Factory class for creating instances of `BackofficeMultimediaSeasonId` for testing.
 */
export class BackofficeMultimediaSeasonIdMother {
  /**
   * Creates a `BackofficeMultimediaSeasonId` with the specified ID.
   *
   * @param id - The ID to be used for creating the instance.
   * @returns An instance of `BackofficeMultimediaSeasonId`.
   */
  public static create(id: string): BackofficeMultimediaSeasonId {
    return new BackofficeMultimediaSeasonId(id)
  }

  /**
   * Creates a random `BackofficeMultimediaSeasonId`.
   *
   * @returns A random instance of `BackofficeMultimediaSeasonId`.
   */
  public static random(): BackofficeMultimediaSeasonId {
    return this.create(UuidMother.random())
  }
}
