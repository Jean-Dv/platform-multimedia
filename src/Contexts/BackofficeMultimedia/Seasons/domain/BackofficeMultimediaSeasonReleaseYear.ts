import { NumberValueObject } from '@Shared/domain/value-objects/NumberValueObject'
import { BackofficeMultimediaSeasonReleaseYearIsNegative } from './BackofficeMultimediaSeasonReleaseYearIsNegative'

/**
 * Represents the release year of a Backoffice season.
 * Inherits from the NumberValueObject class, providing a standardized value object for number properties.
 */
export class BackofficeMultimediaSeasonReleaseYear extends NumberValueObject {
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
      throw new BackofficeMultimediaSeasonReleaseYearIsNegative(
        `The release year <${value}> is negative`
      )
    }
  }
}
