import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { PlanId } from '../../Shared/domain/PlanId'
import { PlanName } from './PlanName'
import { PlanPrice } from './PlanPrice'
import { PlanDaysDuration } from '../../Shared/domain/PlanDaysDuration'
import { PlanDescription } from './PlanDescription'

/**
 * Represents a plan in the system.
 */
export class Plan extends AggregateRoot {
  public readonly id: PlanId
  public readonly name: PlanName
  public readonly price: PlanPrice
  public readonly duration: PlanDaysDuration
  public readonly description: PlanDescription

  constructor(
    id: PlanId,
    name: PlanName,
    price: PlanPrice,
    duration: PlanDaysDuration,
    description: PlanDescription
  ) {
    super()
    this.id = id
    this.name = name
    this.price = price
    this.duration = duration
    this.description = description
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
  }): Plan {
    return new Plan(
      new PlanId(params.id),
      new PlanName(params.name),
      new PlanPrice(params.price),
      new PlanDaysDuration(params.duration),
      new PlanDescription(params.description)
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
