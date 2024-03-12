import { BackofficePlanDaysDuration } from '@BackofficeSubscriptions/Plans/domain/BackofficePlanDaysDuration'

/**
 * Factory to create PlanDaysDuration value objects
 */
export class BackofficePlanDaysDurationMother {
  /**
   * Creates a PlanDaysDuration value object.
   *
   * @param value - The value to create the PlanDaysDuration
   * @returns An instance of PlanDaysDuration
   */
  public static create(value: number): BackofficePlanDaysDuration {
    return new BackofficePlanDaysDuration(value)
  }

  /**
   * Creates a random PlanDaysDuration value object.
   *
   * @returns A random PlanDaysDuration value object
   */
  public static random(): BackofficePlanDaysDuration {
    return this.create(Math.floor(Math.random() * (31 - 1 + 1)) + 1)
  }

  /**
   * A invalid PlanDaysDuration value object.
   *
   * @returns A invalid PlanDaysDuration value object
   */
  public static invalid(): number {
    return 0
  }
}
