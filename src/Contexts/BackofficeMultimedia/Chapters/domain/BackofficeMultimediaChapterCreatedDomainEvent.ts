import { DomainEvent } from '@Shared/domain/DomainEvent'

interface CreateBackofficeMultimediaChapterDomainEventAttributes {
  readonly title: string
  readonly releaseYear: number
  readonly season: string
  readonly video: string
}

/**
 * This class is used to represents the domain which is published when a new Backoffice chapter is created.
 */
export class BackofficeMultimediaChapterCreatedDomainEvent extends DomainEvent {
  public static readonly EVENT_NAME = 'backoffice.multimedia.chapter.created'

  public readonly title: string
  public readonly releaseYear: number
  public readonly season: string
  public readonly video: string

  constructor({
    aggregateId,
    title,
    releaseYear,
    season,
    video,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    title: string
    releaseYear: number
    season: string
    video: string
    eventId?: string
    occurredOn?: Date
  }) {
    super({
      eventName: BackofficeMultimediaChapterCreatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    })
    this.title = title
    this.releaseYear = releaseYear
    this.season = season
    this.video = video
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
    attributes: CreateBackofficeMultimediaChapterDomainEventAttributes
  }): DomainEvent {
    return new BackofficeMultimediaChapterCreatedDomainEvent({
      aggregateId: params.aggregateId,
      title: params.attributes.title,
      releaseYear: params.attributes.releaseYear,
      season: params.attributes.season,
      video: params.attributes.video,
      eventId: params.eventId,
      occurredOn: params.occurredOn
    })
  }

  /**
   * This method returns the attributes of this domain event as a plain object.
   *
   * @returns The plain object containing the attributes of the domain event.
   */
  public toPrimitives(): CreateBackofficeMultimediaChapterDomainEventAttributes {
    return {
      title: this.title,
      releaseYear: this.releaseYear,
      season: this.season,
      video: this.video
    }
  }
}
