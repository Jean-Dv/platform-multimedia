import { NumberValueObject } from '@Shared/domain/value-objects/NumberValueObject'
import { MovieDurationIsNotPositive } from './MovieDurationIsNotPositive'

/**
 * Represents the duration of a movie.
 */
export class MovieDuration extends NumberValueObject {
  constructor(value: number) {
    super(value)
    this.ensureIsPositive(value)
  }

  /**
   * Ensures that the provided value is a positive number.
   *
   * @param value - The numeric value to be validated.
   * @throws MovieDurationIsNotPositive if the provided duration is not a positive number.
   */
  private ensureIsPositive(value: number): void {
    if (value <= 0) {
      throw new MovieDurationIsNotPositive(
        `The movie duration <${value}> is not positive.`
      )
    }
  }
}
