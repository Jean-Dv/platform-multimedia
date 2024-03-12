import { DomainEvent } from '@Shared/domain/DomainEvent'

interface CreatePlanDomainEventAttributes {
  readonly name: string
  readonly price: number
  readonly duration: number
  readonly description: string
}

/**
 * This class is used to represents the domain which is published when a new plan is created.
 */
export class BackofficePlanCreatedDomainEvent extends DomainEvent {
  public static readonly EVENT_NAME = 'backoffice.subscriptions.plan.created'

  public readonly name: string
  public readonly price: number
  public readonly duration: number
  public readonly description: string

  constructor({
    aggregateId,
    name,
    price,
    duration,
    description,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    name: string
    price: number
    duration: number
    description: string
    eventId?: string
    occurredOn?: Date
  }) {
    super({
      eventName: BackofficePlanCreatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    })
    this.name = name
    this.price = price
    this.duration = duration
    this.description = description
  }

  /**
   * This method returns a new instance of this domain event
   * using the provided parameters.
   *
   * @param params - The parameters to be used to created the new instance.
   * @returns A new instance of this domain event.
   */
  public static fromPrimitives(params: {
    aggregateId: string
    eventId: string
    occurredOn: Date
    attributes: CreatePlanDomainEventAttributes
  }): DomainEvent {
    return new BackofficePlanCreatedDomainEvent({
      aggregateId: params.aggregateId,
      name: params.attributes.name,
      price: params.attributes.price,
      duration: params.attributes.duration,
      description: params.attributes.description,
      eventId: params.eventId,
      occurredOn: params.occurredOn
    })
  }

  /**
   * Convert the domain event to its primitive representation.
   *
   * @returns The domain event attributes.
   */
  public toPrimitives(): CreatePlanDomainEventAttributes {
    return {
      name: this.name,
      price: this.price,
      duration: this.duration,
      description: this.description
    }
  }
}
