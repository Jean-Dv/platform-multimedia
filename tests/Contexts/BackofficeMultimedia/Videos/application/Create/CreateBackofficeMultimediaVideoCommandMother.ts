import { type BackofficeMultimediaVideoId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaVideoId'
import { type CreateBackofficeMultimediaVideoCommand } from '@BackofficeMultimedia/Videos/application/Create/CreateBackofficeMultimediaVideoCommand'
import { type BackofficeMultimediaVideoPath } from '@BackofficeMultimedia/Videos/domain/BackofficeMultimediaVideoPath'
import { BackofficeMultimediaVideoIdMother } from '../../domain/BackofficeMultimediaVideoIdMother'
import { BackofficeMultimediaVideoPathMother } from '../../domain/BackofficeMultimediaVideoPathMother'

/**
 * Utility class for creating `CreateBackofficeMultimediaVideoCommand` instances for testing.
 */
export class CreateBackofficeMultimediaVideoCommandMother {
  /**
   * Creates a valid `CreateBackofficeMultimediaVideoCommand`.
   *
   * @param id - The ID for the command.
   * @param path - The path for the command.
   * @returns A valid command.
   */
  public static create(
    id: BackofficeMultimediaVideoId,
    path: BackofficeMultimediaVideoPath
  ): CreateBackofficeMultimediaVideoCommand {
    return {
      id: id.value,
      path: path.value
    }
  }

  /**
   * Creates a random valid `CreateBackofficeMultimediaVideoCommand`.
   *
   * @returns A random valid command.
   */
  public static random(): CreateBackofficeMultimediaVideoCommand {
    return this.create(
      BackofficeMultimediaVideoIdMother.random(),
      BackofficeMultimediaVideoPathMother.random()
    )
  }
}
