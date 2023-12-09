import { DomainEvent } from '@Shared/domain/DomainEvent'

interface CreateMovieDomainEventAttributes {
  readonly category: string
  readonly title: string
  readonly releaseDate: Date
  readonly url: string
  readonly duration: number
}

/**
 * This class is used to represent the domain event
 * which is emitted when a movie is created.
 */
export class MovieCreatedDomainEvent extends DomainEvent {
  public static readonly EVENT_NAME = 'movie.created'

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
      eventName: MovieCreatedDomainEvent.EVENT_NAME,
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
    attributes: CreateMovieDomainEventAttributes
  }): DomainEvent {
    return new MovieCreatedDomainEvent({
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

  /**
   * This method returns the attributes of the domain event
   * in a primitive form.
   *
   * @returns The attributes of the domain event.
   */
  public toPrimitives(): CreateMovieDomainEventAttributes {
    return {
      category: this.category,
      title: this.title,
      releaseDate: this.releaseDate,
      url: this.url,
      duration: this.duration
    }
  }
}
