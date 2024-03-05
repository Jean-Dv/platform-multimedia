import { PlanId } from '@Subscriptions/Plans/domain/PlanId'
import { UuidMother } from '../../../Shared/domain/UuidMother'

/**
 * Factory to create PlanId value objects
 */
export class PlanIdMother {
  /**
   * Creates a PlanId value object.
   *
   * @param value - The value to create the PlanId
   * @returns An instance of PlanId
   */
  public static create(value: string): PlanId {
    return new PlanId(value)
  }

  /**
   * Creates a random PlanId value object.
   *
   * @returns A random PlanId value object
   */
  public static random(): PlanId {
    return this.create(UuidMother.random())
  }
}
