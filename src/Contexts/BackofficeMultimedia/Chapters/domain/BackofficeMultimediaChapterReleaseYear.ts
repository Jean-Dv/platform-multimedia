import { NumberValueObject } from '@Shared/domain/value-objects/NumberValueObject'
import { BackofficeMultimediaChapterReleaseYearIsNegative } from './BackofficeMultimediaChapterReleaseYearIsNegative'

/**
 * Represents the release year of a backoffice multimedia chapter.
 * Inherits from the NumberValueObject class, ensuring it is a number value object
 */
export class BackofficeMultimediaChapterReleaseYear extends NumberValueObject {
  constructor(value: number) {
    super(value)
    this.ensureIsPositive(value)
  }

  /**
   * Ensures that the release year is positive.
   *
   * @param value - The release year to be validated.
   * @throws Thrown if the release year is negative.
   */
  private ensureIsPositive(value: number): void {
    if (value < 0) {
      throw new BackofficeMultimediaChapterReleaseYearIsNegative(
        `The release year <${value}> is not valid`
      )
    }
  }
}
