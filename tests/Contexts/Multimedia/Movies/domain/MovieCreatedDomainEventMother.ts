import { type Movie } from '@Multimedia/Movies/domain/Movie'
import { MovieCreatedDomainEvent } from '@Multimedia/Movies/domain/MovieCreatedDomainEvent'

export class MovieCreatedDomainEventMother {
  public static create({
    aggregateId,
    eventId,
    title,
    releaseDate,
    url,
    duration,
    occurredOn
  }: {
    aggregateId: string
    eventId?: string
    title: string
    releaseDate: Date
    url: string
    duration: number
    occurredOn?: Date
  }): MovieCreatedDomainEvent {
    return new MovieCreatedDomainEvent({
      aggregateId,
      eventId,
      title,
      releaseDate,
      url,
      duration,
      occurredOn
    })
  }

  public static fromMovie(movie: Movie): MovieCreatedDomainEvent {
    return this.create({
      aggregateId: movie.id.value,
      title: movie.title.value,
      releaseDate: movie.releaseDate.value,
      url: movie.url.value,
      duration: movie.duration.value
    })
  }
}
