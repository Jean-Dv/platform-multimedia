import { ChapterReleaseYear } from '@Multimedia/Chapter/domain/ChapterReleaseYear'
import { DateMother } from '../../../Shared/domain/DateMother'

/**
 * Factory class for ChapterReleaseYear value object.
 */
export class ChapterReleaseYearMother {
  /**
   * Create a ChapterReleaseYear instance with the provided value.
   *
   * @param value - The value of the release year.
   * @returns An instance of ChapterReleaseYear.
   */
  public static create(value: number): ChapterReleaseYear {
    return new ChapterReleaseYear(value)
  }

  /**
   * Create a random ChapterReleaseYear instance.
   *
   * @returns A random instance of ChapterReleaseYear.
   */
  public static random(): ChapterReleaseYear {
    return this.create(DateMother.random().past().getFullYear())
  }
}
