import { type Serie } from '@Multimedia/Serie/domain/Serie'
import { SerieCreatedDomainEvent } from '@Multimedia/Serie/domain/SerieCreatedDomainEvent'

export class SerieCreatedDomainEventMother {
  public static create({
    aggregateId,
    eventId,
    title,
    releaseDate,
    occurredOn
  }: {
    aggregateId: string
    eventId?: string
    title: string
    releaseDate: Date
    occurredOn?: Date
  }): SerieCreatedDomainEvent {
    return new SerieCreatedDomainEvent({
      aggregateId,
      eventId,
      title,
      releaseDate,
      occurredOn
    })
  }

  public static fromSerie(serie: Serie): SerieCreatedDomainEvent {
    return this.create({
      aggregateId: serie.id.value,
      title: serie.title.value,
      releaseDate: serie.releaseDate.value
    })
  }
}
