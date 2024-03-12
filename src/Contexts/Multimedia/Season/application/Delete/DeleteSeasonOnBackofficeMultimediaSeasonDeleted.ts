import { BackofficeMultimediaSeasonDeletedDomainEvent } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonDeletedDomainEvent'
import { type DomainEventSubscriber } from '@Shared/domain/DomainEventSubscriber'
import { type SeasonDeletor } from './SeasonDeletor'
import { type DomainEventClass } from '@Shared/domain/DomainEvent'

/**
 * Event subscriber for deleting a season when a backoffice multimedia season is deleted.
 */
export class DeleteSeasonOnBackofficeMultimediaSeasonDeleted
  implements
    DomainEventSubscriber<BackofficeMultimediaSeasonDeletedDomainEvent>
{
  constructor(private readonly deletor: SeasonDeletor) {}

  public subscribedTo(): DomainEventClass[] {
    return [BackofficeMultimediaSeasonDeletedDomainEvent]
  }

  public async on(
    domainEvent: BackofficeMultimediaSeasonDeletedDomainEvent
  ): Promise<void> {
    await this.deletor.run(domainEvent.aggregateId)
  }
}
