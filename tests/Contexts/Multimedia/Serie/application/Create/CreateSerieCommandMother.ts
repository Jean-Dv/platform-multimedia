import { type CreateSerieCommand } from '@Multimedia/Serie/application/Create/CreateSerieCommand'
import { type SerieReleaseDate } from '@Multimedia/Serie/domain/SerieReleaseDate'
import { type SerieTitle } from '@Multimedia/Serie/domain/SerieTitle'
import { type SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'
import { SerieIdMother } from '../../domain/SerieIdMother'
import { SerieTitleMother } from '../../domain/SerieTitleMother'
import { SerieReleaseDateMother } from '../../domain/SerieReleaseDateMother'

export class CreateSerieCommandMother {
  public static create(
    id: SerieId,
    title: SerieTitle,
    releaseDate: SerieReleaseDate
  ): CreateSerieCommand {
    return {
      id: id.value,
      title: title.value,
      releaseDate: releaseDate.value
    }
  }

  public static random(): CreateSerieCommand {
    return this.create(
      SerieIdMother.random(),
      SerieTitleMother.random(),
      SerieReleaseDateMother.random()
    )
  }

  public static invalid(): CreateSerieCommand {
    return {
      id: SerieIdMother.random().value,
      title: SerieTitleMother.invalid(),
      releaseDate: SerieReleaseDateMother.random().value
    }
  }
}
