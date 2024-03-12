import { BackofficeMultimediaCategoryName } from '@BackofficeMultimedia/Categories/domain/BackofficeMultimediaCategoryName'
import { WordMother } from '../../../Shared/domain/WordMother'

/**
 * Factory class for creating instances of `BackofficeMultimediaCategoryName` for testing.
 */
export class BackofficeMultimediaCategoryNameMother {
  /**
   * Creates a `BackofficeMultimediaCategoryName` with the specified value.
   *
   * @param value - The value to be used for creating the instance.
   * @returns An instance of `BackofficeMultimediaCategoryName`.
   */
  public static create(value: string): BackofficeMultimediaCategoryName {
    return new BackofficeMultimediaCategoryName(value)
  }

  /**
   * Creates a random `BackofficeMultimediaCategoryName`.
   *
   * @returns A random instance of `BackofficeMultimediaCategoryName`.
   */
  public static random(): BackofficeMultimediaCategoryName {
    return this.create(WordMother.random({ max: 2 }))
  }

  /**
   * Generates an invalid value for `BackofficeMultimediaCategoryName`.
   *
   * @returns An invalid value for `BackofficeMultimediaCategoryName`.
   */
  public static invalid(): string {
    return WordMother.random({ max: 15 })
  }
}
