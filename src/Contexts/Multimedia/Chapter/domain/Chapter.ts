import { ChapterId } from './ChapterId'
import { ChapterTitle } from './ChapterTitle'
import { ChapterReleaseYear } from './ChapterReleaseYear'
import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { SeasonId } from '../../Shared/domain/Season/SeasonId'
import { VideoId } from '@Multimedia/Shared/domain/Video/VideoId'

/**
 * Represents a chapter aggregate root entity.
 */
export class Chapter extends AggregateRoot {
  public readonly id: ChapterId
  public readonly title: ChapterTitle
  public readonly releaseYear: ChapterReleaseYear
  public readonly season: SeasonId
  public readonly video: VideoId

  constructor(
    id: ChapterId,
    title: ChapterTitle,
    releaseYear: ChapterReleaseYear,
    season: SeasonId,
    video: VideoId
  ) {
    super()
    this.id = id
    this.title = title
    this.releaseYear = releaseYear
    this.season = season
    this.video = video
  }

  /**
   * Create a new Chapter from primitives.
   *
   * @param plainDate - The plain object containing the chapter information.
   * @returns A new Chapter instance.
   */
  public static fromPrimitives(plainData: {
    id: string
    title: string
    releaseYear: number
    season: string
    video: string
  }): Chapter {
    return new Chapter(
      new ChapterId(plainData.id),
      new ChapterTitle(plainData.title),
      new ChapterReleaseYear(plainData.releaseYear),
      new SeasonId(plainData.season),
      new VideoId(plainData.video)
    )
  }

  /**
   * Convert the chapter to primitive values.
   *
   * @returns The plain object with the chapter information.
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
