import { StringValueObject } from '@Shared/domain/value-objects/StringValueObject'
import { MovieUrlInvalid } from './MovieUrlInvalid'

/**
 * Represents the movie url
 */
export class MovieUrl extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureIsAValidUrl(value)
  }

  /**
   * Ensures the url is valid
   *
   * @param value The url to validate
   * @throws The url is invalid
   */
  private ensureIsAValidUrl(value: string): void {
    const urlRegex =
      /^((https?|http):\/\/)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/
    if (!urlRegex.test(value)) {
      throw new MovieUrlInvalid(`The url <${value}> is invalid`)
    }
  }
}
