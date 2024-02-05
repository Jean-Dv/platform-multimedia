import { type BackofficeMultimediaSeason } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeason'
import { BackofficeMultimediaSeasonCreatedDomainEvent } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonCreatedDomainEvent'

/**
 * Factory class for creating instances of `BackofficeMultimediaSeasonCreatedDomainEvent` for testing.
 */
export class BackofficeMultimediaSeasonCreatedDomainEventMother {
  /**
   * Creates a `BackofficeMultimediaSeasonCreatedDomainEvent` with the specified values.
   *
   * @param params - The parameters to create the event.
   * @returns An instance of `BackofficeMultimediaSeasonCreatedDomainEvent`.
   */
  public static create({
    aggregateId,
    title,
    releaseYear,
    serie,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    title: string
    releaseYear: number
    serie: string
    eventId?: string
    occurredOn?: Date
  }): BackofficeMultimediaSeasonCreatedDomainEvent {
    return new BackofficeMultimediaSeasonCreatedDomainEvent({
      aggregateId,
      title,
      releaseYear,
      serie,
      eventId,
      occurredOn
    })
  }

  /**
   * Creates a `BackofficeMultimediaSeasonCreatedDomainEvent` from the specified season.
   *
   * @param season - The `BackofficeMultimediaSeason` to create the event from.
   * @returns An instance of `BackofficeMultimediaSeasonCreatedDomainEvent`.
   */
  public static from(
    season: BackofficeMultimediaSeason
  ): BackofficeMultimediaSeasonCreatedDomainEvent {
    return this.create({
      aggregateId: season.id.value,
      title: season.title.value,
      releaseYear: season.releaseYear.value,
      serie: season.serie.value
    })
  }
}
