import { DomainEvent } from '@Shared/domain/DomainEvent'

interface CreateBackofficeCategoryDomainEventAttributes {
  name: string
}

export class BackofficeCategoryCreatedDomainEvent extends DomainEvent {
  public static readonly EVENT_NAME = 'backoffice.category.created'

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
      eventName: BackofficeCategoryCreatedDomainEvent.EVENT_NAME,
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
    attributes: CreateBackofficeCategoryDomainEventAttributes
  }): DomainEvent {
    return new BackofficeCategoryCreatedDomainEvent({
      aggregateId: params.aggregateId,
      name: params.attributes.name,
      eventId: params.eventId,
      occurredOn: params.occurredOn
    })
  }

  public toPrimitives(): CreateBackofficeCategoryDomainEventAttributes {
    return {
      name: this.name
    }
  }
}
