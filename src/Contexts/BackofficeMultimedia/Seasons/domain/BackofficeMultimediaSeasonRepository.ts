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
}
