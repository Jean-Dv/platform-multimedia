import { StringValueObject } from '@Shared/domain/value-objects/StringValueObject'
import { ChapterUrlInvalid } from './ChapterUrlInvalid'
/**
 * Represents the URL of a chapter.
 * This class extends the StringValueObject to enforce valid URL format.
 */
export class ChapterUrl extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureUrlIsValid(value)
  }

  /**
   * Ensures that the provided URL is valid.
   *
   * @param url - The URL to be validated.
   * @throws ChapterUrlInvalid - If the provided URL is invalid.
   */
  private ensureUrlIsValid(url: string): void {
    const urlRegex =
      /^((https?|http):\/\/)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/
    if (!urlRegex.test(url)) {
      throw new ChapterUrlInvalid(`The url <${url}> is invalid`)
    }
  }
}
