import { BackofficeMultimediaChapterReleaseYear } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterReleaseYear'
import { DateMother } from './../../../Shared/domain/DateMother'

/**
 * Factory class for creating instances of `BackofficeMultimediaChapterReleaseYear` for testing.
 */
export class BackofficeMultimediaChapterReleaseYearMother {
  /**
   * Creates a `BackofficeMultimediaChapterReleaseYear` with the specified value.
   *
   * @param value - The value to be used for creating the instance.
   * @returns An instance of `BackofficeMultimediaChapterReleaseYear`.
   */
  public static create(value: number): BackofficeMultimediaChapterReleaseYear {
    return new BackofficeMultimediaChapterReleaseYear(value)
  }

  /**
   * Creates a random `BackofficeMultimediaChapterReleaseYear`.
   *
   * @returns A random instance of `BackofficeMultimediaChapterReleaseYear`.
   */
  public static random(): BackofficeMultimediaChapterReleaseYear {
    return this.create(DateMother.random().past().getFullYear())
  }

  /**
   * Generates an invalid value for `BackofficeMultimediaChapterReleaseYear`.
   *
   * @returns An invalid value for `BackofficeMultimediaChapterReleaseYear`.
   */
  public static invalid(): number {
    return -1
  }
}
