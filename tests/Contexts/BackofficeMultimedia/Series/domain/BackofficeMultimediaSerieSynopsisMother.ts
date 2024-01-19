import { WordMother } from './../../../Shared/domain/WordMother'
import { BackofficeMultimediaSerieSynopsis } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieSynopsis'

/**
 * Factory class for creating instances of `BackofficeMultimediaSerieSynopsis` for testing.
 */
export class BackofficeMultimediaSerieSynopsisMother {
  /**
   * Creates a `BackofficeMultimediaSerieSynopsis` with the specified value.
   *
   * @param value - The value to be used for creating the instance.
   * @returns An instance of `BackofficeMultimediaSerieSynopsis`.
   */
  public static create(value: string): BackofficeMultimediaSerieSynopsis {
    return new BackofficeMultimediaSerieSynopsis(value)
  }

  /**
   * Creates a random `BackofficeMultimediaSerieSynopsis`.
   *
   * @returns A random instance of `BackofficeMultimediaSerieSynopsis`.
   */
  public static random(): BackofficeMultimediaSerieSynopsis {
    return this.create(WordMother.random({ max: 20 }))
  }
}
