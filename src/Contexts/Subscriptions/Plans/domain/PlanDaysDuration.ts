import { NumberValueObject } from '@Shared/domain/value-objects/NumberValueObject'
import { PlanDaysDurationIsNegative } from './PlanDaysDurationIsNegative'

/**
 * Represents the duration of a plan in days.
 */
export class PlanDaysDuration extends NumberValueObject {
  constructor(value: number) {
    super(value)
    this.ensureIsPositive(value)
  }

  /**
   * Check if the plan days duration is positive.
   *
   * @param value - The value to check.
   */
  private ensureIsPositive(value: number): void {
    if (value <= 0) {
      throw new PlanDaysDurationIsNegative(
        `The plan days duration <${value}> must be positive.`
      )
    }
  }
}
