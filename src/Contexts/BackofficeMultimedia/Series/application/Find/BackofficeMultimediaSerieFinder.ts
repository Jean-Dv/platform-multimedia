import { BackofficeMultimediaSerieNotFound } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieNotFound'
import { type BackofficeMultimediaSerieRepository } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieRepository'
import { type BackofficeMultimediaSerieId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSerieId'

/**
 * Service for finding backoffice multimedia series.
 */
export class BackofficeMultimediaSerieFinder {
  constructor(
    private readonly repository: BackofficeMultimediaSerieRepository
  ) {}

  /**
   * Runs the serie search process.
   *
   * @param id - The id of the backoffice serie entity to be searched.
   * @returns A promise that resolves true when the serie has been found.
   */
  public async run(id: BackofficeMultimediaSerieId): Promise<boolean> {
    const serie = await this.repository.search(id)
    if (serie === null) {
      throw new BackofficeMultimediaSerieNotFound(
        `The serie with id <${id.value}> does not exist.`
      )
    }
    return true
  }
}
