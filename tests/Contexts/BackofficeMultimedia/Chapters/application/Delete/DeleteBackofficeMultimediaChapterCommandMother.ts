import { type DeleteBackofficeMultimediaChapterCommand } from '@BackofficeMultimedia/Chapters/application/Delete/DeleteBackofficeMultimediaChapterCommand'
import { type BackofficeMultimediaChapterId } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterId'
import { BackofficeMultimediaChapterIdMother } from '../../domain/BackofficeMultimediaChapterIdMother'

/**
 * Utility class for creating `DeleteBackofficeMultimediaChapterCommand` instances for testing.
 */
export class DeleteBackofficeMultimediaChapterCommandMother {
  /**
   * Creates a valid `DeleteBackofficeMultimediaChapterCommand`.
   *
   * @param id - The ID for the command.
   * @returns A valid command.
   */
  public static create(
    id: BackofficeMultimediaChapterId
  ): DeleteBackofficeMultimediaChapterCommand {
    return { id: id.value }
  }

  /**
   * Creates a random valid `DeleteBackofficeMultimediaChapterCommand`.
   *
   * @returns A random valid command.
   */
  public static random(): DeleteBackofficeMultimediaChapterCommand {
    return this.create(BackofficeMultimediaChapterIdMother.random())
  }
}
