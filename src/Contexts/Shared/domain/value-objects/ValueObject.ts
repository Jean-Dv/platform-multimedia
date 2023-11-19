import { InvalidArgumentError } from './InvalidArgumentError'

export type Primitives = string | number | boolean | Date

/**
 * Abstract class representing a generic value object.
 */
export abstract class ValueObject<T extends Primitives> {
  public readonly value: T

  constructor(value: T) {
    this.value = value
    this.ensureValueIsDefined(value)
  }

  /**
   * Ensures that the provided value is defined.
   *
   * @param value - The value to check.
   * @throws If the value is null or undefined.
   */
  private ensureValueIsDefined(value: T): void {
    if (value === null || value === undefined) {
      throw new InvalidArgumentError(`The value must be defined`)
    }
  }

  /**
   * Checks if this value object is equal to another value object.
   *
   * @param other - The other value object to compare.
   * @returns True if the value objects are equal, false otherwise.
   */
  public equals(other: ValueObject<T>): boolean {
    return (
      other.constructor.name === this.constructor.name &&
      other.value === this.value
    )
  }

  /**
   * Returns a string representation of the value object.
   *
   * @returns The string representation of the value object.
   */
  public toString(): string {
    return this.value.toString()
  }
}
