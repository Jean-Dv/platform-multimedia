import { type CreateSerieCommand } from '@Multimedia/Serie/application/Create/CreateSerieCommand'
import { type SerieReleaseDate } from '@Multimedia/Serie/domain/SerieReleaseDate'
import { type SerieTitle } from '@Multimedia/Serie/domain/SerieTitle'
import { type SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'
import { SerieIdMother } from '../../../Shared/domain/SerieIdMother'
import { SerieTitleMother } from '../../domain/SerieTitleMother'
import { SerieReleaseDateMother } from '../../domain/SerieReleaseDateMother'
import { type CategoryName } from '@Multimedia/Shared/domain/Category/CategoryName'
import { CategoryNameMother } from '../../../Categories/domain/CategoryNameMother'

export class CreateSerieCommandMother {
  public static create(
    id: SerieId,
    category: CategoryName,
    title: SerieTitle,
    releaseDate: SerieReleaseDate
  ): CreateSerieCommand {
    return {
      id: id.value,
      category: category.value,
      title: title.value,
      releaseDate: releaseDate.value
    }
  }

  public static random(): CreateSerieCommand {
    return this.create(
      SerieIdMother.random(),
      CategoryNameMother.random(),
      SerieTitleMother.random(),
      SerieReleaseDateMother.random()
    )
  }

  public static randomWithCategory(category: CategoryName): CreateSerieCommand {
    return this.create(
      SerieIdMother.random(),
      category,
      SerieTitleMother.random(),
      SerieReleaseDateMother.random()
    )
  }

  public static invalid(): CreateSerieCommand {
    return {
      id: SerieIdMother.random().value,
      category: CategoryNameMother.random().value,
      title: SerieTitleMother.invalid(),
      releaseDate: SerieReleaseDateMother.random().value
    }
  }

  public static invalidWithCategory(
    category: CategoryName
  ): CreateSerieCommand {
    return {
      id: SerieIdMother.random().value,
      category: category.value,
      title: SerieTitleMother.invalid(),
      releaseDate: SerieReleaseDateMother.random().value
    }
  }
}
