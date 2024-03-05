import { StringValueObject } from '@Shared/domain/value-objects/StringValueObject'
import { PlanNameLengthExceeded } from './PlanNameLengthExceeded'

/**
 * Represents the name of a plan.
 */
export class PlanName extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureLengthIsLessThan100Characters(value)
  }

  /**
   * Check if the length of the plan name is less than 100 characters.
   *
   * @param value - The value to check.
   */
  private ensureLengthIsLessThan100Characters(value: string): void {
    if (value.length > 100) {
      throw new PlanNameLengthExceeded(
        `The plan name <${value}> has more than 100 characters.`
      )
    }
  }
}
