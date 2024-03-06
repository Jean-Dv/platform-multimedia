import { NumberValueObject } from '@Shared/domain/value-objects/NumberValueObject'
import { BackofficePlanPriceIsNegative } from './BackofficePlanPriceIsNegative'

/**
 * Represents the price of a plan.
 */
export class BackofficePlanPrice extends NumberValueObject {
  constructor(value: number) {
    super(value)
    this.ensureIsPositive(value)
  }

  /**
   * Check if the plan price is positive.
   *
   * @param value - The value to check.
   */
  private ensureIsPositive(value: number): void {
    if (value <= 0) {
      throw new BackofficePlanPriceIsNegative(
        `The plan price <${value}> must be positive.`
      )
    }
  }
}
