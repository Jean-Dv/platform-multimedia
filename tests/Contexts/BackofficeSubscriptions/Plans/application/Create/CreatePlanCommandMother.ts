import { type CreateBackofficePlanCommand } from '@BackofficeSubscriptions/Plans/application/Create/CreateBackofficePlanCommand'
import { type BackofficePlanDaysDuration } from '@BackofficeSubscriptions/Plans/domain/BackofficePlanDaysDuration'
import { type BackofficePlanDescription } from '@BackofficeSubscriptions/Plans/domain/BackofficePlanDescription'
import { type BackofficePlanId } from '@BackofficeSubscriptions/Plans/domain/BackofficePlanId'
import { type BackofficePlanName } from '@BackofficeSubscriptions/Plans/domain/BackofficePlanName'
import { type BackofficePlanPrice } from '@BackofficeSubscriptions/Plans/domain/BackofficePlanPrice'
import { BackofficePlanIdMother } from '../../domain/BackofficePlanIdMother'
import { PlanNameMother } from '../../domain/BackofficePlanNameMother'
import { BackofficePlanPriceMother } from '../../domain/BackofficePlanPriceMother'
import { BackofficePlanDaysDurationMother } from '../../domain/BackofficePlanDaysDurationMother'
import { BackofficePlanDescriptionMother } from '../../domain/BackofficePlanDescriptionMother'

/**
 * Utility class for creating `CreatePlanCommand` instances for testing.
 */
export class CreateBackofficePlanCommandMother {
  /**
   * Creates a valid `CreatePlanCommand`.
   *
   * @param id - The ID for the command.
   * @param name - The name for the command.
   * @param price - The price for the command.
   * @param duration - The duration for the command.
   * @param description - The description for the command.
   * @returns A valid command.
   */
  public static create(
    id: BackofficePlanId,
    name: BackofficePlanName,
    price: BackofficePlanPrice,
    duration: BackofficePlanDaysDuration,
    description: BackofficePlanDescription
  ): CreateBackofficePlanCommand {
    return {
      id: id.value,
      name: name.value,
      price: price.value,
      duration: duration.value,
      description: description.value
    }
  }

  /**
   * Creates a random valid `CreatePlanCommand`.
   *
   * @returns A random valid command.
   */
  public static random(): CreateBackofficePlanCommand {
    return this.create(
      BackofficePlanIdMother.random(),
      PlanNameMother.random(),
      BackofficePlanPriceMother.random(),
      BackofficePlanDaysDurationMother.random(),
      BackofficePlanDescriptionMother.random()
    )
  }

  /**
   * Creates an invalid `CreatePlanCommand` with an invalid name.
   *
   * @returns An invalid command.
   */
  public static invalidName(): CreateBackofficePlanCommand {
    return {
      id: BackofficePlanIdMother.random().value,
      name: PlanNameMother.invalid(),
      price: BackofficePlanPriceMother.random().value,
      duration: BackofficePlanDaysDurationMother.random().value,
      description: BackofficePlanDescriptionMother.random().value
    }
  }

  /**
   * Creates an invalid `CreatePlanCommand` with an invalid price.
   *
   * @returns An invalid command.
   */
  public static invalidPrice(): CreateBackofficePlanCommand {
    return {
      id: BackofficePlanIdMother.random().value,
      name: PlanNameMother.random().value,
      price: BackofficePlanPriceMother.invalid(),
      duration: BackofficePlanDaysDurationMother.random().value,
      description: BackofficePlanDescriptionMother.random().value
    }
  }

  /**
   * Creates an invalid `CreatePlanCommand` with an invalid duration.
   *
   * @returns An invalid command.
   */
  public static invalidDuration(): CreateBackofficePlanCommand {
    return {
      id: BackofficePlanIdMother.random().value,
      name: PlanNameMother.random().value,
      price: BackofficePlanPriceMother.random().value,
      duration: BackofficePlanDaysDurationMother.invalid(),
      description: BackofficePlanDescriptionMother.random().value
    }
  }
}
