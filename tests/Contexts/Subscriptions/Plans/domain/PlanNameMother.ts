import { PlanName } from '@Subscriptions/Plans/domain/PlanName'
import { WordMother } from '../../../Shared/domain/WordMother'

/**
 * Factory to create PlanName value objects
 */
export class PlanNameMother {
  /**
   * Creates a PlanName value object.
   *
   * @param value - The value to create the PlanName
   * @returns An instance of PlanName
   */
  public static create(value: string): PlanName {
    return new PlanName(value)
  }

  /**
   * Creates a random PlanName value object.
   *
   * @returns A random PlanName value object
   */
  public static random(): PlanName {
    return this.create(WordMother.random({ max: 3 }))
  }
}
