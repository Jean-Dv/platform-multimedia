import { type BackofficeMultimediaVideo } from '@BackofficeMultimedia/Videos/domain/BackofficeMultimediaVideo'
import { BackofficeMultimediaVideoCreatedDomainEvent } from '@BackofficeMultimedia/Videos/domain/BackofficeMultimediaVideoCreatedDomainEvent'

/**
 * Factory class for creating instances of `BackofficeMultimediaVideoCreatedDomainEvent` for testing.
 */
export class BackofficeMultimediaVideoCreatedDomainEventMother {
  /**
   * Creates a `BackofficeMultimediaVideoCreatedDomainEvent` with the specified values.
   *
   * @param params - The parameters to create the event.
   * @returns An instance of `BackofficeMultimediaVideoCreatedDomainEvent`.
   */
  public static create({
    aggregateId,
    path,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    path: string
    eventId?: string
    occurredOn?: Date
  }): BackofficeMultimediaVideoCreatedDomainEvent {
    return new BackofficeMultimediaVideoCreatedDomainEvent({
      aggregateId,
      path,
      eventId,
      occurredOn
    })
  }

  /**
   * Creates a `BackofficeMultimediaVideoCreatedDomainEvent` from the specified video.
   *
   * @param video - The `BackofficeMultimediaVideo` to create the event from.
   * @returns An instance of `BackofficeMultimediaVideoCreatedDomainEvent`.
   */
  public static from(
    video: BackofficeMultimediaVideo
  ): BackofficeMultimediaVideoCreatedDomainEvent {
    return this.create({
      aggregateId: video.id.value,
      path: video.path.value
    })
  }
}
