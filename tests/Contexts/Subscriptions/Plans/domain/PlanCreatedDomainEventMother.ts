import { type Plan } from '@Subscriptions/Plans/domain/Plan'
import { PlanCreatedDomainEvent } from '@Subscriptions/Plans/domain/PlanCreatedDomainEvent'

/**
 * Factory to create PlanCreatedDomainEvent domain events
 */
export class PlanCreatedDomainEventMother {
  /**
   * Creates a PlanCreatedDomainEvent domain event.
   *
   * @param aggregateId - The aggregate id
   * @param eventId - The event id
   * @param name - The plan name
   * @param description - The plan description
   * @param duration - The plan duration
   * @param price - The plan price
   * @param occurredOn - The event occurred on
   * @returns An instance of PlanCreatedDomainEvent
   */
  public static create({
    aggregateId,
    eventId,
    name,
    description,
    duration,
    price,
    occurredOn
  }: {
    aggregateId: string
    eventId?: string
    name: string
    description: string
    duration: number
    price: number
    occurredOn?: Date
  }): PlanCreatedDomainEvent {
    return new PlanCreatedDomainEvent({
      aggregateId,
      name,
      price,
      duration,
      description,
      eventId,
      occurredOn
    })
  }

  /**
   * Creates a random PlanCreatedDomainEvent domain event.
   *
   * @returns A random PlanCreatedDomainEvent domain event
   */
  public static fromPlan(plan: Plan): PlanCreatedDomainEvent {
    return this.create({
      aggregateId: plan.id.value,
      name: plan.name.value,
      description: plan.description.value,
      duration: plan.duration.value,
      price: plan.price.value
    })
  }
}
