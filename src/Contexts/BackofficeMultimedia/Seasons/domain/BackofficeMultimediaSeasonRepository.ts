import { type BackofficeMultimediaSeasonId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSeasonId'
import { type BackofficeMultimediaSeason } from './BackofficeMultimediaSeason'

/**
 * Interface for the repository of backoffice multimedia seasons.
 */
export interface BackofficeMultimediaSeasonRepository {
  /**
   * Saves a backoffice multimedia season to the repository.
   *
   * @param season - The backoffice multimedia season to be saved.
   */
  save: (season: BackofficeMultimediaSeason) => Promise<void>

  /**
   * Searches a backoffice multimedia season by its id.
   *
   * @param id - The id of the backoffice multimedia season to be searched.
   * @returns A promise that resolves to the backoffice multimedia season, or null if it does not exist.
   */
  search: (
    id: BackofficeMultimediaSeasonId
  ) => Promise<BackofficeMultimediaSeason | null>
}
