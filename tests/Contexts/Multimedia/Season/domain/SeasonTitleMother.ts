import { SeasonTitle } from '@Multimedia/Season/domain/SeasonTitle'
import { WordMother } from '../../../Shared/domain/WordMother'

/**
 * Factory class for creating instances of `SeasonTitle` for testing.
 */
export class SeasonTitleMother {
  /**
   * Creates a `SeasonTitle` with the specified value.
   *
   * @param value - The value to be used for creating the instance.
   * @returns An instance of `SeasonTitle`.
   */
  public static create(value: string): SeasonTitle {
    return new SeasonTitle(value)
  }

  /**
   * Creates a random `SeasonTitle`.
   *
   * @returns A random instance of `SeasonTitle`.
   */
  public static random(): SeasonTitle {
    return this.create(WordMother.random({ max: 5 }))
  }

  /**
   * Creates a random invalid `SeasonTitle`.
   *
   * @returns A random invalid instance of `SeasonTitle`.
   */
  public static invalid(): string {
    return WordMother.random({ max: 50 })
  }
}
