import { BackofficeMultimediaMovieTitle } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieTitle'
import { WordMother } from '../../../Shared/domain/WordMother'

/**
 * Factory class for creating instances of `BackofficeMultimediaMovieTitle` for testing.
 */
export class BackofficeMultimediaMovieTitleMother {
  /**
   * Creates a `BackofficeMultimediaMovieTitle` with the specified value.
   *
   * @param value - The value to be used for creating the instance.
   * @returns An instance of `BackofficeMultimediaMovieTitle`.
   */
  public static create(value: string): BackofficeMultimediaMovieTitle {
    return new BackofficeMultimediaMovieTitle(value)
  }

  /**
   * Creates a random `BackofficeMultimediaMovieTitle`.
   *
   * @returns A random instance of `BackofficeMultimediaMovieTitle`.
   */
  public static random(): BackofficeMultimediaMovieTitle {
    return this.create(WordMother.random({ max: 4 }))
  }

  /**
   * Generates an invalid value for `BackofficeMultimediaMovieTitle`.
   *
   * @returns An invalid value for `BackofficeMultimediaMovieTitle`.
   */
  public static invalid(): string {
    return WordMother.random({ max: 50 })
  }
}
