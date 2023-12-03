import { type CreateSeasonCommand } from '@Multimedia/Season/application/Create/CreateSeasonCommand'
import { Season } from '@Multimedia/Season/domain/Season'
import { SeasonReleaseDate } from '@Multimedia/Season/domain/SeasonReleaseDate'
import { SeasonTitle } from '@Multimedia/Season/domain/SeasonTitle'
import { SeasonId } from '@Multimedia/Shared/domain/Season/SeasonId'
import { SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'
import { SeasonIdMother } from '../../Shared/domain/SeasonIdMother'
import { SerieIdMother } from '../../Shared/domain/SerieIdMother'
import { SeasonReleaseDateMother } from './SeasonReleaseDateMother'
import { SeasonTitleMother } from './SeasonTitleMother'

export class SeasonMother {
  public static create(
    id: SeasonId,
    serieId: SerieId,
    title: SeasonTitle,
    releaseDate: SeasonReleaseDate
  ): Season {
    return new Season(id, serieId, title, releaseDate)
  }

  public static from(command: CreateSeasonCommand): Season {
    return this.create(
      new SeasonId(command.id),
      new SerieId(command.serieId),
      new SeasonTitle(command.title),
      new SeasonReleaseDate(new Date(command.releaseDate))
    )
  }

  public static random(): Season {
    return this.create(
      SeasonIdMother.random(),
      SerieIdMother.random(),
      SeasonTitleMother.random(),
      SeasonReleaseDateMother.random()
    )
  }
}
