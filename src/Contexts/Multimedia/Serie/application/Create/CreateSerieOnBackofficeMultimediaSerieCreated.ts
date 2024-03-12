import { BackofficeMultimediaSerieCreatedDomainEvent } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieCreatedDomainEvent'
import { type DomainEventSubscriber } from '@Shared/domain/DomainEventSubscriber'
import { type SerieCreator } from './SerieCreator'
import { type DomainEventClass } from '@Shared/domain/DomainEvent'

/**
 * Event subscriber for creating a serie when a backoffice multimedia serie is created.
 */
export class CreateSerieOnBackofficeMultimediaSerieCreated
  implements DomainEventSubscriber<BackofficeMultimediaSerieCreatedDomainEvent>
{
  constructor(private readonly creator: SerieCreator) {}

  /**
   * Returns an array of domain event classes that this subscriber is subscribed to.
   *
   * @returns An array containing the class for the subscribed domain event (BackofficeMultimediaSerieCreatedDomainEvent).
   */
  public subscribedTo(): DomainEventClass[] {
    return [BackofficeMultimediaSerieCreatedDomainEvent]
  }

  /**
   * Handles the domain event triggered when a backoffice multimedia serie is created.
   *
   * @param domainEvent - The domain event instance.
   */
  public async on(
    domainEvent: BackofficeMultimediaSerieCreatedDomainEvent
  ): Promise<void> {
    const { aggregateId, title, releaseYear, synopsis, categories } =
      domainEvent

    await this.creator.run(
      aggregateId,
      title,
      releaseYear,
      synopsis,
      categories
    )
  }
}
