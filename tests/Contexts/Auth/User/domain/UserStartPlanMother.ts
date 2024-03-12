import { UserStartPlan } from '@Auth/Shared/domain/Transactions/UserStartPlan'

/**
 * Mother class for creating UserStartPlan objects.
 */
export class UserStartPlanMother {
  /**
   * Creates a UserStartPlan object with the given value.
   *
   * @param value - The value of the UserStartPlan.
   * @returns A UserStartPlan object.
   */
  public static create(value: Date): UserStartPlan {
    return new UserStartPlan(value)
  }

  /**
   * Creates a random UserStartPlan object.
   *
   * @returns A random UserStartPlan object.
   */
  public static random(): UserStartPlan {
    return new UserStartPlan(new Date())
  }
}
