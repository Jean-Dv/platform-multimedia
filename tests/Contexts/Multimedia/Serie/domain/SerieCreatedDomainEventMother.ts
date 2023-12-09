import { type Serie } from '@Multimedia/Serie/domain/Serie'
import { SerieCreatedDomainEvent } from '@Multimedia/Serie/domain/SerieCreatedDomainEvent'

export class SerieCreatedDomainEventMother {
  public static create({
    aggregateId,
    eventId,
    category,
    title,
    releaseDate,
    occurredOn
  }: {
    aggregateId: string
    eventId?: string
    category: string
    title: string
    releaseDate: Date
    occurredOn?: Date
  }): SerieCreatedDomainEvent {
    return new SerieCreatedDomainEvent({
      aggregateId,
      eventId,
      category,
      title,
      releaseDate,
      occurredOn
    })
  }

  public static fromSerie(serie: Serie): SerieCreatedDomainEvent {
    return this.create({
      aggregateId: serie.id.value,
      category: serie.category.value,
      title: serie.title.value,
      releaseDate: serie.releaseDate.value
    })
  }
}
