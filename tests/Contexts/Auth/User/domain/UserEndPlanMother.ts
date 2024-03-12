import { UserEndPlan } from '@Auth/Shared/domain/Transactions/UserEndPlan'
import { DateMother } from '../../../Shared/domain/DateMother'

/**
 * Mother class for creating UserEndPlan objects.
 */
export class UserEndPlanMother {
  /**
   * Creates a UserEndPlan object with the given value.
   *
   * @param value - The value of the UserEndPlan.
   * @returns A UserEndPlan object.
   */
  public static create(value: Date): UserEndPlan {
    return new UserEndPlan(value)
  }

  /**
   * Creates a random UserEndPlan object.
   *
   * @returns A random UserEndPlan object.
   */
  public static random(): UserEndPlan {
    return new UserEndPlan(DateMother.random().future())
  }
}
