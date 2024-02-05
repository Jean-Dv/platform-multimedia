import { BackofficeMultimediaSerieReleaseYearIsNegative } from './BackofficeMultimediaSerieReleaseYearIsNegative'
import { NumberValueObject } from '@Shared/domain/value-objects/NumberValueObject'

/**
 * Represents the release year of a Backoffice multimedia serie.
 * Inherits from the NumberValueObject class, providing a standardized
 * value object for number properties.
 */
export class BackofficeMultimediaSerieReleaseYear extends NumberValueObject {
  constructor(value: number) {
    super(value)
    this.ensureReleaseYearIsPositive(value)
  }

  /**
   * Ensures that the release year is positive.
   *
   * @param value - The release year to be validated.
   * @throws Thrown if the release year is negative.
   */
  private ensureReleaseYearIsPositive(value: number): void {
    if (value < 0) {
      throw new BackofficeMultimediaSerieReleaseYearIsNegative(
        `The release year <${value}> is negative`
      )
    }
  }
}
