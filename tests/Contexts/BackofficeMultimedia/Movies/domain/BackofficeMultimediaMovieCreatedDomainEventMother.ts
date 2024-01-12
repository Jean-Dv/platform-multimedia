import { type BackofficeMultimediaMovie } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovie'
import { BackofficeMultimediaMovieCreatedDomainEvent } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieCreatedDomainEvent'

/**
 * Factory class for creating instances of `BackofficeMultimediaMovieCreatedDomainEvent` for testing.
 */
export class BackofficeMultimediaMovieCreatedDomainEventMother {
  /**
   * Creates a `BackofficeMultimediaMovieCreatedDomainEvent` with the specified values.
   *
   * @param params - The parameters to create the event.
   * @returns An instance of `BackofficeMultimediaMovieCreatedDomainEvent`.
   */
  public static create({
    aggregateId,
    title,
    releaseYear,
    synopsis,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    title: string
    releaseYear: number
    synopsis: string
    eventId?: string
    occurredOn?: Date
  }): BackofficeMultimediaMovieCreatedDomainEvent {
    return new BackofficeMultimediaMovieCreatedDomainEvent({
      aggregateId,
      title,
      releaseYear,
      synopsis,
      eventId,
      occurredOn
    })
  }

  /**
   * Creates a `BackofficeMultimediaMovieCreatedDomainEvent` from the specified movie.
   *
   * @param movie - The `BackofficeMultimediaMovie` to create the event from.
   * @returns An instance of `BackofficeMultimediaMovieCreatedDomainEvent`.
   */
  public static from(
    movie: BackofficeMultimediaMovie
  ): BackofficeMultimediaMovieCreatedDomainEvent {
    return this.create({
      aggregateId: movie.id.value,
      title: movie.title.value,
      releaseYear: movie.releaseYear.value,
      synopsis: movie.synopsis.value
    })
  }
}
