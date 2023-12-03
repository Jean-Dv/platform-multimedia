import { DomainEvent } from '@Shared/domain/DomainEvent'

interface SerieCreatedDomainEventAttributes {
  title: string
  releaseDate: Date
}

export class SerieCreatedDomainEvent extends DomainEvent {
  public static readonly EVENT_NAME = 'serie.created'

  public readonly title: string
  public readonly releaseDate: Date

  constructor({
    aggregateId,
    title,
    releaseDate,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    title: string
    releaseDate: Date
    eventId?: string
    occurredOn?: Date
  }) {
    super({
      eventName: SerieCreatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    })
    this.title = title
    this.releaseDate = releaseDate
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
    attributes: SerieCreatedDomainEventAttributes
  }): DomainEvent {
    return new SerieCreatedDomainEvent({
      aggregateId: params.aggregateId,
      title: params.attributes.title,
      releaseDate: params.attributes.releaseDate,
      eventId: params.eventId,
      occurredOn: params.occurredOn
    })
  }

  /**
   * This method returns a plain object containing the attributes.
   *
   * @returns A plain object containing the attributes.
   */
  public toPrimitives(): SerieCreatedDomainEventAttributes {
    return {
      title: this.title,
      releaseDate: this.releaseDate
    }
  }
}
