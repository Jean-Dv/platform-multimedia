import { type DeleteBackofficeMultimediaSeasonCommand } from '@BackofficeMultimedia/Seasons/application/Delete/DeleteBackofficeMultimediaSeasonCommand'
import { type BackofficeMultimediaSeasonId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSeasonId'
import { BackofficeMultimediaSeasonIdMother } from '../../../Shared/domain/BackofficeMultimediaSeasonIdMother'

export class DeleteBackofficeMultimediaSeasonCommandMother {
  /**
   * Creates a valid `DeleteBackofficeMultimediaSeasonCommand`.
   *
   * @param id - The ID for the command.
   * @returns A valid command.
   */
  public static create(
    id: BackofficeMultimediaSeasonId
  ): DeleteBackofficeMultimediaSeasonCommand {
    return { id: id.value }
  }

  /**
   * Creates a random invalid `DeleteBackofficeMultimediaSeasonCommand`.
   *
   * @returns A random invalid command.
   */
  public static invalid(): DeleteBackofficeMultimediaSeasonCommand {
    return this.create(BackofficeMultimediaSeasonIdMother.random())
  }
}
