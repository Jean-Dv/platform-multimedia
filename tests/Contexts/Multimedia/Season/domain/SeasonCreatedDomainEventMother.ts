import { type Season } from '@Multimedia/Season/domain/Season'
import { SeasonCreatedDomainEvent } from '@Multimedia/Season/domain/SeasonCreatedDomainEvent'

export class SeasonCreatedDomainEventMother {
  public static create({
    aggregateId,
    eventId,
    serieId,
    title,
    releaseDate,
    occurredOn
  }: {
    aggregateId: string
    eventId?: string
    serieId: string
    title: string
    releaseDate: Date
    occurredOn?: Date
  }): SeasonCreatedDomainEvent {
    return new SeasonCreatedDomainEvent({
      aggregateId,
      eventId,
      serieId,
      title,
      releaseDate,
      occurredOn
    })
  }

  public static fromSeason(season: Season): SeasonCreatedDomainEvent {
    return this.create({
      aggregateId: season.id.value,
      serieId: season.serieId.value,
      title: season.title.value,
      releaseDate: season.releaseDate.value
    })
  }
}
