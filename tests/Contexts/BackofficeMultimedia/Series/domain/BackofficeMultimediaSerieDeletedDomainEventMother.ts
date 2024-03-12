import { type BackofficeMultimediaSerie } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerie'
import { BackofficeMultimediaSerieDeletedDomainEvent } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieDeletedDomainEvent'

/**
 * Factory class for creating instances of `BackofficeMultimediaSerieDeletedDomainEvent` for testing.
 */
export class BackofficeMultimediaSerieDeletedDomainEventMother {
  /**
   * Creates a `BackofficeMultimediaSerieDeletedDomainEvent` with the specified values.
   *
   * @param params - The parameters to create the event.
   * @returns An instance of `BackofficeMultimediaSerieDeletedDomainEvent`.
   */
  public static create({
    aggregateId,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    eventId?: string
    occurredOn?: Date
  }): BackofficeMultimediaSerieDeletedDomainEvent {
    return new BackofficeMultimediaSerieDeletedDomainEvent({
      aggregateId,
      eventId,
      occurredOn
    })
  }

  /**
   * Creates a `BackofficeMultimediaSerieDeletedDomainEvent` from the specified serie.
   *
   * @param serie - The `BackofficeMultimediaSerie` to create the event from.
   * @returns An instance of `BackofficeMultimediaSerieDeletedDomainEvent`.
   */
  public static from(
    serie: BackofficeMultimediaSerie
  ): BackofficeMultimediaSerieDeletedDomainEvent {
    return new BackofficeMultimediaSerieDeletedDomainEvent({
      aggregateId: serie.id.value
    })
  }
}
