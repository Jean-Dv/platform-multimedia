import { type DomainEventSubscriber } from '@Shared/domain/DomainEventSubscriber'
import { type MovieDeletor } from './MovieDeletor'
import { type DomainEventClass } from '@Shared/domain/DomainEvent'
import { BackofficeMultimediaMovieDeletedDomainEvent } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieDeletedDomainEvent'

/**
 * Event subscriber for deleting a movie when a backoffice multimedia movie is deleted.
 */
export class DeleteMovieOnBackofficeMultimediaMovieDeleted
  implements DomainEventSubscriber<BackofficeMultimediaMovieDeletedDomainEvent>
{
  constructor(private readonly deletor: MovieDeletor) {}

  public subscribedTo(): DomainEventClass[] {
    return [BackofficeMultimediaMovieDeletedDomainEvent]
  }

  public async on(
    domainEvent: BackofficeMultimediaMovieDeletedDomainEvent
  ): Promise<void> {
    await this.deletor.run(domainEvent.aggregateId)
  }
}
