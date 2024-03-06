import { BackofficePlanId } from '@BackofficeSubscriptions/Plans/domain/BackofficePlanId'
import { UuidMother } from '../../../Shared/domain/UuidMother'

/**
 * Factory to create PlanId value objects
 */
export class BackofficePlanIdMother {
  /**
   * Creates a PlanId value object.
   *
   * @param value - The value to create the PlanId
   * @returns An instance of PlanId
   */
  public static create(value: string): BackofficePlanId {
    return new BackofficePlanId(value)
  }

  /**
   * Creates a random PlanId value object.
   *
   * @returns A random PlanId value object
   */
  public static random(): BackofficePlanId {
    return this.create(UuidMother.random())
  }
}
