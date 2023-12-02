import { StringValueObject } from '@Shared/domain/value-objects/StringValueObject'
import { ChapterTitleLengthExceeded } from './ChapterTitleLengthExceeded'

/**
 * Represents a chapter title.
 */
export class ChapterTitle extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureIsLessThan100Characters(value)
  }

  /**
   * Ensures that the chapter title has less than 100 characters.
   *
   * @param value - The chapter title.
   * @throws ChapterTitleLengthExceeded The chapter title length exceeds the maximum length.
   */
  private ensureIsLessThan100Characters(value: string): void {
    if (value.length > 100) {
      throw new ChapterTitleLengthExceeded(
        `The chapter title <${value}> has more than 100 characters.`
      )
    }
  }
}
