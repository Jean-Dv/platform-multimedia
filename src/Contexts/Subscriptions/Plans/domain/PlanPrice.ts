import { NumberValueObject } from '@Shared/domain/value-objects/NumberValueObject'
import { PlanPriceIsNegative } from './PlanPriceIsNegative'

/**
 * Represents the price of a plan.
 */
export class PlanPrice extends NumberValueObject {
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
      throw new PlanPriceIsNegative(
        `The plan price <${value}> must be positive.`
      )
    }
  }
}
