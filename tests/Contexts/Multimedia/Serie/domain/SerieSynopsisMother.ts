import { SerieSynopsis } from '@Multimedia/Serie/domain/SerieSynopsis'
import { WordMother } from '../../../Shared/domain/WordMother'

/**
 * Factory class for creating instances of `SerieSynopsis` for testing.
 */
export class SerieSynopsisMother {
  /**
   * Creates a `SerieSynopsis` with the specified value.
   *
   * @param value - The value to be used for creating the instance.
   * @returns An instance of `SerieSynopsis`.
   */
  public static create(value: string): SerieSynopsis {
    return new SerieSynopsis(value)
  }

  /**
   * Creates a random `SerieSynopsis`.
   *
   * @returns A random instance of `SerieSynopsis`.
   */
  public static random(): SerieSynopsis {
    return this.create(WordMother.random({ max: 10 }))
  }
}
