import { BackofficePlanName } from '@BackofficeSubscriptions/Plans/domain/BackofficePlanName'
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
  public static create(value: string): BackofficePlanName {
    return new BackofficePlanName(value)
  }

  /**
   * Creates a random PlanName value object.
   *
   * @returns A random PlanName value object
   */
  public static random(): BackofficePlanName {
    return this.create(WordMother.random({ max: 3 }))
  }

  /**
   * Creates a random invalid PlanName value object.
   *
   * @returns A random invalid PlanName value object
   */
  public static invalid(): string {
    return WordMother.random({ max: 50 })
  }
}
