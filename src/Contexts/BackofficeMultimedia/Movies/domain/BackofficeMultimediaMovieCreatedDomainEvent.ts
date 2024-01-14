import { DomainEvent } from '@Shared/domain/DomainEvent'

interface CreateBackofficeMultimediaMovieDomainEventAttributes {
  readonly title: string
  readonly releaseYear: number
  readonly synopsis: string
  readonly videoId: string
}

/**
 * This class is used to represent the domain which is emitted when a movie is created.
 */
export class BackofficeMultimediaMovieCreatedDomainEvent extends DomainEvent {
  public static readonly EVENT_NAME = 'backoffice.multimedia.movie.created'

  public readonly title: string
  public readonly releaseYear: number
  public readonly synopsis: string
  public readonly videoId: string

  constructor({
    aggregateId,
    title,
    releaseYear,
    synopsis,
    videoId,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    title: string
    releaseYear: number
    synopsis: string
    videoId: string
    eventId?: string
    occurredOn?: Date
  }) {
    super({
      eventName: BackofficeMultimediaMovieCreatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    })
    this.title = title
    this.releaseYear = releaseYear
    this.synopsis = synopsis
    this.videoId = videoId
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
    attributes: CreateBackofficeMultimediaMovieDomainEventAttributes
  }): DomainEvent {
    return new BackofficeMultimediaMovieCreatedDomainEvent({
      aggregateId: params.aggregateId,
      title: params.attributes.title,
      releaseYear: params.attributes.releaseYear,
      synopsis: params.attributes.synopsis,
      videoId: params.attributes.videoId,
      eventId: params.eventId,
      occurredOn: params.occurredOn
    })
  }

  /**
   * This method returns the attributes of the domain event in a primitive form.
   *
   * @returns The plain object containing the movie information.
   */
  public toPrimitives(): CreateBackofficeMultimediaMovieDomainEventAttributes {
    return {
      title: this.title,
      releaseYear: this.releaseYear,
      synopsis: this.synopsis,
      videoId: this.videoId
    }
  }
}
