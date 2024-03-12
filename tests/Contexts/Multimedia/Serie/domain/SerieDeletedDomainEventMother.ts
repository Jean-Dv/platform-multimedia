import { type Serie } from '@Multimedia/Serie/domain/Serie'
import { SerieDeletedDomainEvent } from '@Multimedia/Serie/domain/SerieDeletedDomainEvent'

export class SerieDeletedDomainEventMother {
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
  }): SerieDeletedDomainEvent {
    return new SerieDeletedDomainEvent({
      aggregateId,
      eventId,
      category,
      title,
      releaseDate,
      occurredOn
    })
  }

  public static fromSerie(serie: Serie): SerieDeletedDomainEvent {
    return this.create({
      aggregateId: serie.id.value,
      category: serie.category.value,
      title: serie.title.value,
      releaseDate: serie.releaseDate.value
    })
  }
}
