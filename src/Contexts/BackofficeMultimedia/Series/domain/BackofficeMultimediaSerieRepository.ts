import { type BackofficeMultimediaSerie } from './BackofficeMultimediaSerie'

export interface BackofficeMultimediaSerieRepository {
  /**
   * Saves a backoffice multimedia serie to the repository.
   *
   * @param serie - The backoffice multimedia serie to be saved.
   */
  save: (serie: BackofficeMultimediaSerie) => Promise<void>
}
