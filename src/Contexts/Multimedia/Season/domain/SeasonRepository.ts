import { type Criteria } from '@Shared/domain/criteria/Criteria'
import { type Season } from './Season'
import { type SeasonId } from '@Multimedia/Shared/domain/Season/SeasonId'

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

  /**
   * Retrieves a season by its id.
   *
   * @param id - The id of the season to be searched.
   * @returns A promise that resolves to the season with the specified id, or null if no season is found.
   */
  searchById: (id: SeasonId) => Promise<Season | null>

  /**
   * Removes a season from the repository.
   *
   * @param id - The id of the season to be deleted.
   */
  delete: (id: SeasonId) => Promise<void>
}
