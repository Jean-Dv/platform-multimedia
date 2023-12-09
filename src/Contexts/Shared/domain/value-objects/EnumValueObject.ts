/**
 * Abstract base class representing an enumerated value object.
 * Enumerated value objects have a fixed set of valid values.
 */
export abstract class EnumValueObject<T> {
  public readonly value: T

  constructor(
    value: T,
    public readonly validValues: T[]
  ) {
    this.value = value
    this.checkValueIsValid(value)
  }

  /**
   * Checks if the provided value is valid for the enumerated value.
   * Throws an error if the value is not valid.
   *
   * @param value - The value to be checked.
   */
  public checkValueIsValid(value: T): void {
    if (!this.validValues.includes(value)) {
      this.throwErrorForInvalidValue(value)
    }
  }

  /**
   * Abstract method to be implemented by subclasses.
   * Throws an error for an invalid value.
   *
   * @param value - The invalid value that caused the error.
   */
  protected abstract throwErrorForInvalidValue(value: T): void
}
