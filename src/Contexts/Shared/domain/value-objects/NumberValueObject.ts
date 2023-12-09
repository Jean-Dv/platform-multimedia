import { ValueObject } from './ValueObject'

/**
 * Abstract base class representing a numeric value object.
 * Extends the base class `ValueObject<number>`.
 */
export abstract class NumberValueObject extends ValueObject<number> {
  /**
   * Checks if the current numeric value is bigger than another NumberValueObject.
   *
   * @param other - The other NumberValueObject to compare against.
   * @returns A boolean indicating whether the current value is bigger than the other.
   */
  public isBiggerThan(other: NumberValueObject): boolean {
    return this.value > other.value
  }
}
