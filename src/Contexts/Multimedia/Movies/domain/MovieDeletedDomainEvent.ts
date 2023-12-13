import { DomainEvent } from '@Shared/domain/DomainEvent'

interface DeleteMovieDomainEventAttributes {
  readonly category: string
  readonly title: string
  readonly releaseDate: Date
  readonly url: string
  readonly duration: number
}

export class MovieDeletedDomainEvent extends DomainEvent {
  public static readonly EVENT_NAME = 'movie.deleted'

  public readonly category: string
  public readonly title: string
  public readonly releaseDate: Date
  public readonly url: string
  public readonly duration: number

  constructor({
    aggregateId,
    category,
    title,
    releaseDate,
    url,
    duration,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    category: string
    title: string
    releaseDate: Date
    url: string
    duration: number
    eventId?: string
    occurredOn?: Date
  }) {
    super({
      eventName: MovieDeletedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    })
    this.category = category
    this.title = title
    this.releaseDate = releaseDate
    this.url = url
    this.duration = duration
  }

  public static fromPrimitives(params: {
    aggregateId: string
    eventId: string
    occurredOn: Date
    attributes: DeleteMovieDomainEventAttributes
  }): DomainEvent {
    return new MovieDeletedDomainEvent({
      aggregateId: params.aggregateId,
      category: params.attributes.category,
      title: params.attributes.title,
      releaseDate: params.attributes.releaseDate,
      url: params.attributes.url,
      duration: params.attributes.duration,
      eventId: params.eventId,
      occurredOn: params.occurredOn
    })
  }

  public toPrimitives(): DeleteMovieDomainEventAttributes {
    return {
      category: this.category,
      title: this.title,
      releaseDate: this.releaseDate,
      url: this.url,
      duration: this.duration
    }
  }
}
