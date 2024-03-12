import { StringValueObject } from '@Shared/domain/value-objects/StringValueObject'
import { BackofficeMultimediaChapterTitleLengthIsExceeded } from './BackofficeMultimediaChapterTitleLengthIsExceeded'

/**
 * Represents the title of a Backoffice chapter.
 * Inherits from the StringValueObject class, providing a standardized value object for string properties.
 */
export class BackofficeMultimediaChapterTitle extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureLengthIsLessThan100Characters(value)
  }

  /**
   * Ensures that the title is less than 100 characters.
   *
   * @param value - The title to be validated.
   */
  private ensureLengthIsLessThan100Characters(value: string): void {
    if (value.length > 100) {
      throw new BackofficeMultimediaChapterTitleLengthIsExceeded(
        `The chapter title <${value}> has more than 100 characters`
      )
    }
  }
}
