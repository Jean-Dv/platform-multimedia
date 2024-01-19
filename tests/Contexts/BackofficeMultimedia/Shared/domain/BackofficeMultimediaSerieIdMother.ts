import { UuidMother } from './../../../Shared/domain/UuidMother'
import { BackofficeMultimediaSerieId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSerieId'

/**
 * Factory class for creating instances of `BackofficeMultimediaSerieId` for testing.
 */
export class BackofficeMultimediaSerieIdMother {
  /**
   * Creates a `BackofficeMultimediaSerieId` with the specified ID.
   *
   * @param id - The ID to be used for creating the instance.
   * @returns An instance of `BackofficeMultimediaSerieId`.
   */
  public static create(id: string): BackofficeMultimediaSerieId {
    return new BackofficeMultimediaSerieId(id)
  }

  /**
   * Creates a random `BackofficeMultimediaSerieId`.
   *
   * @returns A random instance of `BackofficeMultimediaSerieId`.
   */
  public static random(): BackofficeMultimediaSerieId {
    return this.create(UuidMother.random())
  }
}
