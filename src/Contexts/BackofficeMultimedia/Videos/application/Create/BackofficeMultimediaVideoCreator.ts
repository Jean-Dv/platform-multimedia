import { type BackofficeMultimediaVideoId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaVideoId'
import { BackofficeMultimediaVideo } from '@BackofficeMultimedia/Videos/domain/BackofficeMultimediaVideo'
import { type BackofficeMultimediaVideoPath } from '@BackofficeMultimedia/Videos/domain/BackofficeMultimediaVideoPath'
import { type BackofficeMultimediaVideoRepository } from '@BackofficeMultimedia/Videos/domain/BackofficeMultimediaVideoRepository'
import { type EventBus } from '@Shared/domain/EventBus'

/**
 * Service for creating backoffice multimedia videos.
 */
export class BackofficeMultimediaVideoCreator {
  constructor(
    private readonly repository: BackofficeMultimediaVideoRepository,
    private readonly eventBus: EventBus
  ) {}

  /**
   * Runs the video creation process.
   *
   * @param params - Parameters for creating the video.
   * @returns A Promise that resolves when the video is successfully created and saved.
   */
  public async run(params: {
    id: BackofficeMultimediaVideoId
    path: BackofficeMultimediaVideoPath
  }): Promise<void> {
    const video = BackofficeMultimediaVideo.create(params.id, params.path)

    await this.repository.save(video)
    await this.eventBus.publish(video.pullDomainEvents())
  }
}
