import { DomainEvent } from '@Shared/domain/DomainEvent'

interface CreateBackofficeMultimediaVideoDomainEventAttributes {
  readonly path: string
}

/**
 * This class is used to represent the domain which is emitted when a video is created.
 */
export class BackofficeMultimediaVideoCreatedDomainEvent extends DomainEvent {
  public static readonly EVENT_NAME = 'backoffice.multimedia.video.created'

  public readonly path: string

  constructor({
    aggregateId,
    path,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    path: string
    eventId?: string
    occurredOn?: Date
  }) {
    super({
      eventName: BackofficeMultimediaVideoCreatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    })
    this.path = path
  }

  /**
   * This method returns a new instance of this domain event
   * using the provided parameters.
   *
   * @param params The parameters to be used to created the new instance.
   * @returns A new instance of this domain event.
   */
  public static fromPrimitives(params: {
    aggregateId: string
    eventId: string
    occurredOn: Date
    attributes: CreateBackofficeMultimediaVideoDomainEventAttributes
  }): DomainEvent {
    return new BackofficeMultimediaVideoCreatedDomainEvent({
      aggregateId: params.aggregateId,
      path: params.attributes.path,
      eventId: params.eventId,
      occurredOn: params.occurredOn
    })
  }

  /**
   * This method returns a plain object containing the attributes
   * of this domain event.
   *
   * @returns A plain object containing the attributes of this domain event.
   */
  public toPrimitives(): CreateBackofficeMultimediaVideoDomainEventAttributes {
    return {
      path: this.path
    }
  }
}
