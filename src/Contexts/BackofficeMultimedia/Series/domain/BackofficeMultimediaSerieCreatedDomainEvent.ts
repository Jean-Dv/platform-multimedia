import { DomainEvent } from '@Shared/domain/DomainEvent'

interface CreateBackofficeMultimediaSerieDomainEventAttributes {
  readonly title: string
  readonly releaseYear: number
  readonly synopsis: string
  readonly categories: string[]
}

/**
 * This class is used to represent the domain which is emitted when a serie is created.
 */
export class BackofficeMultimediaSerieCreatedDomainEvent extends DomainEvent {
  public static readonly EVENT_NAME = 'backoffice.multimedia.serie.created'

  public readonly title: string
  public readonly releaseYear: number
  public readonly synopsis: string
  public readonly categories: string[] = []

  constructor({
    aggregateId,
    title,
    releaseYear,
    synopsis,
    categories,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    title: string
    releaseYear: number
    synopsis: string
    categories: string[]
    eventId?: string
    occurredOn?: Date
  }) {
    super({
      eventName: BackofficeMultimediaSerieCreatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    })
    this.title = title
    this.releaseYear = releaseYear
    this.synopsis = synopsis
    this.categories = categories
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
    attributes: CreateBackofficeMultimediaSerieDomainEventAttributes
  }): BackofficeMultimediaSerieCreatedDomainEvent {
    return new BackofficeMultimediaSerieCreatedDomainEvent({
      aggregateId: params.aggregateId,
      title: params.attributes.title,
      releaseYear: params.attributes.releaseYear,
      synopsis: params.attributes.synopsis,
      categories: params.attributes.categories,
      eventId: params.eventId,
      occurredOn: params.occurredOn
    })
  }

  /**
   * This method returns the attributes of this domain event in a primitive form.
   *
   * @returns The attributes of this domain event.
   */
  public toPrimitives(): CreateBackofficeMultimediaSerieDomainEventAttributes {
    return {
      title: this.title,
      releaseYear: this.releaseYear,
      synopsis: this.synopsis,
      categories: this.categories
    }
  }
}
