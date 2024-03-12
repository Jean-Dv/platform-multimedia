import { BackofficeMultimediaSerieNotFound } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieNotFound'
import { type BackofficeMultimediaSerieRepository } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieRepository'
import { type BackofficeMultimediaSerieId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSerieId'
import { type EventBus } from '@Shared/domain/EventBus'

/**
 * Service for deleting backoffice multimedia series.
 */
export class BackofficeMultimediaSerieDeletor {
  constructor(
    private readonly repository: BackofficeMultimediaSerieRepository,
    private readonly eventBus: EventBus
  ) {}

  /**
   * Runs the serie deletion process.
   *
   * @param id - The id of the serie to be deleted.
   */
  public async run(id: BackofficeMultimediaSerieId): Promise<void> {
    const serie = await this.repository.search(id)
    if (serie === null) {
      throw new BackofficeMultimediaSerieNotFound(
        `The serie with id <${id.value}> does not exist`
      )
    }

    serie.delete()
    await this.repository.delete(serie)
    await this.eventBus.publish(serie.pullDomainEvents())
  }
}
