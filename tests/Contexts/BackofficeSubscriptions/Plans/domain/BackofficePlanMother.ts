import { BackofficePlan } from '@BackofficeSubscriptions/Plans/domain/BackofficePlan'
import { BackofficePlanDaysDuration } from '@BackofficeSubscriptions/Plans/domain/BackofficePlanDaysDuration'
import { BackofficePlanDescription } from '@BackofficeSubscriptions/Plans/domain/BackofficePlanDescription'
import { BackofficePlanId } from '@BackofficeSubscriptions/Plans/domain/BackofficePlanId'
import { BackofficePlanName } from '@BackofficeSubscriptions/Plans/domain/BackofficePlanName'
import { BackofficePlanPrice } from '@BackofficeSubscriptions/Plans/domain/BackofficePlanPrice'
import { BackofficePlanIdMother } from './BackofficePlanIdMother'
import { PlanNameMother } from './BackofficePlanNameMother'
import { BackofficePlanPriceMother } from './BackofficePlanPriceMother'
import { BackofficePlanDaysDurationMother } from './BackofficePlanDaysDurationMother'
import { BackofficePlanDescriptionMother } from './BackofficePlanDescriptionMother'
import { type CreateBackofficePlanCommand } from '@BackofficeSubscriptions/Plans/application/Create/CreateBackofficePlanCommand'

/**
 * Factory to create Plan value objects
 */
export class BackofficePlanMother {
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
    id: BackofficePlanId,
    name: BackofficePlanName,
    price: BackofficePlanPrice,
    duration: BackofficePlanDaysDuration,
    description: BackofficePlanDescription
  ): BackofficePlan {
    return new BackofficePlan(id, name, price, duration, description)
  }

  /**
   * Creates a Plan value object from a command.
   *
   * @param command - The command to create the Plan
   * @returns An instance of Plan
   */
  public static from(command: CreateBackofficePlanCommand): BackofficePlan {
    return this.create(
      new BackofficePlanId(command.id),
      new BackofficePlanName(command.name),
      new BackofficePlanPrice(command.price),
      new BackofficePlanDaysDuration(command.duration),
      new BackofficePlanDescription(command.description)
    )
  }

  /**
   * Creates a random Plan value object.
   *
   * @returns A random Plan value object
   */
  public static random(): BackofficePlan {
    return this.create(
      BackofficePlanIdMother.random(),
      PlanNameMother.random(),
      BackofficePlanPriceMother.random(),
      BackofficePlanDaysDurationMother.random(),
      BackofficePlanDescriptionMother.random()
    )
  }
}
