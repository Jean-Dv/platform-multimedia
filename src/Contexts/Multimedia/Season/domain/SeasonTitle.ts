import { StringValueObject } from '@Shared/domain/value-objects/StringValueObject'
import { SeasonTitleLengthExceeded } from '../../Series/domain/SeasonTitleLengthExceeded'

/**
 * Represents a season title.
 */
export class SeasonTitle extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureLengthIsLessThan100Characters(value)
  }

  /**
   * Ensures the season title length is less than 100 characters.
   *
   * @param value - The season title.
   * @throws SeasonTitleLengthExceeded The season title length exceeds the maximum length.
   */
  private ensureLengthIsLessThan100Characters(value: string): void {
    if (value.length > 100) {
      throw new SeasonTitleLengthExceeded(
        `The season name <${value}> has more than 100 characters.`
      )
    }
  }
}
