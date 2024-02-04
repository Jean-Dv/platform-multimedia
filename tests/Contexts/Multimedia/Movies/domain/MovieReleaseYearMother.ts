import { MovieReleaseYear } from '@Multimedia/Movies/domain/MovieReleaseYear'
import { DateMother } from '../../../Shared/domain/DateMother'

/**
 * Factoring class for MovieReleaseYear.
 */
export class MovieReleaseYearMother {
  /**
   * Creates a MovieReleaseYear instance from a number.
   *
   * @param value - The value of the movie release year.
   * @returns An instance of MovieReleaseYear.
   */
  public static create(value: number): MovieReleaseYear {
    return new MovieReleaseYear(value)
  }

  /**
   * Create a random MovieReleaseYear instance.
   *
   * @returns A random MovieReleaseYear instance.
   */
  public static random(): MovieReleaseYear {
    return this.create(DateMother.random().past().getFullYear())
  }
}
