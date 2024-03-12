import { BackofficeMultimediaVideoId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaVideoId'
import { type CreateBackofficeMultimediaVideoCommand } from '@BackofficeMultimedia/Videos/application/Create/CreateBackofficeMultimediaVideoCommand'
import { BackofficeMultimediaVideo } from '@BackofficeMultimedia/Videos/domain/BackofficeMultimediaVideo'
import { BackofficeMultimediaVideoPath } from '@BackofficeMultimedia/Videos/domain/BackofficeMultimediaVideoPath'

/**
 * Factory class for creating instances of `BackofficeMultimediaVideo` for testing.
 */
export class BackofficeMultimediaVideoMother {
  /**
   * Creates a `BackofficeMultimediaVideo` with the specified ID and path.
   *
   * @param id - The `BackofficeMultimediaVideoId` for the video.
   * @param path - The `BackofficeMultimediaVideoPath` for the video.
   * @returns An instance of `BackofficeMultimediaVideo`.
   */
  public static create(
    id: BackofficeMultimediaVideoId,
    path: BackofficeMultimediaVideoPath
  ): BackofficeMultimediaVideo {
    return new BackofficeMultimediaVideo(id, path)
  }

  /**
   * Creates a `BackofficeMultimediaVideo` from the specified command.
   *
   * @param command - The `CreateBackofficeMultimediaVideoCommand` to create the video from.
   * @returns An instance of `BackofficeMultimediaVideo`.
   */
  public static from(
    command: CreateBackofficeMultimediaVideoCommand
  ): BackofficeMultimediaVideo {
    return this.create(
      new BackofficeMultimediaVideoId(command.id),
      new BackofficeMultimediaVideoPath(command.path)
    )
  }
}
