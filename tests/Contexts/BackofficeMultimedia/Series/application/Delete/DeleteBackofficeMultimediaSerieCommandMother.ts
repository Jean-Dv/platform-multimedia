import { type DeleteBackofficeMultimediaSerieCommand } from '@BackofficeMultimedia/Series/application/Delete/DeleteBackofficeMultimediaSerieCommand'
import { type BackofficeMultimediaSerieId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSerieId'
import { BackofficeMultimediaSerieIdMother } from '../../../Shared/domain/BackofficeMultimediaSerieIdMother'

/**
 * Utility class for creating `DeleteBackofficeMultimediaSerieCommand` instances for testing.
 */
export class DeleteBackofficeMultimediaSerieCommandMother {
  /**
   * Creates a valid `DeleteBackofficeMultimediaSerieCommand`.
   *
   * @param id - The ID for the command.
   * @returns A valid command.
   */
  public static create(
    id: BackofficeMultimediaSerieId
  ): DeleteBackofficeMultimediaSerieCommand {
    return { id: id.value }
  }

  /**
   * Creates a random invalid `DeleteBackofficeMultimediaSerieCommand`.
   *
   * @returns A random invalid command.
   */
  public static invalid(): DeleteBackofficeMultimediaSerieCommand {
    return this.create(BackofficeMultimediaSerieIdMother.random())
  }
}
