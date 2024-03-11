import { DomainEvent } from '@Shared/domain/DomainEvent'

/**
 * This class is used to represents the domain which is published when a Backoffice movie is deleted.
 */
export class BackofficeMultimediaMovieDeletedDomainEvent extends DomainEvent {
  public static readonly EVENT_NAME = 'backoffice.multimedia.movie.deleted'

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
      eventName: BackofficeMultimediaMovieDeletedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    })
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
  }): DomainEvent {
    return new BackofficeMultimediaMovieDeletedDomainEvent({
      aggregateId: params.aggregateId,
      eventId: params.eventId,
      occurredOn: params.occurredOn
    })
  }

  /**
   * This method returns the domain event data as primitives.
   *
   * @returns The domain event data as primitives.
   */
  public toPrimitives(): {
    aggregateId: string
  } {
    return {
      aggregateId: this.aggregateId
    }
  }
}
