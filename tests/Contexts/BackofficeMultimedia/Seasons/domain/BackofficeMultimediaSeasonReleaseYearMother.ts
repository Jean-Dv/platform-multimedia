import { DateMother } from './../../../Shared/domain/DateMother'
import { BackofficeMultimediaSeasonReleaseYear } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonReleaseYear'

/**
 * Factory class for creating instances of `BackofficeMultimediaSeasonReleaseYear` for testing.
 */
export class BackofficeMultimediaSeasonReleaseYearMother {
  /**
   * Creates a `BackofficeMultimediaSeasonReleaseYear` with the specified value.
   *
   * @param value - The value to be used for creating the instance.
   * @returns An instance of `BackofficeMultimediaSeasonReleaseYear`.
   */
  public static create(value: number): BackofficeMultimediaSeasonReleaseYear {
    return new BackofficeMultimediaSeasonReleaseYear(value)
  }

  /**
   * Creates a random `BackofficeMultimediaSeasonReleaseYear`.
   *
   * @returns A random instance of `BackofficeMultimediaSeasonReleaseYear`.
   */
  public static random(): BackofficeMultimediaSeasonReleaseYear {
    return this.create(DateMother.random().past().getFullYear())
  }

  /**
   * Generates an invalid value for `BackofficeMultimediaSeasonReleaseYear`.
   *
   * @returns An invalid value for `BackofficeMultimediaSeasonReleaseYear`.
   */
  public static invalid(): number {
    return -1
  }
}
