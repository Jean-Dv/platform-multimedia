import { ChapterId } from './ChapterId'
import { ChapterTitle } from './ChapterTitle'
import { ChapterReleaseDate } from './ChapterReleaseDate'
import { ChapterDuration } from './ChapterDuration'
import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { SeasonId } from '../../Shared/domain/Season/SeasonId'
import { ChapterCreatedDomainEvent } from './ChapterCreatedDomainEvent'
import { ChapterUrl } from './ChapterUrl'

/**
 * Represents a chapter aggregate root entity.
 */
export class Chapter extends AggregateRoot {
  public readonly id: ChapterId
  public readonly seasonId: SeasonId
  public readonly title: ChapterTitle
  public readonly releaseDate: ChapterReleaseDate
  public readonly url: ChapterUrl
  public readonly duration: ChapterDuration

  constructor(
    id: ChapterId,
    seasonId: SeasonId,
    title: ChapterTitle,
    releaseDate: ChapterReleaseDate,
    url: ChapterUrl,
    duration: ChapterDuration
  ) {
    super()
    this.id = id
    this.seasonId = seasonId
    this.title = title
    this.releaseDate = releaseDate
    this.url = url
    this.duration = duration
  }

  /**
   * Creates a new Chapter instance with the provided information
   * and publishes a ChapterCreatedDomainEvent.
   *
   * @param id - The id of the chapter.
   * @param seasonId - The id of the season.
   * @param title - The name of the chapter.
   * @param releaseDate - The release date of the chapter.
   * @param url - The url of the chapter.
   * @param duration - The duration of the chapter.
   * @returns A new Chapter instance.
   */
  public static create(
    id: ChapterId,
    seasonId: SeasonId,
    title: ChapterTitle,
    releaseDate: ChapterReleaseDate,
    url: ChapterUrl,
    duration: ChapterDuration
  ): Chapter {
    const chapter = new Chapter(id, seasonId, title, releaseDate, url, duration)
    chapter.record(
      new ChapterCreatedDomainEvent({
        aggregateId: id.value,
        seasonId: seasonId.value,
        title: title.value,
        releaseDate: releaseDate.value,
        url: url.value,
        duration: duration.value
      })
    )
    return chapter
  }

  /**
   * Create a new Chapter from primitives.
   *
   * @param plainDate - The plain object containing the chapter information.
   * @returns A new Chapter instance.
   */
  public static fromPrimitives(plainData: {
    id: string
    seasonId: string
    title: string
    releaseDate: Date
    url: string
    duration: number
  }): Chapter {
    return new Chapter(
      new ChapterId(plainData.id),
      new SeasonId(plainData.seasonId),
      new ChapterTitle(plainData.title),
      new ChapterReleaseDate(plainData.releaseDate),
      new ChapterUrl(plainData.url),
      new ChapterDuration(plainData.duration)
    )
  }

  /**
   * Convert the chapter to primitive values.
   *
   * @returns The plain object with the chapter information.
   */
  public toPrimitives(): {
    id: string
    seasonId: string
    title: string
    releaseDate: Date
    url: string
    duration: number
  } {
    return {
      id: this.id.value,
      seasonId: this.seasonId.value,
      title: this.title.value,
      releaseDate: this.releaseDate.value,
      url: this.url.value,
      duration: this.duration.value
    }
  }
}
