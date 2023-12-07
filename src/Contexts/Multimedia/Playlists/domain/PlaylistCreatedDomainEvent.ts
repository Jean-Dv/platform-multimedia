import { DomainEvent } from '@Shared/domain/DomainEvent'

interface CreatePlaylistDomainEventAttributes {
  readonly name: string
  readonly userId: string
  readonly seriesIds: string[]
  readonly moviesIds: string[]
}

export class PlaylistCreatedDomainEvent extends DomainEvent {
  public static readonly EVENT_NAME = 'playlist.created'

  public readonly name: string
  public readonly userId: string
  public readonly seriesIds: string[]
  public readonly moviesIds: string[]

  constructor({
    aggregateId,
    name,
    userId,
    seriesIds,
    moviesIds,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    name: string
    userId: string
    seriesIds: string[]
    moviesIds: string[]
    eventId?: string
    occurredOn?: Date
  }) {
    super({
      eventName: PlaylistCreatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    })
    this.name = name
    this.userId = userId
    this.seriesIds = seriesIds
    this.moviesIds = moviesIds
  }

  public static fromPrimitives(params: {
    aggregateId: string
    eventId: string
    occurredOn: Date
    attributes: CreatePlaylistDomainEventAttributes
  }): DomainEvent {
    return new PlaylistCreatedDomainEvent({
      aggregateId: params.aggregateId,
      name: params.attributes.name,
      userId: params.attributes.userId,
      seriesIds: params.attributes.seriesIds,
      moviesIds: params.attributes.moviesIds,
      eventId: params.eventId,
      occurredOn: params.occurredOn
    })
  }

  public toPrimitives(): CreatePlaylistDomainEventAttributes {
    return {
      name: this.name,
      userId: this.userId,
      seriesIds: this.seriesIds,
      moviesIds: this.moviesIds
    }
  }
}
