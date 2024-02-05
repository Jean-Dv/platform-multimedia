import { DateMother } from './../../../Shared/domain/DateMother'
import { BackofficeMultimediaSerieReleaseYear } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieReleaseYear'

/**
 * Factory class for creating instances of `BackofficeMultimediaSerieReleaseYear` for testing.
 */
export class BackofficeMultimediaSerieReleaseYearMother {
  /**
   * Creates a `BackofficeMultimediaSerieReleaseYear` with the specified value.
   *
   * @param value - The value to be used for creating the instance.
   * @returns An instance of `BackofficeMultimediaSerieReleaseYear`.
   */
  public static create(value: number): BackofficeMultimediaSerieReleaseYear {
    return new BackofficeMultimediaSerieReleaseYear(value)
  }

  /**
   * Creates a random `BackofficeMultimediaSerieReleaseYear`.
   *
   * @returns A random instance of `BackofficeMultimediaSerieReleaseYear`.
   */
  public static random(): BackofficeMultimediaSerieReleaseYear {
    return this.create(DateMother.random().past().getFullYear())
  }

  /**
   * Generates an invalid value for `BackofficeMultimediaSerieReleaseYear`.
   *
   * @returns An invalid value for `BackofficeMultimediaSerieReleaseYear`.
   */
  public static invalid(): number {
    return -1
  }
}
