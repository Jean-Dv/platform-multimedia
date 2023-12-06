import { type Chapter } from '@Multimedia/Chapter/domain/Chapter'
import { ChapterCreatedDomainEvent } from '@Multimedia/Chapter/domain/ChapterCreatedDomainEvent'

export class ChapterCreatedDomainEventMother {
  public static create({
    aggregateId,
    eventId,
    seasonId,
    title,
    releaseDate,
    url,
    duration,
    occurredOn
  }: {
    aggregateId: string
    eventId?: string
    seasonId: string
    title: string
    releaseDate: Date
    url: string
    duration: number
    occurredOn?: Date
  }): ChapterCreatedDomainEvent {
    return new ChapterCreatedDomainEvent({
      aggregateId,
      eventId,
      seasonId,
      title,
      releaseDate,
      url,
      duration,
      occurredOn
    })
  }

  public static fromChapter(chapter: Chapter): ChapterCreatedDomainEvent {
    return this.create({
      aggregateId: chapter.id.value,
      seasonId: chapter.seasonId.value,
      title: chapter.title.value,
      releaseDate: chapter.releaseDate.value,
      url: chapter.url.value,
      duration: chapter.duration.value
    })
  }
}
