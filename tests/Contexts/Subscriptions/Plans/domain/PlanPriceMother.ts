import { PlanPrice } from '@Subscriptions/Plans/domain/PlanPrice'
import { AmountMother } from '../../../Shared/domain/AmountMother'

/**
 * Factory to create PlanPrice value objects
 */
export class PlanPriceMother {
  /**
   * Creates a PlanPrice value object.
   *
   * @param value - The value to create the PlanPrice
   * @returns An instance of PlanPrice
   */
  public static create(value: number): PlanPrice {
    return new PlanPrice(value)
  }

  /**
   * Creates a random PlanPrice value object.
   *
   * @returns A random PlanPrice value object
   */
  public static random(): PlanPrice {
    return this.create(AmountMother.random())
  }
}
