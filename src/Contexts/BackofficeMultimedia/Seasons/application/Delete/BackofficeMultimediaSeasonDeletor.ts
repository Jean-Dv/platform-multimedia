import { BackofficeMultimediaSeasonNotFound } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonNotFound'
import { type BackofficeMultimediaSeasonRepository } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonRepository'
import { type BackofficeMultimediaSeasonId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSeasonId'
import { type EventBus } from '@Shared/domain/EventBus'

/**
 * Service for deleting backoffice multimedia seasons.
 */
export class BackofficeMultimediaSeasonDeletor {
  constructor(
    private readonly repository: BackofficeMultimediaSeasonRepository,
    private readonly eventBus: EventBus
  ) {}

  /**
   * Runs the season deletion process.
   *
   * @param id - The id of the season to be deleted.
   */
  public async run(id: BackofficeMultimediaSeasonId): Promise<void> {
    const season = await this.repository.search(id)
    if (season === null) {
      throw new BackofficeMultimediaSeasonNotFound(
        `The season with id <${id.value}> does not exist`
      )
    }

    season.delete()
    await this.repository.delete(season)
    await this.eventBus.publish(season.pullDomainEvents())
  }
}
