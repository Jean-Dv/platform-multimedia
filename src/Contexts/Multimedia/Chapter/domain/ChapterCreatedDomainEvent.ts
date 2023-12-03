import { DomainEvent } from '@Shared/domain/DomainEvent'

interface CreateChapterDomainEventAttributes {
  seasonId: string
  title: string
  releaseDate: Date
  duration: number
}

/**
 * This class is used to represent the domain event
 * wich is emitted when a chapter is created.
 */
export class ChapterCreatedDomainEvent extends DomainEvent {
  public static readonly EVENT_NAME = 'chapter.created'

  public readonly seasonId: string
  public readonly title: string
  public readonly releaseDate: Date
  public readonly duration: number

  constructor({
    aggregateId,
    seasonId,
    title,
    releaseDate,
    duration,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    seasonId: string
    title: string
    releaseDate: Date
    duration: number
    eventId?: string
    occurredOn?: Date
  }) {
    super({
      eventName: ChapterCreatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    })
    this.seasonId = seasonId
    this.title = title
    this.releaseDate = releaseDate
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
    attributes: CreateChapterDomainEventAttributes
  }): DomainEvent {
    return new ChapterCreatedDomainEvent({
      aggregateId: params.aggregateId,
      seasonId: params.attributes.seasonId,
      title: params.attributes.title,
      releaseDate: params.attributes.releaseDate,
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
  public toPrimitives(): CreateChapterDomainEventAttributes {
    return {
      seasonId: this.seasonId,
      title: this.title,
      releaseDate: this.releaseDate,
      duration: this.duration
    }
  }
}
