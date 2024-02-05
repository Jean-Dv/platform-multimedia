import { DateMother } from './../../../Shared/domain/DateMother'
import { BackofficeMultimediaMovieReleaseYear } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieReleaseYear'

/**
 * Factory class for creating instances of `BackofficeMultimediaMovieReleaseYear` for testing.
 */
export class BackofficeMultimediaMovieReleaseYearMother {
  /**
   * Creates a `BackofficeMultimediaMovieReleaseYear` with the specified value.
   *
   * @param value - The value to be used for creating the instance.
   * @returns An instance of `BackofficeMultimediaMovieReleaseYear`.
   */
  public static create(value: number): BackofficeMultimediaMovieReleaseYear {
    return new BackofficeMultimediaMovieReleaseYear(value)
  }

  /**
   * Creates a random `BackofficeMultimediaMovieReleaseYear`.
   *
   * @returns A random instance of `BackofficeMultimediaMovieReleaseYear`.
   */
  public static random(): BackofficeMultimediaMovieReleaseYear {
    return this.create(DateMother.random().past().getFullYear())
  }

  /**
   * Generates an invalid value for `BackofficeMultimediaMovieReleaseYear`.
   *
   * @returns An invalid value for `BackofficeMultimediaMovieReleaseYear`.
   */
  public static invalid(): number {
    return -1
  }
}
