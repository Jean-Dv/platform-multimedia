import { Serie } from '@Multimedia/Serie/domain/Serie'
import { type SerieReleaseYear } from '@Multimedia/Serie/domain/SerieReleaseYear'
import { type SerieTitle } from '@Multimedia/Serie/domain/SerieTitle'
import { type SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'
import { SerieIdMother } from '../../Shared/domain/SerieIdMother'
import { SerieTitleMother } from './SerieTitleMother'
import { type SerieSynopsis } from '@Multimedia/Serie/domain/SerieSynopsis'
import { type CategoryId } from '@Multimedia/Categories/domain/CategoryId'
import { SerieReleaseYearMother } from './SerieReleaseYearMother'
import { SerieSynopsisMother } from './SerieSynopsisMother'
import { CategoryIdMother } from '../../Categories/domain/CategoryIdMother'

/**
 * Factory class for creating instances of `Serie` for testing.
 */
export class SerieMother {
  /**
   * Creates a `Serie` with the specified values.
   *
   * @param id - The ID to be used for creating the instance.
   * @param title - The title to be used for creating the instance.
   * @param releaseYear - The release year to be used for creating the instance.
   * @param synopsis - The synopsis to be used for creating the instance.
   * @param categories - The categories to be used for creating the instance.
   * @returns An instance of `Serie`.
   */
  public static create(
    id: SerieId,
    title: SerieTitle,
    releaseYear: SerieReleaseYear,
    synopsis: SerieSynopsis,
    categories: CategoryId[]
  ): Serie {
    return new Serie(id, title, releaseYear, synopsis, categories)
  }

  /**
   * Creates a random `Serie`.
   *
   * @returns A random instance of `Serie`.
   */
  public static random(): Serie {
    return this.create(
      SerieIdMother.random(),
      SerieTitleMother.random(),
      SerieReleaseYearMother.random(),
      SerieSynopsisMother.random(),
      Array.from({ length: 3 }, () => CategoryIdMother.random())
    )
  }
}
