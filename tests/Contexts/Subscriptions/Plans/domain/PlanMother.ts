import { Plan } from '@Subscriptions/Plans/domain/Plan'
import { PlanDaysDuration } from '@Subscriptions/Plans/domain/PlanDaysDuration'
import { PlanDescription } from '@Subscriptions/Plans/domain/PlanDescription'
import { PlanId } from '@Subscriptions/Plans/domain/PlanId'
import { PlanName } from '@Subscriptions/Plans/domain/PlanName'
import { PlanPrice } from '@Subscriptions/Plans/domain/PlanPrice'
import { PlanIdMother } from './PlanIdMother'
import { PlanNameMother } from './PlanNameMother'
import { PlanPriceMother } from './PlanPriceMother'
import { PlanDaysDurationMother } from './PlanDaysDurationMother'
import { PlanDescriptionMother } from './PlanDescriptionMother'
import { type CreatePlanCommand } from '@Subscriptions/Plans/application/Create/CreatePlanCommand'

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
   * Creates a Plan value object from a command.
   *
   * @param command - The command to create the Plan
   * @returns An instance of Plan
   */
  public static from(command: CreatePlanCommand): Plan {
    return this.create(
      new PlanId(command.id),
      new PlanName(command.name),
      new PlanPrice(command.price),
      new PlanDaysDuration(command.duration),
      new PlanDescription(command.description)
    )
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
