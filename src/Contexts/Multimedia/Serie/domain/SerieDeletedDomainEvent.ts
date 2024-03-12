import { DomainEvent } from '@Shared/domain/DomainEvent'

interface SerieDeletedDomainEventAttributes {
  category: string
  title: string
  releaseDate: Date
}

export class SerieDeletedDomainEvent extends DomainEvent {
  public static readonly EVENT_NAME = 'serie.deleted'

  public readonly category: string
  public readonly title: string
  public readonly releaseDate: Date

  constructor({
    aggregateId,
    category,
    title,
    releaseDate,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    category: string
    title: string
    releaseDate: Date
    eventId?: string
    occurredOn?: Date
  }) {
    super({
      eventName: SerieDeletedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    })
    this.category = category
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
    attributes: SerieDeletedDomainEventAttributes
  }): DomainEvent {
    return new SerieDeletedDomainEvent({
      aggregateId: params.aggregateId,
      category: params.attributes.category,
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
  public toPrimitives(): SerieDeletedDomainEventAttributes {
    return {
      category: this.category,
      title: this.title,
      releaseDate: this.releaseDate
    }
  }
}
