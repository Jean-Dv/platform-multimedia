import { BackofficeMultimediaMovieCreatedDomainEvent } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieCreatedDomainEvent'
import { type DomainEventSubscriber } from '@Shared/domain/DomainEventSubscriber'
import { type MovieCreator } from './MovieCreator'
import { type DomainEventClass } from '@Shared/domain/DomainEvent'

/**
 * Event subscriber for creating a movie when a backoffice multimedia movie is created.
 */
export class CreateMovieOnBackofficeMultimediaMovieCreated
  implements DomainEventSubscriber<BackofficeMultimediaMovieCreatedDomainEvent>
{
  constructor(private readonly creator: MovieCreator) {}

  public subscribedTo(): DomainEventClass[] {
    return [BackofficeMultimediaMovieCreatedDomainEvent]
  }

  public async on(
    domainEvent: BackofficeMultimediaMovieCreatedDomainEvent
  ): Promise<void> {
    const { aggregateId, title, releaseYear, synopsis, categories, videoId } =
      domainEvent

    await this.creator.run(
      aggregateId,
      title,
      releaseYear,
      synopsis,
      categories,
      videoId
    )
  }
}
