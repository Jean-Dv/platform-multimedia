import { type SeasonRepository } from '@Multimedia/Season/domain/SeasonRepository'
import { SeasonId } from '@Multimedia/Shared/domain/Season/SeasonId'

/**
 * Service for deleting a season
 */
export class SeasonDeletor {
  constructor(private readonly repository: SeasonRepository) {}

  /**
   * Removes a season from the repository.
   *
   * @param idFromEvent - The id of the season to be deleted.
   */
  public async run(idFromEvent: string): Promise<void> {
    const id = new SeasonId(idFromEvent)

    await this.repository.delete(id)
  }
}
