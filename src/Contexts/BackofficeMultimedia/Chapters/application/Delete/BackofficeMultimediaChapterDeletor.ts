import { type BackofficeMultimediaChapterId } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterId'
import { type BackofficeMultimediaChapterRepository } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterRepository'
import { type EventBus } from '@Shared/domain/EventBus'

/**
 * Service for deleting backoffice multimedia chapters.
 */
export class BackofficeMultimediaChapterDeletor {
  constructor(
    private readonly repository: BackofficeMultimediaChapterRepository,
    private readonly eventBus: EventBus
  ) {}

  /**
   * Runs the chapter deletion process.
   *
   * @param id - The id of the chapter to be deleted.
   */
  public async run(id: BackofficeMultimediaChapterId): Promise<void> {
    const chapter = await this.repository.search(id)
    if (chapter === null) {
      throw new Error(`The chapter with id <${id.value}> does not exist`)
    }

    chapter.delete()
    await this.repository.delete(chapter)
    await this.eventBus.publish(chapter.pullDomainEvents())
  }
}
