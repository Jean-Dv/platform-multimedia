import { BackofficeMultimediaSeasonCreatedDomainEvent } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonCreatedDomainEvent'
import { type DomainEventSubscriber } from '@Shared/domain/DomainEventSubscriber'
import { type SeasonCreator } from './SeasonCreator'
import { type DomainEventClass } from '@Shared/domain/DomainEvent'

/**
 * Event subscriber for creating a season when a backoffice multimedia season is created.
 */
export class CreateSeasonOnBackofficeMultimediaSeasonCreated
  implements
    DomainEventSubscriber<BackofficeMultimediaSeasonCreatedDomainEvent>
{
  constructor(private readonly creator: SeasonCreator) {}

  public subscribedTo(): DomainEventClass[] {
    return [BackofficeMultimediaSeasonCreatedDomainEvent]
  }

  public async on(
    domainEvent: BackofficeMultimediaSeasonCreatedDomainEvent
  ): Promise<void> {
    const { aggregateId, serie: serieId, title, releaseYear } = domainEvent

    await this.creator.run(aggregateId, serieId, title, releaseYear)
  }
}
