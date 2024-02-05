import { Chapter } from '@Multimedia/Chapter/domain/Chapter'
import { type ChapterId } from '@Multimedia/Chapter/domain/ChapterId'
import { type ChapterReleaseYear } from '@Multimedia/Chapter/domain/ChapterReleaseYear'
import { type ChapterTitle } from '@Multimedia/Chapter/domain/ChapterTitle'
import { type SeasonId } from '@Multimedia/Shared/domain/Season/SeasonId'
import { ChapterIdMother } from './ChapterIdMother'
import { SeasonIdMother } from '../../Shared/domain/SeasonIdMother'
import { ChapterTitleMother } from './ChapterTitleMother'
import { ChapterReleaseYearMother } from './ChapterReleaseYearMother'
import { type VideoId } from '@Multimedia/Shared/domain/Video/VideoId'
import { VideoIdMother } from '../../Shared/domain/VideoIdMother'

/**
 * Factory class for Chapter entity.
 */
export class ChapterMother {
  /**
   * Creates a new instance of the Chapter entity.
   *
   * @param id - The id of the chapter.
   * @param title - The title of the chapter.
   * @param releaseYear - The release year of the chapter.
   * @param season - The season of the chapter.
   * @param video - The video of the chapter.
   * @returns A new instance of the Chapter entity.
   */
  public static create(
    id: ChapterId,
    title: ChapterTitle,
    releaseYear: ChapterReleaseYear,
    season: SeasonId,
    video: VideoId
  ): Chapter {
    return new Chapter(id, title, releaseYear, season, video)
  }

  /**
   * Creates a random instance of the Chapter entity.
   *
   * @returns A random instance of Chapter.
   */
  public static random(): Chapter {
    return this.create(
      ChapterIdMother.random(),
      ChapterTitleMother.random(),
      ChapterReleaseYearMother.random(),
      SeasonIdMother.random(),
      VideoIdMother.random()
    )
  }
}
