import { type CreateSerieCommand } from '@Multimedia/Serie/application/Create/CreateSerieCommand'
import { Serie } from '@Multimedia/Serie/domain/Serie'
import { SerieReleaseDate } from '@Multimedia/Serie/domain/SerieReleaseDate'
import { SerieTitle } from '@Multimedia/Serie/domain/SerieTitle'
import { SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'
import { SerieIdMother } from '../../Shared/domain/SerieIdMother'
import { SerieTitleMother } from './SerieTitleMother'
import { SerieReleaseDateMother } from './SerieReleaseDateMother'
import { CategoryName } from '@Multimedia/Shared/domain/Category/CategoryName'
import { CategoryNameMother } from '../../Categories/domain/CategoryNameMother'

export class SerieMother {
  public static create(
    id: SerieId,
    category: CategoryName,
    title: SerieTitle,
    releaseDate: SerieReleaseDate
  ): Serie {
    return new Serie(id, category, title, releaseDate)
  }

  public static from(command: CreateSerieCommand): Serie {
    return this.create(
      new SerieId(command.id),
      new CategoryName(command.category),
      new SerieTitle(command.title),
      new SerieReleaseDate(new Date(command.releaseDate))
    )
  }

  public static random(): Serie {
    return this.create(
      SerieIdMother.random(),
      CategoryNameMother.random(),
      SerieTitleMother.random(),
      SerieReleaseDateMother.random()
    )
  }
}
