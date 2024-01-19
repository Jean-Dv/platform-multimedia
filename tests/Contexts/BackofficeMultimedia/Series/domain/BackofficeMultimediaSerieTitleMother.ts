import { WordMother } from './../../../Shared/domain/WordMother'
import { BackofficeMultimediaSerieTitle } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieTitle'

/**
 * Factory class for creating instances of `BackofficeMultimediaSerieTitle` for testing.
 */
export class BackofficeMultimediaSerieTitleMother {
  /**
   * Creates a `BackofficeMultimediaSerieTitle` with the specified value.
   *
   * @param value - The value to be used for creating the instance.
   * @returns An instance of `BackofficeMultimediaSerieTitle`.
   */
  public static create(value: string): BackofficeMultimediaSerieTitle {
    return new BackofficeMultimediaSerieTitle(value)
  }

  /**
   * Creates a random `BackofficeMultimediaSerieTitle`.
   *
   * @returns A random instance of `BackofficeMultimediaSerieTitle`.
   */
  public static random(): BackofficeMultimediaSerieTitle {
    return this.create(WordMother.random({ max: 4 }))
  }

  /**
   * Generates an invalid value for `BackofficeMultimediaSerieTitle`.
   *
   * @returns An invalid value for `BackofficeMultimediaSerieTitle`.
   */
  public static invalid(): string {
    return WordMother.random({ max: 50 })
  }
}
