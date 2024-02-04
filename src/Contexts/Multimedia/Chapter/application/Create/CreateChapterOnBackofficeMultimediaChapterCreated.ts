import { BackofficeMultimediaChapterCreatedDomainEvent } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterCreatedDomainEvent'
import { type DomainEventSubscriber } from '@Shared/domain/DomainEventSubscriber'
import { type ChapterCreator } from './ChapterCreator'
import { type DomainEventClass } from '@Shared/domain/DomainEvent'

/**
 * Event subscriber for creating a chapter when a backoffice multimedia chapter is created.
 */
export class CreateChapterOnBackofficeMultimediaChapterCreated
  implements
    DomainEventSubscriber<BackofficeMultimediaChapterCreatedDomainEvent>
{
  constructor(private readonly creator: ChapterCreator) {}

  public subscribedTo(): DomainEventClass[] {
    return [BackofficeMultimediaChapterCreatedDomainEvent]
  }

  public async on(
    domainEvent: BackofficeMultimediaChapterCreatedDomainEvent
  ): Promise<void> {
    const { aggregateId, title, releaseYear, season, video } = domainEvent

    await this.creator.run(aggregateId, title, releaseYear, season, video)
  }
}
