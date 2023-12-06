import { type EventBus } from '@Shared/domain/EventBus'
import { type ChapterRepository } from '../../domain/ChapterRepository'
import { type ChapterId } from '../../domain/ChapterId'
import { type ChapterTitle } from '../../domain/ChapterTitle'
import { type SeasonId } from '@Multimedia/Shared/domain/Season/SeasonId'
import { type ChapterReleaseDate } from '../../domain/ChapterReleaseDate'
import { type ChapterDuration } from '../../domain/ChapterDuration'
import { Chapter } from '../../domain/Chapter'
import { type ChapterUrl } from '@Multimedia/Chapter/domain/ChapterUrl'

export class ChapterCreator {
  constructor(
    private readonly repository: ChapterRepository,
    private readonly eventBus: EventBus
  ) {}

  /**
   * Creates a new chapter with the provided information, saves it to the repository,
   * and publishes any domain events associated with chapter creation.
   *
   * @param params - The parameters needed to create the chapter.
   * @returns A new Chapter instance.
   */
  public async run(params: {
    id: ChapterId
    seasonId: SeasonId
    title: ChapterTitle
    releaseDate: ChapterReleaseDate
    url: ChapterUrl
    duration: ChapterDuration
  }): Promise<void> {
    const chapter = Chapter.create(
      params.id,
      params.seasonId,
      params.title,
      params.releaseDate,
      params.url,
      params.duration
    )
    await this.repository.save(chapter)
    await this.eventBus.publish(chapter.pullDomainEvents())
  }
}
