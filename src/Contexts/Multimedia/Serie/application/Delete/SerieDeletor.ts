import { type SerieRepository } from '@Multimedia/Serie/domain/SerieRepository'
import { SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'

/**
 * Service for deleting a serie
 */
export class SerieDeletor {
  constructor(private readonly repository: SerieRepository) {}

  /**
   * Removes a serie from the repository.
   *
   * @param idFromEvent - The id of the serie to be deleted.
   */
  public async run(idFromEvent: string): Promise<void> {
    const id = new SerieId(idFromEvent)

    await this.repository.delete(id)
  }
}
