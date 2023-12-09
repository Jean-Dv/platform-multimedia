import { type Criteria } from '@Shared/domain/criteria/Criteria'
import { type Serie } from './Serie'
import { type CategoryName } from '@Multimedia/Shared/domain/Category/CategoryName'
import { type SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'

export interface SerieRepository {
  /**
   * Saves a serie entity to the repository.
   *
   * @param serie The serie entity to be saved.
   */
  save: (serie: Serie) => Promise<void>

  /**
   * Retrieves series that match the specified criteria.
   *
   * @param criteria - The criteria used for matching series.
   * @returns A promise that resolves to an array of matched series.
   */
  matching: (criteria: Criteria) => Promise<Serie[]>

  updateSeriesByCategory: (category: CategoryName) => Promise<void>

  searchById: (id: SerieId) => Promise<Serie | null>
}
