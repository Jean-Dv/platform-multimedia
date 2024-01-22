import { BackofficeMultimediaSeasonNotFound } from './../../domain/BackofficeMultimediaSeasonNotFound'
import { type BackofficeMultimediaSeasonRepository } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonRepository'
import { type BackofficeMultimediaSeasonId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSeasonId'

/**
 * Service for finding backoffice multimedia seasons.
 */
export class BackofficeMultimediaSeasonFinder {
  constructor(
    private readonly repository: BackofficeMultimediaSeasonRepository
  ) {}

  /**
   * Runs the season search process.
   *
   * @param id - The id of the backoffice season entity to be searched.
   * @returns A promise that resolves true when the season has been found.
   */
  public async run(id: BackofficeMultimediaSeasonId): Promise<boolean> {
    const season = await this.repository.search(id)
    if (season === null) {
      throw new BackofficeMultimediaSeasonNotFound(
        `The season with id <${id.value}> does not exist.`
      )
    }
    return true
  }
}
