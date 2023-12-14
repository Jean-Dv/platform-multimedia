import { SerieDeletedDomainEvent } from '@Multimedia/Serie/domain/SerieDeletedDomainEvent'
import { type DomainEventSubscriber } from '@Shared/domain/DomainEventSubscriber'
import { type SeasonDeletor } from './SeasonDeletor'
import { type DomainEventClass } from '@Shared/domain/DomainEvent'

export class DeleteSeasonOnSerieDeleted
  implements DomainEventSubscriber<SerieDeletedDomainEvent>
{
  constructor(private readonly deleter: SeasonDeletor) {}

  public subscribedTo(): DomainEventClass[] {
    return [SerieDeletedDomainEvent]
  }

  public async on(domainEvent: SerieDeletedDomainEvent): Promise<void> {
    const { aggregateId } = domainEvent
    await this.deleter.run(aggregateId)
  }
}
