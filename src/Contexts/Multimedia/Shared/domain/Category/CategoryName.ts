import { StringValueObject } from '@Shared/domain/value-objects/StringValueObject'
import { CategoryNameLengthIsExceeded } from '../../../Categories/domain/CategoryNameLengthIsExceeded'

export class CategoryName extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureLengthIsLessThan50Characters(value)
  }

  private ensureLengthIsLessThan50Characters(value: string): void {
    if (value.length > 50) {
      throw new CategoryNameLengthIsExceeded(
        `The category name <${value}> has more than 50 characters`
      )
    }
  }
}
