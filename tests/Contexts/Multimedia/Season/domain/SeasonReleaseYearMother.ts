import { SeasonReleaseYear } from '@Multimedia/Season/domain/SeasonReleaseYear'
import { DateMother } from '../../../Shared/domain/DateMother'

/**
 * Factory class for creating instances of `SeasonReleaseYear` for testing.
 */
export class SeasonReleaseYearMother {
  /**
   * Creates a `SeasonReleaseYear` with the specified value.
   *
   * @param value - The value to be used for creating the instance.
   * @returns An instance of `SeasonReleaseYear`.
   */
  public static create(value: number): SeasonReleaseYear {
    return new SeasonReleaseYear(value)
  }

  /**
   * Creates a random `SeasonReleaseYear`.
   *
   * @returns A random instance of `SeasonReleaseYear`.
   */
  public static random(): SeasonReleaseYear {
    return this.create(DateMother.random().past().getFullYear())
  }
}
