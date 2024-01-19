import { type BackofficeMultimediaSerieId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSerieId'
import { type BackofficeMultimediaSerie } from './BackofficeMultimediaSerie'

export interface BackofficeMultimediaSerieRepository {
  /**
   * Saves a backoffice multimedia serie to the repository.
   *
   * @param serie - The backoffice multimedia serie to be saved.
   */
  save: (serie: BackofficeMultimediaSerie) => Promise<void>

  /**
   * Searches a backoffice multimedia serie in the repository.
   *
   * @param id - The id of the backoffice multimedia serie to be searched.
   * @returns A promise that resolves true when the serie has been found.
   */
  search: (
    id: BackofficeMultimediaSerieId
  ) => Promise<BackofficeMultimediaSerie | null>
}
