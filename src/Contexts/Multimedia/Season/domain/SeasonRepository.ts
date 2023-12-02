import { type Criteria } from '@Shared/domain/criteria/Criteria'
import { type Season } from './Season'

export interface SeasonRepository {
  /**
   * Saves a season entity to the repository.
   *
   * @param season The season entity to be saved.
   */
  save: (season: Season) => Promise<void>

  /**
   * Retrieves seasons that match the specified criteria.
   *
   * @param criteria - The criteria used for matching seasons.
   * @returns A promise that resolves to an array of matched seasons.
   */
  matching: (criteria: Criteria) => Promise<Season[]>
}
