import { BackofficeMultimediaChapter } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapter'
import { type BackofficeMultimediaChapterId } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterId'
import { type BackofficeMultimediaChapterReleaseYear } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterReleaseYear'
import { type BackofficeMultimediaChapterRepository } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterRepository'
import { type BackofficeMultimediaChapterTitle } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterTitle'
import { type BackofficeMultimediaSeasonId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSeasonId'
import { type BackofficeMultimediaVideoId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaVideoId'
import { type EventBus } from '@Shared/domain/EventBus'

/**
 * Service for creating backoffice multimedia chapters.
 */
export class BackofficeMultimediaChapterCreator {
  constructor(
    private readonly repository: BackofficeMultimediaChapterRepository,
    private readonly eventBus: EventBus
  ) {}

  /**
   * Runs the chapter creation process.
   *
   * @param params - Parameters for creating the chapter.
   * @returns A Promise that resolves when the chapter is successfully created and saved.
   */
  public async run(params: {
    id: BackofficeMultimediaChapterId
    title: BackofficeMultimediaChapterTitle
    releaseYear: BackofficeMultimediaChapterReleaseYear
    season: BackofficeMultimediaSeasonId
    video: BackofficeMultimediaVideoId
  }): Promise<void> {
    const chapter = BackofficeMultimediaChapter.create(
      params.id,
      params.title,
      params.releaseYear,
      params.season,
      params.video
    )

    await this.repository.save(chapter)
    await this.eventBus.publish(chapter.pullDomainEvents())
  }
}
