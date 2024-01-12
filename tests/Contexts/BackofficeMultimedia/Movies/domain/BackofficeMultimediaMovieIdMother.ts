import { BackofficeMultimediaMovieId } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieId'
import { UuidMother } from '../../../Shared/domain/UuidMother'

/**
 * Factory class for creating instances of `BackofficeMultimediaMovieId` for testing.
 */
export class BackofficeMultimediaMovieIdMother {
  /**
   * Creates a `BackofficeMultimediaMovieId` with the specified ID.
   *
   * @param value - The ID to be used for creating the instance.
   * @returns An instance of `BackofficeMultimediaMovieId`.
   */
  public static create(value: string): BackofficeMultimediaMovieId {
    return new BackofficeMultimediaMovieId(value)
  }

  /**
   * Creates a random `BackofficeMultimediaMovieId`.
   *
   * @returns A random instance of `BackofficeMultimediaMovieId`.
   */
  public static random(): BackofficeMultimediaMovieId {
    return this.create(UuidMother.random())
  }
}
