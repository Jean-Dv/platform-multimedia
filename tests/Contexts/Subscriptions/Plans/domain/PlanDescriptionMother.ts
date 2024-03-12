import { PlanDescription } from '@Subscriptions/Plans/domain/PlanDescription'
import { WordMother } from '../../../Shared/domain/WordMother'

/**
 * Factory to create PlanDescription value objects
 */
export class PlanDescriptionMother {
  /**
   * Creates a PlanDescription value object.
   *
   * @param value - The value to create the PlanDescription
   * @returns An instance of PlanDescription
   */
  public static create(value: string): PlanDescription {
    return new PlanDescription(value)
  }

  /**
   * Creates a random PlanDescription value object.
   *
   * @returns A random PlanDescription value object
   */
  public static random(): PlanDescription {
    return this.create(WordMother.random({ max: 10 }))
  }
}
