import { StringValueObject } from '@Shared/domain/value-objects/StringValueObject'
import { SerieTitleLengthExceeded } from './SerieTitleLengthExceeded'

/**
 * Represents a serie title.
 */
export class SerieTitle extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureLengthIsLessThan100Characters(value)
  }

  /**
   * Ensures that the length of the provided name is less than 100 characters.
   *
   * @param value - The string value to be validated.
   * @throws SerieTitleLengthExceeded if the provided name exceeds 100 characters.
   */
  private ensureLengthIsLessThan100Characters(value: string): void {
    if (value.length > 100) {
      throw new SerieTitleLengthExceeded(
        `The movie name <${value}> has more than 100 characters.`
      )
    }
  }
}
