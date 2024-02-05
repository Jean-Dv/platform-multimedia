import { NumberValueObject } from '@Shared/domain/value-objects/NumberValueObject'
import { BackofficeMultimediaMovieReleaseYearIsNegative } from './BackofficeMultimediaMovieReleaseYearIsNegative'

/**
 * Represents the release year of a Backoffice movie.
 * Inherits from the NumberValueObject class, providing a standardized value object for number properties.
 */
export class BackofficeMultimediaMovieReleaseYear extends NumberValueObject {
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
      throw new BackofficeMultimediaMovieReleaseYearIsNegative(
        `The release year <${value}> is negative`
      )
    }
  }
}
