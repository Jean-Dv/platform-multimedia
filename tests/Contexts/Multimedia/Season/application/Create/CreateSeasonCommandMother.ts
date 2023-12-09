import { type CreateSeasonCommand } from '@Multimedia/Season/application/Create/CreateSeasonCommand'
import { type SeasonReleaseDate } from '@Multimedia/Season/domain/SeasonReleaseDate'
import { type SeasonTitle } from '@Multimedia/Season/domain/SeasonTitle'
import { type SeasonId } from '@Multimedia/Shared/domain/Season/SeasonId'
import { type SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'
import { SeasonIdMother } from '../../../Shared/domain/SeasonIdMother'
import { SeasonReleaseDateMother } from '../../domain/SeasonReleaseDateMother'
import { SeasonTitleMother } from '../../domain/SeasonTitleMother'
import { SerieIdMother } from '../../../Shared/domain/SerieIdMother'

export class CreateSeasonCommandMother {
  public static create(
    id: SeasonId,
    serieId: SerieId,
    title: SeasonTitle,
    releaseDate: SeasonReleaseDate
  ): CreateSeasonCommand {
    return {
      id: id.value,
      serieId: serieId.value,
      title: title.value,
      releaseDate: releaseDate.value
    }
  }

  public static random(): CreateSeasonCommand {
    return this.create(
      SeasonIdMother.random(),
      SerieIdMother.random(),
      SeasonTitleMother.random(),
      SeasonReleaseDateMother.random()
    )
  }

  public static randomWithSerie(serieId: SerieId): CreateSeasonCommand {
    return this.create(
      SeasonIdMother.random(),
      serieId,
      SeasonTitleMother.random(),
      SeasonReleaseDateMother.random()
    )
  }

  public static invalid(): CreateSeasonCommand {
    return {
      id: SeasonIdMother.random().value,
      serieId: SerieIdMother.random().value,
      title: SeasonTitleMother.invalid(),
      releaseDate: SeasonReleaseDateMother.random().value
    }
  }
}
