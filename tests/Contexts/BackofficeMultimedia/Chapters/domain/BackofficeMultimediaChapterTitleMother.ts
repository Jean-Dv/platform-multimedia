import { WordMother } from './../../../Shared/domain/WordMother'
import { BackofficeMultimediaChapterTitle } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterTitle'

/**
 * Factory class for creating instances of `BackofficeMultimediaChapterTitle` for testing.
 */
export class BackofficeMultimediaChapterTitleMother {
  /**
   * Creates a `BackofficeMultimediaChapterTitle` with the specified value.
   *
   * @param value - The value to be used for creating the instance.
   * @returns An instance of `BackofficeMultimediaChapterTitle`.
   */
  public static create(value: string): BackofficeMultimediaChapterTitle {
    return new BackofficeMultimediaChapterTitle(value)
  }

  /**
   * Creates a random `BackofficeMultimediaChapterTitle`.
   *
   * @returns A random instance of `BackofficeMultimediaChapterTitle`.
   */
  public static random(): BackofficeMultimediaChapterTitle {
    return this.create(WordMother.random({ max: 2 }))
  }

  /**
   * Generates an invalid value for `BackofficeMultimediaChapterTitle`.
   *
   * @returns An invalid value for `BackofficeMultimediaChapterTitle`.
   */
  public static invalid(): string {
    return WordMother.random({ max: 50 })
  }
}
