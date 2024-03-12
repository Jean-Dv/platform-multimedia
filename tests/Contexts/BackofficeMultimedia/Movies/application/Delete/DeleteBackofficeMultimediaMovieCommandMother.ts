import { type DeleteBackofficeMultimediaMovieCommand } from '@BackofficeMultimedia/Movies/application/Delete/DeleteBackofficeMultimediaMovieCommand'
import { type BackofficeMultimediaMovieId } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieId'
import { BackofficeMultimediaMovieIdMother } from '../../domain/BackofficeMultimediaMovieIdMother'

/**
 * Utility class for creating `DeleteBackofficeMultimediaMovieCommand` instances for testing.
 */
export class DeleteBackofficeMultimediaMovieCommandMother {
  /**
   * Creates a valid `DeleteBackofficeMultimediaMovieCommand`.
   *
   * @param id - The ID for the command.
   * @returns A valid command.
   */
  public static create(
    id: BackofficeMultimediaMovieId
  ): DeleteBackofficeMultimediaMovieCommand {
    return { id: id.value }
  }

  /**
   * Creates a random invalid `DeleteBackofficeMultimediaMovieCommand`.
   *
   * @returns A random invalid command.
   */
  public static invalid(): DeleteBackofficeMultimediaMovieCommand {
    return this.create(BackofficeMultimediaMovieIdMother.random())
  }
}
