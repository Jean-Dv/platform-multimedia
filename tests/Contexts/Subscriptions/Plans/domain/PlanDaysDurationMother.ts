import { PlanDaysDuration } from '@Subscriptions/Plans/domain/PlanDaysDuration'

/**
 * Factory to create PlanDaysDuration value objects
 */
export class PlanDaysDurationMother {
  /**
   * Creates a PlanDaysDuration value object.
   *
   * @param value - The value to create the PlanDaysDuration
   * @returns An instance of PlanDaysDuration
   */
  public static create(value: number): PlanDaysDuration {
    return new PlanDaysDuration(value)
  }

  /**
   * Creates a random PlanDaysDuration value object.
   *
   * @returns A random PlanDaysDuration value object
   */
  public static random(): PlanDaysDuration {
    return this.create(Math.floor(Math.random() * 31))
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
