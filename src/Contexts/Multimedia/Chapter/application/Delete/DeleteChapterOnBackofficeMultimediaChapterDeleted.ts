import { BackofficeMultimediaChapterDeletedDomainEvent } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterDeletedDomainEvent'
import { type DomainEventSubscriber } from '@Shared/domain/DomainEventSubscriber'
import { type ChapterDeletor } from './ChapterDeletor'
import { type DomainEventClass } from '@Shared/domain/DomainEvent'

/**
 * Event subscriber for deleting a chapter when a backoffice multimedia chapter is deleted.
 */
export class DeleteChapterOnBackofficeMultimediaChapterDeleted
  implements
    DomainEventSubscriber<BackofficeMultimediaChapterDeletedDomainEvent>
{
  constructor(private readonly deletor: ChapterDeletor) {}

  public subscribedTo(): DomainEventClass[] {
    return [BackofficeMultimediaChapterDeletedDomainEvent]
  }

  public async on(
    domainEvent: BackofficeMultimediaChapterDeletedDomainEvent
  ): Promise<void> {
    await this.deletor.run(domainEvent.aggregateId)
  }
}
