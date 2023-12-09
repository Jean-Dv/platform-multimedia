import { DomainEvent } from '@Shared/domain/DomainEvent'

interface DeleteCategoryDomainEventAttributes {
  readonly name: string
}

export class CategoryDeletedDomainEvent extends DomainEvent {
  public static readonly EVENT_NAME = 'category.deleted'

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
      eventName: CategoryDeletedDomainEvent.EVENT_NAME,
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
    attributes: DeleteCategoryDomainEventAttributes
  }): DomainEvent {
    return new CategoryDeletedDomainEvent({
      aggregateId: params.aggregateId,
      name: params.attributes.name,
      eventId: params.eventId,
      occurredOn: params.occurredOn
    })
  }

  public toPrimitives(): DeleteCategoryDomainEventAttributes {
    return {
      name: this.name
    }
  }
}
