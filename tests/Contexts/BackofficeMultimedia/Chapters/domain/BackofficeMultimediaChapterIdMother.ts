import { UuidMother } from './../../../Shared/domain/UuidMother'
import { BackofficeMultimediaChapterId } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterId'

/**
 * Factory class for creating instances of `BackofficeMultimediaChapterId` for testing.
 */
export class BackofficeMultimediaChapterIdMother {
  /**
   * Creates a `BackofficeMultimediaChapterId` with the specified ID.
   *
   * @param id - The ID to be used for creating the instance.
   * @returns An instance of `BackofficeMultimediaChapterId`.
   */
  public static create(id: string): BackofficeMultimediaChapterId {
    return new BackofficeMultimediaChapterId(id)
  }

  /**
   * Creates a random `BackofficeMultimediaChapterId`.
   *
   * @returns A random instance of `BackofficeMultimediaChapterId`.
   */
  public static random(): BackofficeMultimediaChapterId {
    return this.create(UuidMother.random())
  }
}
