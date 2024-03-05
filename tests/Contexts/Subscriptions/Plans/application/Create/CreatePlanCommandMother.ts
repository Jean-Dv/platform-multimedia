import { type CreatePlanCommand } from '@Subscriptions/Plans/application/Create/CreatePlanCommand'
import { type PlanDaysDuration } from '@Subscriptions/Plans/domain/PlanDaysDuration'
import { type PlanDescription } from '@Subscriptions/Plans/domain/PlanDescription'
import { type PlanId } from '@Subscriptions/Plans/domain/PlanId'
import { type PlanName } from '@Subscriptions/Plans/domain/PlanName'
import { type PlanPrice } from '@Subscriptions/Plans/domain/PlanPrice'
import { PlanIdMother } from '../../domain/PlanIdMother'
import { PlanNameMother } from '../../domain/PlanNameMother'
import { PlanPriceMother } from '../../domain/PlanPriceMother'
import { PlanDaysDurationMother } from '../../domain/PlanDaysDurationMother'
import { PlanDescriptionMother } from '../../domain/PlanDescriptionMother'

/**
 * Utility class for creating `CreatePlanCommand` instances for testing.
 */
export class CreatePlanCommandMother {
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
    id: PlanId,
    name: PlanName,
    price: PlanPrice,
    duration: PlanDaysDuration,
    description: PlanDescription
  ): CreatePlanCommand {
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
  public static random(): CreatePlanCommand {
    return this.create(
      PlanIdMother.random(),
      PlanNameMother.random(),
      PlanPriceMother.random(),
      PlanDaysDurationMother.random(),
      PlanDescriptionMother.random()
    )
  }

  /**
   * Creates an invalid `CreatePlanCommand` with an invalid name.
   *
   * @returns An invalid command.
   */
  public static invalidName(): CreatePlanCommand {
    return {
      id: PlanIdMother.random().value,
      name: PlanNameMother.invalid(),
      price: PlanPriceMother.random().value,
      duration: PlanDaysDurationMother.random().value,
      description: PlanDescriptionMother.random().value
    }
  }

  /**
   * Creates an invalid `CreatePlanCommand` with an invalid price.
   *
   * @returns An invalid command.
   */
  public static invalidPrice(): CreatePlanCommand {
    return {
      id: PlanIdMother.random().value,
      name: PlanNameMother.random().value,
      price: PlanPriceMother.invalid(),
      duration: PlanDaysDurationMother.random().value,
      description: PlanDescriptionMother.random().value
    }
  }

  /**
   * Creates an invalid `CreatePlanCommand` with an invalid duration.
   *
   * @returns An invalid command.
   */
  public static invalidDuration(): CreatePlanCommand {
    return {
      id: PlanIdMother.random().value,
      name: PlanNameMother.random().value,
      price: PlanPriceMother.random().value,
      duration: PlanDaysDurationMother.invalid(),
      description: PlanDescriptionMother.random().value
    }
  }
}
