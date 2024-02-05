import { WordMother } from './../../../Shared/domain/WordMother'
import { BackofficeMultimediaSeasonTitle } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonTitle'

/**
 * Factory class for creating instances of `BackofficeMultimediaSeasonTitle` for testing.
 */
export class BackofficeMultimediaSeasonTitleMother {
  /**
   * Creates a `BackofficeMultimediaSeasonTitle` with the specified value.
   *
   * @param value - The value to be used for creating the instance.
   * @returns An instance of `BackofficeMultimediaSeasonTitle`.
   */
  public static create(value: string): BackofficeMultimediaSeasonTitle {
    return new BackofficeMultimediaSeasonTitle(value)
  }

  /**
   * Creates a random `BackofficeMultimediaSeasonTitle`.
   *
   * @returns A random instance of `BackofficeMultimediaSeasonTitle`.
   */
  public static random(): BackofficeMultimediaSeasonTitle {
    return this.create(WordMother.random({ max: 2 }))
  }

  /**
   * Generates an invalid value for `BackofficeMultimediaSeasonTitle`.
   *
   * @returns An invalid value for `BackofficeMultimediaSeasonTitle`.
   */
  public static invalid(): string {
    return WordMother.random({ max: 50 })
  }
}
