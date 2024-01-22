import { type BackofficeMultimediaChapter } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapter'
import { BackofficeMultimediaChapterCreatedDomainEvent } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterCreatedDomainEvent'
/**
 * Factory class for creating instances of `BackofficeMultimediaChapterCreatedDomainEvent` for testing.
 */
export class BackofficeMultimediaChapterCreatedDomainEventMother {
  /**
   * Creates a `BackofficeMultimediaChapterCreatedDomainEvent` with the specified values.
   *
   * @param params - The parameters to create the event.
   * @returns An instance of `BackofficeMultimediaChapterCreatedDomainEvent`.
   */
  public static create({
    aggregateId,
    title,
    releaseYear,
    season,
    video,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    title: string
    releaseYear: number
    season: string
    video: string
    eventId?: string
    occurredOn?: Date
  }): BackofficeMultimediaChapterCreatedDomainEvent {
    return new BackofficeMultimediaChapterCreatedDomainEvent({
      aggregateId,
      title,
      releaseYear,
      season,
      video,
      eventId,
      occurredOn
    })
  }

  /**
   * Creates a `BackofficeMultimediaChapterCreatedDomainEvent` from the specified chapter.
   *
   * @param chapter - The `BackofficeMultimediaSeason` to create the event from.
   * @returns An instance of `BackofficeMultimediaChapterCreatedDomainEvent`.
   */
  public static from(
    chapter: BackofficeMultimediaChapter
  ): BackofficeMultimediaChapterCreatedDomainEvent {
    return this.create({
      aggregateId: chapter.id.value,
      title: chapter.title.value,
      releaseYear: chapter.releaseYear.value,
      season: chapter.season.value,
      video: chapter.video.value
    })
  }
}
