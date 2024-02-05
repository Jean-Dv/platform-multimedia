import { StringValueObject } from '@Shared/domain/value-objects/StringValueObject'
import { BackofficeMultimediaSeasonTitleLengthIsExceeded } from './BackofficeMultimediaSeasonTitleLengthIsExceeded'

/**
 * Represents the title of a Backoffice season.
 * Inherits from the StringValueObject class, providing a standardized value object for string properties.
 */
export class BackofficeMultimediaSeasonTitle extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureLengthIsLessThan100Characters(value)
  }

  /**
   * Ensures that the title is less than 100 characters.
   *
   * @param value - The title to be validated.
   * @throws Thrown if the title has more than 100 characters.
   */
  private ensureLengthIsLessThan100Characters(value: string): void {
    if (value.length > 100) {
      throw new BackofficeMultimediaSeasonTitleLengthIsExceeded(
        `The season title <${value}> has more than 100 characters`
      )
    }
  }
}
