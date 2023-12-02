import { type Serie } from './Serie'

export interface SerieRepository {
  /**
   * Saves a serie entity to the repository.
   *
   * @param serie The serie entity to be saved.
   */
  save: (serie: Serie) => Promise<void>
}
