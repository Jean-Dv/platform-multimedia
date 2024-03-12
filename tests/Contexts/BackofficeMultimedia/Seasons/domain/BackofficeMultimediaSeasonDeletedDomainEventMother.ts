import { type BackofficeMultimediaSeason } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeason'
import { BackofficeMultimediaSeasonDeletedDomainEvent } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonDeletedDomainEvent'

/**
 * Factory class for creating instances of `BackofficeMultimediaSeasonDeletedDomainEvent` for testing.
 */
export class BackofficeMultimediaSeasonDeletedDomainEventMother {
  /**
   * Creates a `BackofficeMultimediaSeasonDeletedDomainEvent` with the specified values.
   *
   * @param params - The parameters to create the event.
   * @returns An instance of `BackofficeMultimediaSeasonDeletedDomainEvent`.
   */
  public static create({
    aggregateId,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    eventId?: string
    occurredOn?: Date
  }): BackofficeMultimediaSeasonDeletedDomainEvent {
    return new BackofficeMultimediaSeasonDeletedDomainEvent({
      aggregateId,
      eventId,
      occurredOn
    })
  }

  /**
   * Creates a `BackofficeMultimediaSeasonDeletedDomainEvent` from the specified season.
   *
   * @param season - The `BackofficeMultimediaSeason` to create the event from.
   * @returns An instance of `BackofficeMultimediaSeasonDeletedDomainEvent`.
   */
  public static from(
    season: BackofficeMultimediaSeason
  ): BackofficeMultimediaSeasonDeletedDomainEvent {
    return new BackofficeMultimediaSeasonDeletedDomainEvent({
      aggregateId: season.id.value
    })
  }
}
