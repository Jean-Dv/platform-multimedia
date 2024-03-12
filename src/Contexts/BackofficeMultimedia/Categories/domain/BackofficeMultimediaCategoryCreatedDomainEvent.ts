import { DomainEvent } from '@Shared/domain/DomainEvent'

interface CreateBackofficeMultimediaCategoryDomainEventAttributes {
  name: string
}

/**
 * Domain event representing the creation of a backoffice multimedia category.
 */
export class BackofficeMultimediaCategoryCreatedDomainEvent extends DomainEvent {
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
      eventName: BackofficeMultimediaCategoryCreatedDomainEvent.EVENT_NAME,
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
    attributes: CreateBackofficeMultimediaCategoryDomainEventAttributes
  }): DomainEvent {
    return new BackofficeMultimediaCategoryCreatedDomainEvent({
      aggregateId: params.aggregateId,
      name: params.attributes.name,
      eventId: params.eventId,
      occurredOn: params.occurredOn
    })
  }

  public toPrimitives(): CreateBackofficeMultimediaCategoryDomainEventAttributes {
    return {
      name: this.name
    }
  }
}
