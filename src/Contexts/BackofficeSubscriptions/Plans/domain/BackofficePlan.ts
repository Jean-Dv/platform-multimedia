import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { BackofficePlanId } from './BackofficePlanId'
import { BackofficePlanName } from './BackofficePlanName'
import { BackofficePlanPrice } from './BackofficePlanPrice'
import { BackofficePlanDaysDuration } from './BackofficePlanDaysDuration'
import { BackofficePlanDescription } from './BackofficePlanDescription'
import { BackofficePlanCreatedDomainEvent } from './BackofficePlanCreatedDomainEvent'

/**
 * Represents a plan in the system.
 */
export class BackofficePlan extends AggregateRoot {
  public readonly id: BackofficePlanId
  public readonly name: BackofficePlanName
  public readonly price: BackofficePlanPrice
  public readonly duration: BackofficePlanDaysDuration
  public readonly description: BackofficePlanDescription

  constructor(
    id: BackofficePlanId,
    name: BackofficePlanName,
    price: BackofficePlanPrice,
    duration: BackofficePlanDaysDuration,
    description: BackofficePlanDescription
  ) {
    super()
    this.id = id
    this.name = name
    this.price = price
    this.duration = duration
    this.description = description
  }

  /**
   * Creates and records a new plan.
   *
   * @param id - The plan id.
   * @param name - The plan name.
   * @param price - The plan price.
   * @param duration - The plan duration.
   * @param description - The plan description.
   * @returns An instance of the Plan class.
   */
  public static create(
    id: BackofficePlanId,
    name: BackofficePlanName,
    price: BackofficePlanPrice,
    duration: BackofficePlanDaysDuration,
    description: BackofficePlanDescription
  ): BackofficePlan {
    const plan = new BackofficePlan(id, name, price, duration, description)
    plan.record(
      new BackofficePlanCreatedDomainEvent({
        aggregateId: id.value,
        name: name.value,
        price: price.value,
        duration: duration.value,
        description: description.value
      })
    )
    return plan
  }

  /**
   * Create a new plan from primitives.
   *
   * @param params - The plan parameters.
   * @returns An instance of the Plan class.
   */
  public static fromPrimitives(params: {
    id: string
    name: string
    price: number
    duration: number
    description: string
  }): BackofficePlan {
    return new BackofficePlan(
      new BackofficePlanId(params.id),
      new BackofficePlanName(params.name),
      new BackofficePlanPrice(params.price),
      new BackofficePlanDaysDuration(params.duration),
      new BackofficePlanDescription(params.description)
    )
  }

  /**
   * Convert the plan to its primitive representation.
   *
   * @returns The plan parameters.
   */
  public toPrimitives(): {
    id: string
    name: string
    price: number
    duration: number
    description: string
  } {
    return {
      id: this.id.value,
      name: this.name.value,
      price: this.price.value,
      duration: this.duration.value,
      description: this.description.value
    }
  }
}
