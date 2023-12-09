import { DomainEvent } from '@Shared/domain/DomainEvent'

interface CreateCategoryDomainEventAttributes {
  name: string
}

export class CategoryCreatedDomainEvent extends DomainEvent {
  public static readonly EVENT_NAME = 'category.created'

  public readonly name: string

  constructor({
    aggregateId,
    name,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    name: string
    eventId?: string
    occurredOn?: Date
  }) {
    super({
      eventName: CategoryCreatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    })
    this.name = name
  }

  public static fromPrimitives(params: {
    aggregateId: string
    eventId: string
    occurredOn: Date
    attributes: CreateCategoryDomainEventAttributes
  }): DomainEvent {
    return new CategoryCreatedDomainEvent({
      aggregateId: params.aggregateId,
      name: params.attributes.name,
      eventId: params.eventId,
      occurredOn: params.occurredOn
    })
  }

  public toPrimitives(): CreateCategoryDomainEventAttributes {
    return {
      name: this.name
    }
  }
}
