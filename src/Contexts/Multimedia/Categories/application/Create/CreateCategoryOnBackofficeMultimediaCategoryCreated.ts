import { BackofficeMultimediaCategoryCreatedDomainEvent } from '@BackofficeMultimedia/Categories/domain/BackofficeMultimediaCategoryCreatedDomainEvent'
import { type DomainEventSubscriber } from '@Shared/domain/DomainEventSubscriber'
import { type CategoryCreator } from './CategoryCreator'
import { type DomainEventClass } from '@Shared/domain/DomainEvent'

/**
 * Event subscriber for creating a category when a backoffice multimedia category is created.
 */
export class CreateCategoryOnBackofficeMultimediaCategoryCreated
  implements
    DomainEventSubscriber<BackofficeMultimediaCategoryCreatedDomainEvent>
{
  constructor(private readonly creator: CategoryCreator) {}

  /**
   * Returns an array of domain event classes that this subscriber is subscribed to.
   *
   * @returns An array containing the class for the subscribed domain event (BackofficeMultimediaCategoryCreatedDomainEvent).
   */
  public subscribedTo(): DomainEventClass[] {
    return [BackofficeMultimediaCategoryCreatedDomainEvent]
  }

  /**
   * Handles the domain event triggered when a backoffice multimedia category is created.
   *
   * @param domainEvent - The domain event instance.
   */
  public async on(
    domainEvent: BackofficeMultimediaCategoryCreatedDomainEvent
  ): Promise<void> {
    const { aggregateId, name } = domainEvent

    await this.creator.run(aggregateId, name)
  }
}
