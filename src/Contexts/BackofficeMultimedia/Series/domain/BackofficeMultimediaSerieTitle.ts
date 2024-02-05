import { StringValueObject } from '@Shared/domain/value-objects/StringValueObject'
import { BackofficeMultimediaSerieTitleLengthIsExceeded } from './BackofficeMultimediaSerieTitleLengthIsExceeded'

/**
 * Represents the title of a Backoffice multimedia serie, ensuring it does not exceed a specified length.
 * Inherits from the StringValueObject class, providing a standardized value object for string properties.
 * The maximum allowed length for the multimedia serie title is set to 100 characters.
 */
export class BackofficeMultimediaSerieTitle extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureLengthIsLessThan100Characters(value)
  }

  /**
   * Ensures taht the length of the multimedia serie title is less than 100 characters.
   *
   * @param value - The multimedia serie title to be validated.
   */
  private ensureLengthIsLessThan100Characters(value: string): void {
    if (value.length > 100) {
      throw new BackofficeMultimediaSerieTitleLengthIsExceeded(
        `The serie title <${value}> has more than 100 characters.`
      )
    }
  }
}
