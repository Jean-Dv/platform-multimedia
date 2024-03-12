import { DomainEvent } from '@Shared/domain/DomainEvent'

/**
 * This class is used to represents the domain which is published when a Backoffice season is deleted.
 */
export class BackofficeMultimediaSeasonDeletedDomainEvent extends DomainEvent {
  public static readonly EVENT_NAME = 'backoffice.multimedia.season.deleted'

  constructor({
    aggregateId,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    eventId?: string
    occurredOn?: Date
  }) {
    super({
      eventName: BackofficeMultimediaSeasonDeletedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    })
  }

  public static fromPrimitives(params: {
    aggregateId: string
    eventId: string
    occurredOn: Date
  }): DomainEvent {
    return new BackofficeMultimediaSeasonDeletedDomainEvent({
      aggregateId: params.aggregateId,
      eventId: params.eventId,
      occurredOn: params.occurredOn
    })
  }

  public toPrimitives(): {
    aggregateId: string
  } {
    return {
      aggregateId: this.aggregateId
    }
  }
}
