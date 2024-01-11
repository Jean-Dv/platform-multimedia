import { StringValueObject } from '@Shared/domain/value-objects/StringValueObject'
import { BackofficeMultimediaMovieTitleLengthIsExceeded } from './BackofficeMultimediaMovieTitleLengthIsExceeded'

/**
 * Represents the title of a Backoffice movie, ensuring it does not exceed a specified length.
 * Inherits from the StringValueObject class, providing a standardized value object for string properties.
 * The maximum allowed length for the movie title is set to 100 characters.
 */
export class BackofficeMultimediaMovieTitle extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureLengthIsLessThan255Characters(value)
  }

  /**
   * Ensures that the length of the movie title is less than 100 characters.
   *
   * @param value - The movie title to be validated.
   * @throws Thrown if the length exceeds 100 characters.
   */
  private ensureLengthIsLessThan255Characters(value: string): void {
    if (value.length > 100) {
      throw new BackofficeMultimediaMovieTitleLengthIsExceeded(
        `The movie title <${value}> has more than 100 characters`
      )
    }
  }
}
