import { MovieSynopsis } from '@Multimedia/Movies/domain/MovieSynopsis'
import { WordMother } from '../../../Shared/domain/WordMother'

/**
 * Factoring class for MovieSynopsis.
 * It creates instances of MovieSynopsis.
 */
export class MovieSynopsisMother {
  /**
   * Creates a MovieSynopsis instance from a string.
   *
   * @param value - The value of the movie synopsis.
   * @returns An instance of MovieSynopsis.
   */
  public static create(value: string): MovieSynopsis {
    return new MovieSynopsis(value)
  }

  /**
   * Create a random MovieSynopsis instance.
   *
   * @returns A random MovieSynopsis instance.
   */
  public static random(): MovieSynopsis {
    return this.create(WordMother.random({ max: 10 }))
  }
}
