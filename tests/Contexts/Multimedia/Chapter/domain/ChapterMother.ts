import { type CreateChapterCommand } from '@Multimedia/Chapter/application/Create/CreateChapterCommand'
import { Chapter } from '@Multimedia/Chapter/domain/Chapter'
import { ChapterDuration } from '@Multimedia/Chapter/domain/ChapterDuration'
import { ChapterId } from '@Multimedia/Chapter/domain/ChapterId'
import { ChapterReleaseDate } from '@Multimedia/Chapter/domain/ChapterReleaseDate'
import { ChapterTitle } from '@Multimedia/Chapter/domain/ChapterTitle'
import { SeasonId } from '@Multimedia/Shared/domain/Season/SeasonId'
import { ChapterIdMother } from './ChapterIdMother'
import { SeasonIdMother } from '../../Shared/domain/SeasonIdMother'
import { ChapterTitleMother } from './ChapterTitleMother'
import { ChapterReleaseDateMother } from './ChapterReleaseDateMother'
import { ChapterDurationMother } from './ChapterDurationMother'
import { ChapterUrl } from '@Multimedia/Chapter/domain/ChapterUrl'
import { ChapterUrlMother } from './ChapterUrlMother'

export class ChapterMother {
  public static create(
    id: ChapterId,
    seasonId: SeasonId,
    title: ChapterTitle,
    releaseDate: ChapterReleaseDate,
    url: ChapterUrl,
    duration: ChapterDuration
  ): Chapter {
    return new Chapter(id, seasonId, title, releaseDate, url, duration)
  }

  public static from(command: CreateChapterCommand): Chapter {
    return this.create(
      new ChapterId(command.id),
      new SeasonId(command.seasonId),
      new ChapterTitle(command.title),
      new ChapterReleaseDate(new Date(command.releaseDate)),
      new ChapterUrl(command.url),
      new ChapterDuration(command.duration)
    )
  }

  public static random(): Chapter {
    return this.create(
      ChapterIdMother.random(),
      SeasonIdMother.random(),
      ChapterTitleMother.random(),
      ChapterReleaseDateMother.random(),
      ChapterUrlMother.random(),
      ChapterDurationMother.random()
    )
  }
}
