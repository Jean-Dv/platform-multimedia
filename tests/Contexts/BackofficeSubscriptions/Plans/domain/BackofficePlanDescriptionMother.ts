import { BackofficePlanDescription } from '@BackofficeSubscriptions/Plans/domain/BackofficePlanDescription'
import { WordMother } from '../../../Shared/domain/WordMother'

/**
 * Factory to create PlanDescription value objects
 */
export class BackofficePlanDescriptionMother {
  /**
   * Creates a PlanDescription value object.
   *
   * @param value - The value to create the PlanDescription
   * @returns An instance of PlanDescription
   */
  public static create(value: string): BackofficePlanDescription {
    return new BackofficePlanDescription(value)
  }

  /**
   * Creates a random PlanDescription value object.
   *
   * @returns A random PlanDescription value object
   */
  public static random(): BackofficePlanDescription {
    return this.create(WordMother.random({ max: 10 }))
  }
}
