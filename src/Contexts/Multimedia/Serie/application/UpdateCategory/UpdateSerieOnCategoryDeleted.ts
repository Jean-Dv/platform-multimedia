import { CategoryDeletedDomainEvent } from '@Multimedia/Categories/domain/CategoryDeletedDomainEvent'
import { type DomainEventSubscriber } from '@Shared/domain/DomainEventSubscriber'
import { type SerieUpdaterCategory } from './SerieUpdaterCategory'
import { type DomainEventClass } from '@Shared/domain/DomainEvent'

export class UpdateSerieOnCategoryDeleted
  implements DomainEventSubscriber<CategoryDeletedDomainEvent>
{
  constructor(private readonly updater: SerieUpdaterCategory) {}
  public subscribedTo(): DomainEventClass[] {
    return [CategoryDeletedDomainEvent]
  }

  public async on(domainEvent: CategoryDeletedDomainEvent): Promise<void> {
    const { name } = domainEvent
    await this.updater.run(name)
  }
}
