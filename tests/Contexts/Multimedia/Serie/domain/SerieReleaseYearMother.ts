import { SerieReleaseYear } from '@Multimedia/Serie/domain/SerieReleaseYear'
import { DateMother } from '../../../Shared/domain/DateMother'

/**
 * Factory class for creating instances of `SerieReleaseYear` for testing.
 */
export class SerieReleaseYearMother {
  /**
   * Creates a `SerieReleaseYear` with the specified value.
   *
   * @param value - The value to be used for creating the instance.
   * @returns An instance of `SerieReleaseYear`.
   */
  public static create(value: number): SerieReleaseYear {
    return new SerieReleaseYear(value)
  }

  /**
   * Creates a random `SerieReleaseYear`.
   *
   * @returns A random instance of `SerieReleaseYear`.
   */
  public static random(): SerieReleaseYear {
    return this.create(DateMother.random().past().getFullYear())
  }
}
