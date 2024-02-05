import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { BackofficeMultimediaChapterId } from './BackofficeMultimediaChapterId'
import { BackofficeMultimediaChapterTitle } from './BackofficeMultimediaChapterTitle'
import { BackofficeMultimediaChapterReleaseYear } from './BackofficeMultimediaChapterReleaseYear'
import { BackofficeMultimediaSeasonId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSeasonId'
import { BackofficeMultimediaVideoId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaVideoId'
import { BackofficeMultimediaChapterCreatedDomainEvent } from './BackofficeMultimediaChapterCreatedDomainEvent'

/**
 * BackofficeMultimediaChapter is an aggregate root representing a chapter in the backoffice.
 */
export class BackofficeMultimediaChapter extends AggregateRoot {
  public readonly id: BackofficeMultimediaChapterId
  public readonly title: BackofficeMultimediaChapterTitle
  public readonly releaseYear: BackofficeMultimediaChapterReleaseYear
  public readonly season: BackofficeMultimediaSeasonId
  public readonly video: BackofficeMultimediaVideoId

  constructor(
    id: BackofficeMultimediaChapterId,
    title: BackofficeMultimediaChapterTitle,
    releaseYear: BackofficeMultimediaChapterReleaseYear,
    season: BackofficeMultimediaSeasonId,
    video: BackofficeMultimediaVideoId
  ) {
    super()
    this.id = id
    this.title = title
    this.releaseYear = releaseYear
    this.season = season
    this.video = video
  }

  /**
   * This method returns a new instance of the BackofficeMultimediaChapter aggregate
   * and publish domain event using the provided parameters.
   *
   * @param id - The id of the chapter.
   * @param title - The title of the chapter.
   * @param releaseYear - The release year of the chapter.
   * @param season - The season of the chapter.
   * @param video - The video of the chapter.
   * @returns A new instance of the BackofficeMultimediaChapter entity and register event.
   */
  public static create(
    id: BackofficeMultimediaChapterId,
    title: BackofficeMultimediaChapterTitle,
    releaseYear: BackofficeMultimediaChapterReleaseYear,
    season: BackofficeMultimediaSeasonId,
    video: BackofficeMultimediaVideoId
  ): BackofficeMultimediaChapter {
    const chapter = new BackofficeMultimediaChapter(
      id,
      title,
      releaseYear,
      season,
      video
    )
    chapter.record(
      new BackofficeMultimediaChapterCreatedDomainEvent({
        aggregateId: chapter.id.value,
        title: chapter.title.value,
        releaseYear: chapter.releaseYear.value,
        season: chapter.season.value,
        video: chapter.video.value
      })
    )
    return chapter
  }

  /**
   * Create a new Backoffice chapter from primitives.
   * @param plainData - The plain data to be converted to a chapter.
   * @returns A new instance of the BackofficeMultimediaChapter entity.
   */
  public static fromPrimitives(plainData: {
    id: string
    title: string
    releaseYear: number
    season: string
    video: string
  }): BackofficeMultimediaChapter {
    return new BackofficeMultimediaChapter(
      new BackofficeMultimediaChapterId(plainData.id),
      new BackofficeMultimediaChapterTitle(plainData.title),
      new BackofficeMultimediaChapterReleaseYear(plainData.releaseYear),
      new BackofficeMultimediaSeasonId(plainData.season),
      new BackofficeMultimediaVideoId(plainData.video)
    )
  }

  /**
   * Convert a Backoffice chapter to primitives.
   *
   * @returns A plain data object representing a BackofficeMultimediaChapter.
   */
  public toPrimitives(): {
    id: string
    title: string
    releaseYear: number
    season: string
    video: string
  } {
    return {
      id: this.id.value,
      title: this.title.value,
      releaseYear: this.releaseYear.value,
      season: this.season.value,
      video: this.video.value
    }
  }
}
