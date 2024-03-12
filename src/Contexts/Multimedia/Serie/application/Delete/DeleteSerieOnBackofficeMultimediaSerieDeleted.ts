import { BackofficeMultimediaSerieDeletedDomainEvent } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieDeletedDomainEvent'
import { type SerieDeletor } from './SerieDeletor'
import { type DomainEventSubscriber } from '@Shared/domain/DomainEventSubscriber'
import { type DomainEventClass } from '@Shared/domain/DomainEvent'

/**
 * Event subscriber for deleting a serie when a backoffice multimedia serie is deleted.
 */
export class DeleteSerieOnBackofficeMultimediaSerieDeleted
  implements DomainEventSubscriber<BackofficeMultimediaSerieDeletedDomainEvent>
{
  constructor(private readonly deletor: SerieDeletor) {}

  public subscribedTo(): DomainEventClass[] {
    return [BackofficeMultimediaSerieDeletedDomainEvent]
  }

  public async on(
    domainEvent: BackofficeMultimediaSerieDeletedDomainEvent
  ): Promise<void> {
    await this.deletor.run(domainEvent.aggregateId)
  }
}
