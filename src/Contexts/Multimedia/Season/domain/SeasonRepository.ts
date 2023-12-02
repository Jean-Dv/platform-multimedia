import { type Season } from './Season'

export interface SeasonRepository {
  /**
   * Saves a season entity to the repository.
   *
   * @param season The season entity to be saved.
   */
  save: (season: Season) => Promise<void>
}
