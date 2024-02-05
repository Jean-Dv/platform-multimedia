import { Season } from '@Multimedia/Season/domain/Season'
import { type SeasonReleaseYear } from '@Multimedia/Season/domain/SeasonReleaseYear'
import { type SeasonTitle } from '@Multimedia/Season/domain/SeasonTitle'
import { type SeasonId } from '@Multimedia/Shared/domain/Season/SeasonId'
import { type SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'
import { SeasonIdMother } from '../../Shared/domain/SeasonIdMother'
import { SerieIdMother } from '../../Shared/domain/SerieIdMother'
import { SeasonReleaseYearMother } from './SeasonReleaseYearMother'
import { SeasonTitleMother } from './SeasonTitleMother'

/**
 * Factory class for creating instances of `Season` for testing.
 */
export class SeasonMother {
  /**
   * Creates a `Season` with the specified values.
   *
   * @param id - The ID to be used for creating the instance.
   * @param serieId - The serie ID to be used for creating the instance.
   * @param title - The title to be used for creating the instance.
   * @param releaseYear - The release year to be used for creating the instance.
   * @returns An instance of `Season`.
   */
  public static create(
    id: SeasonId,
    serieId: SerieId,
    title: SeasonTitle,
    releaseYear: SeasonReleaseYear
  ): Season {
    return new Season(id, serieId, title, releaseYear)
  }

  /**
   * Creates a random `Season`.
   * @returns An random instance of `Season`.
   */
  public static random(): Season {
    return this.create(
      SeasonIdMother.random(),
      SerieIdMother.random(),
      SeasonTitleMother.random(),
      SeasonReleaseYearMother.random()
    )
  }
}
