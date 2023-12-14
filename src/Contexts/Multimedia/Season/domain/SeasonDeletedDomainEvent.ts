import { DomainEvent } from '@Shared/domain/DomainEvent'

interface SeasonDeletedDomainEventAttributes {
  serieId: string
  title: string
  releaseDate: Date
}

export class SeasonDeletedDomainEvent extends DomainEvent {
  public static readonly EVENT_NAME = 'season.deleted'

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
      eventName: SeasonDeletedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    })
    this.serieId = serieId
    this.title = title
    this.releaseDate = releaseDate
  }

  public static fromPrimitives(params: {
    aggregateId: string
    eventId: string
    occurredOn: Date
    attributes: SeasonDeletedDomainEventAttributes
  }): SeasonDeletedDomainEvent {
    return new SeasonDeletedDomainEvent({
      aggregateId: params.aggregateId,
      serieId: params.attributes.serieId,
      title: params.attributes.title,
      releaseDate: params.attributes.releaseDate,
      eventId: params.eventId,
      occurredOn: params.occurredOn
    })
  }

  public toPrimitives(): SeasonDeletedDomainEventAttributes {
    return {
      serieId: this.serieId,
      title: this.title,
      releaseDate: this.releaseDate
    }
  }
}
