import { type BackofficeMultimediaMovie } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovie'
import { BackofficeMultimediaMovieDeletedDomainEvent } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieDeletedDomainEvent'

/**
 * Factory class for creating instances of `BackofficeMultimediaMovieDeletedDomainEvent` for testing.
 */
export class BackofficeMultimediaMovieDeletedDomainEventMother {
  /**
   * Creates a `BackofficeMultimediaMovieDeletedDomainEvent` with the specified values.
   *
   * @param params - The parameters to create the event.
   * @returns An instance of `BackofficeMultimediaMovieDeletedDomainEvent`.
   */
  public static create({
    aggregateId,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    eventId?: string
    occurredOn?: Date
  }): BackofficeMultimediaMovieDeletedDomainEvent {
    return new BackofficeMultimediaMovieDeletedDomainEvent({
      aggregateId,
      eventId,
      occurredOn
    })
  }

  /**
   * Creates a `BackofficeMultimediaMovieDeletedDomainEvent` from the specified movie.
   *
   * @param movie - The `BackofficeMultimediaMovie` to create the event from.
   * @returns An instance of `BackofficeMultimediaMovieDeletedDomainEvent`.
   */
  public static from(
    movie: BackofficeMultimediaMovie
  ): BackofficeMultimediaMovieDeletedDomainEvent {
    return new BackofficeMultimediaMovieDeletedDomainEvent({
      aggregateId: movie.id.value
    })
  }
}
