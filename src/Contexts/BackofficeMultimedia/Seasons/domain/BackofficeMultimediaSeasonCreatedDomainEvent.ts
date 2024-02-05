import { DomainEvent } from '@Shared/domain/DomainEvent'

interface CreateBackofficeMultimediaSeasonDomainEventAttributes {
  readonly title: string
  readonly releaseYear: number
  readonly serie: string
}

/**
 * This class is used to represent the domain which is emitted when a season is created.
 */
export class BackofficeMultimediaSeasonCreatedDomainEvent extends DomainEvent {
  public static readonly EVENT_NAME = 'backoffice.multimedia.season.created'

  public readonly title: string
  public readonly releaseYear: number
  public readonly serie: string

  constructor({
    aggregateId,
    title,
    releaseYear,
    serie,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    title: string
    releaseYear: number
    serie: string
    eventId?: string
    occurredOn?: Date
  }) {
    super({
      eventName: BackofficeMultimediaSeasonCreatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    })
    this.title = title
    this.releaseYear = releaseYear
    this.serie = serie
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
    attributes: CreateBackofficeMultimediaSeasonDomainEventAttributes
  }): DomainEvent {
    return new BackofficeMultimediaSeasonCreatedDomainEvent({
      aggregateId: params.aggregateId,
      title: params.attributes.title,
      releaseYear: params.attributes.releaseYear,
      serie: params.attributes.serie,
      eventId: params.eventId,
      occurredOn: params.occurredOn
    })
  }

  /**
   * This method returns the attributes of this domain event as a plain object.
   *
   * @returns The plain object containing the attributes of the domain event.
   */
  public toPrimitives(): CreateBackofficeMultimediaSeasonDomainEventAttributes {
    return {
      title: this.title,
      releaseYear: this.releaseYear,
      serie: this.serie
    }
  }
}
