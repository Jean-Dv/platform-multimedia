import { Plan } from '@Subscriptions/Plans/domain/Plan'
import { type PlanDaysDuration } from '@Subscriptions/Shared/domain/PlanDaysDuration'
import { type PlanDescription } from '@Subscriptions/Plans/domain/PlanDescription'
import { type PlanId } from '@Subscriptions/Shared/domain/PlanId'
import { type PlanName } from '@Subscriptions/Plans/domain/PlanName'
import { type PlanPrice } from '@Subscriptions/Plans/domain/PlanPrice'
import { PlanIdMother } from '../../Shared/domain/PlanIdMother'
import { PlanNameMother } from './PlanNameMother'
import { PlanPriceMother } from './PlanPriceMother'
import { PlanDaysDurationMother } from '../../Shared/domain/PlanDaysDurationMother'
import { PlanDescriptionMother } from './PlanDescriptionMother'

/**
 * Factory to create Plan value objects
 */
export class PlanMother {
  /**
   * Creates a Plan value object.
   *
   * @param id - The id to create the Plan
   * @param name - The name to create the Plan
   * @param price - The price to create the Plan
   * @param duration - The duration to create the Plan
   * @param description - The description to create the Plan
   * @returns An instance of Plan
   */
  public static create(
    id: PlanId,
    name: PlanName,
    price: PlanPrice,
    duration: PlanDaysDuration,
    description: PlanDescription
  ): Plan {
    return new Plan(id, name, price, duration, description)
  }

  /**
   * Creates a random Plan value object.
   *
   * @returns A random Plan value object
   */
  public static random(): Plan {
    return this.create(
      PlanIdMother.random(),
      PlanNameMother.random(),
      PlanPriceMother.random(),
      PlanDaysDurationMother.random(),
      PlanDescriptionMother.random()
    )
  }
}
