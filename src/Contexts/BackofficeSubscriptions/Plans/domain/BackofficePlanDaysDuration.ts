import { NumberValueObject } from '@Shared/domain/value-objects/NumberValueObject'
import { BackofficePlanDaysDurationIsNegative } from './BackofficePlanDaysDurationIsNegative'

/**
 * Represents the duration of a plan in days.
 */
export class BackofficePlanDaysDuration extends NumberValueObject {
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
      throw new BackofficePlanDaysDurationIsNegative(
        `The plan days duration <${value}> must be positive.`
      )
    }
  }
}
