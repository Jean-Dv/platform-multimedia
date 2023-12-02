import { DomainEvent } from '@Shared/domain/DomainEvent'

interface SeasonCreatedDomainEventAttributes {
  serieId: string
  title: string
  releaseDate: Date
}

/**
 * This class is used to represent the domain event
 * wich is emitted when a season is created.
 */
export class SeasonCreatedDomainEvent extends DomainEvent {
  public static readonly EVENT_NAME = 'season.created'

  public readonly serieId: string
  public readonly title: string
  public readonly releaseDate: Date

  constructor({
    aggregateId,
    serieId,
    title,
    releaseDate,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    serieId: string
    title: string
    releaseDate: Date
    eventId?: string
    occurredOn?: Date
  }) {
    super({
      eventName: SeasonCreatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    })
    this.serieId = serieId
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
    attributes: SeasonCreatedDomainEventAttributes
  }): SeasonCreatedDomainEvent {
    return new SeasonCreatedDomainEvent({
      aggregateId: params.aggregateId,
      serieId: params.attributes.serieId,
      title: params.attributes.title,
      releaseDate: params.attributes.releaseDate,
      eventId: params.eventId,
      occurredOn: params.occurredOn
    })
  }

  /**
   * This method returns the attributes of the domain event
   * in a primitive form.
   *
   * @returns The attributes of the domain event.
   */
  public toPrimitives(): SeasonCreatedDomainEventAttributes {
    return {
      serieId: this.serieId,
      title: this.title,
      releaseDate: this.releaseDate
    }
  }
}
