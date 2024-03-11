import { type BackofficeMultimediaChapter } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapter'
import { BackofficeMultimediaChapterDeletedDomainEvent } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterDeletedDomainEvent'

/**
 * Factory class for creating instances of `BackofficeMultimediaChapterDeletedDomainEvent` for testing.
 */
export class BackofficeMultimediaChapterDeletedDomainEventMother {
  /**
   * Creates a `BackofficeMultimediaChapterDeletedDomainEvent` with the specified values.
   *
   * @param params - The parameters to create the event.
   * @returns An instance of `BackofficeMultimediaChapterDeletedDomainEvent`.
   */
  public static create({
    aggregateId,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    eventId?: string
    occurredOn?: Date
  }): BackofficeMultimediaChapterDeletedDomainEvent {
    return new BackofficeMultimediaChapterDeletedDomainEvent({
      aggregateId,
      eventId,
      occurredOn
    })
  }

  /**
   * Creates a `BackofficeMultimediaChapterDeletedDomainEvent` from the specified chapter.
   *
   * @param chapter - The `BackofficeMultimediaSeason` to create the event from.
   * @returns An instance of `BackofficeMultimediaChapterDeletedDomainEvent`.
   */
  public static from(
    chapter: BackofficeMultimediaChapter
  ): BackofficeMultimediaChapterDeletedDomainEvent {
    return new BackofficeMultimediaChapterDeletedDomainEvent({
      aggregateId: chapter.id.value
    })
  }
}
