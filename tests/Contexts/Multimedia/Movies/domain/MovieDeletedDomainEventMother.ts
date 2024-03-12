import { type Movie } from '@Multimedia/Movies/domain/Movie'
import { MovieDeletedDomainEvent } from '@Multimedia/Movies/domain/MovieDeletedDomainEvent'

export class MovieDeletedDomainEventMother {
  public static create({
    aggregateId,
    eventId,
    category,
    title,
    releaseDate,
    url,
    duration,
    occurredOn
  }: {
    aggregateId: string
    eventId?: string
    category: string
    title: string
    releaseDate: Date
    url: string
    duration: number
    occurredOn?: Date
  }): MovieDeletedDomainEvent {
    return new MovieDeletedDomainEvent({
      aggregateId,
      eventId,
      category,
      title,
      releaseDate,
      url,
      duration,
      occurredOn
    })
  }

  public static fromMovie(movie: Movie): MovieDeletedDomainEvent {
    return this.create({
      aggregateId: movie.id.value,
      category: movie.category.value,
      title: movie.title.value,
      releaseDate: movie.releaseDate.value,
      url: movie.url.value,
      duration: movie.duration.value
    })
  }
}
