import { BackofficePlanPrice } from '@BackofficeSubscriptions/Plans/domain/BackofficePlanPrice'
import { AmountMother } from '../../../Shared/domain/AmountMother'

/**
 * Factory to create PlanPrice value objects
 */
export class BackofficePlanPriceMother {
  /**
   * Creates a PlanPrice value object.
   *
   * @param value - The value to create the PlanPrice
   * @returns An instance of PlanPrice
   */
  public static create(value: number): BackofficePlanPrice {
    return new BackofficePlanPrice(value)
  }

  /**
   * Creates a random PlanPrice value object.
   *
   * @returns A random PlanPrice value object
   */
  public static random(): BackofficePlanPrice {
    return this.create(AmountMother.random())
  }

  /**
   * A invalid PlanPrice value object.
   * @returns A invalid PlanPrice value object
   */
  public static invalid(): number {
    return 0
  }
}
