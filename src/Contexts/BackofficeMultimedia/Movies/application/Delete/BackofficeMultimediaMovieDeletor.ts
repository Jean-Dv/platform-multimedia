import { type BackofficeMultimediaMovieId } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieId'
import { BackofficeMultimediaMovieNotFound } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieNotFound'
import { type BackofficeMultimediaMovieRepository } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieRepository'
import { type EventBus } from '@Shared/domain/EventBus'

/**
 * Service for deleting backoffice multimedia movies.
 */
export class BackofficeMultimediaMovieDeletor {
  constructor(
    private readonly repository: BackofficeMultimediaMovieRepository,
    private readonly eventBus: EventBus
  ) {}

  /**
   * Runs the movie deletion process.
   *
   * @param id - The id of the movie to be deleted.
   */
  public async run(id: BackofficeMultimediaMovieId): Promise<void> {
    const chapter = await this.repository.search(id)
    if (chapter === null) {
      throw new BackofficeMultimediaMovieNotFound(
        `The movie with id <${id.value}> does not exist`
      )
    }

    chapter.delete()
    await this.repository.delete(chapter)
    await this.eventBus.publish(chapter.pullDomainEvents())
  }
}
