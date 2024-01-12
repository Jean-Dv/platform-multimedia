import { BackofficeMultimediaMovieSynopsis } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieSynopsis'
import { WordMother } from '../../../Shared/domain/WordMother'

/**
 * Factory class for creating instances of `BackofficeMultimediaMovieSynopsis` for testing.
 */
export class BackofficeMultimediaMovieSynopsisMother {
  /**
   * Creates a `BackofficeMultimediaMovieSynopsis` with the specified value.
   *
   * @param value - The value to be used for creating the instance.
   * @returns An instance of `BackofficeMultimediaMovieSynopsis`.
   */
  public static create(value: string): BackofficeMultimediaMovieSynopsis {
    return new BackofficeMultimediaMovieSynopsis(value)
  }

  /**
   * Creates a random `BackofficeMultimediaMovieSynopsis`.
   *
   * @returns A random instance of `BackofficeMultimediaMovieSynopsis`.
   */
  public static random(): BackofficeMultimediaMovieSynopsis {
    return this.create(WordMother.random({ max: 20 }))
  }
}
