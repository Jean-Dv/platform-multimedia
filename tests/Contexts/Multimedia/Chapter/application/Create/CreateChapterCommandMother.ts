import { type CreateChapterCommand } from '@Multimedia/Chapter/application/Create/CreateChapterCommand'
import { type ChapterDuration } from '@Multimedia/Chapter/domain/ChapterDuration'
import { type ChapterId } from '@Multimedia/Chapter/domain/ChapterId'
import { type ChapterReleaseDate } from '@Multimedia/Chapter/domain/ChapterReleaseDate'
import { type ChapterTitle } from '@Multimedia/Chapter/domain/ChapterTitle'
import { type SeasonId } from '@Multimedia/Shared/domain/Season/SeasonId'
import { ChapterDurationMother } from '../../domain/ChapterDurationMother'
import { ChapterIdMother } from '../../domain/ChapterIdMother'
import { ChapterReleaseDateMother } from '../../domain/ChapterReleaseDateMother'
import { ChapterTitleMother } from '../../domain/ChapterTitleMother'
import { type ChapterUrl } from '@Multimedia/Chapter/domain/ChapterUrl'
import { ChapterUrlMother } from '../../domain/ChapterUrlMother'
import { SeasonIdMother } from '../../../Shared/domain/SeasonIdMother'

export class CreateChapterCommandMother {
  public static create(
    id: ChapterId,
    seasonId: SeasonId,
    title: ChapterTitle,
    releaseDate: ChapterReleaseDate,
    url: ChapterUrl,
    duration: ChapterDuration
  ): CreateChapterCommand {
    return {
      id: id.value,
      seasonId: seasonId.value,
      title: title.value,
      releaseDate: releaseDate.value,
      url: url.value,
      duration: duration.value
    }
  }

  public static random(): CreateChapterCommand {
    return this.create(
      ChapterIdMother.random(),
      SeasonIdMother.random(),
      ChapterTitleMother.random(),
      ChapterReleaseDateMother.random(),
      ChapterUrlMother.random(),
      ChapterDurationMother.random()
    )
  }

  public static randomWithSeason(season: SeasonId): CreateChapterCommand {
    return this.create(
      ChapterIdMother.random(),
      season,
      ChapterTitleMother.random(),
      ChapterReleaseDateMother.random(),
      ChapterUrlMother.random(),
      ChapterDurationMother.random()
    )
  }

  public static invalid(seasonId: SeasonId): CreateChapterCommand {
    return {
      id: ChapterIdMother.random().value,
      seasonId: seasonId.value,
      title: ChapterTitleMother.invalid(),
      releaseDate: ChapterReleaseDateMother.random().value,
      url: ChapterUrlMother.random().value,
      duration: ChapterDurationMother.random().value
    }
  }
}
