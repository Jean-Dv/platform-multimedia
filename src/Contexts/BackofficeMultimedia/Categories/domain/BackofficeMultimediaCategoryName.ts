import { StringValueObject } from '@Shared/domain/value-objects/StringValueObject'

/**
 * Represents the name of a Backoffice category, ensuring it does not exceed a specified length.
 * Inherits from the StringValueObject class, providing a standardized value object for string properties.
 * The maximum allowed length for the category name is set to 50 characters.
 */
export class BackofficeMultimediaCategoryName extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureLengthIsLessThan50Characters(value)
  }

  /**
   * Ensures that the length of the category name is less than 50 characters.
   *
   * @param value - The category name to be validated.
   * @throws Thrown if the length exceeds 50 characters.
   */
  private ensureLengthIsLessThan50Characters(value: string): void {
    if (value.length > 50) {
      throw new Error(
        `The category name <${value}> has more than 50 characters`
      )
    }
  }
}
