import { ChapterId } from '@Multimedia/Chapter/domain/ChapterId'
import { type ChapterRepository } from '@Multimedia/Chapter/domain/ChapterRepository'

/**
 * Service for deleting a chapter
 */
export class ChapterDeletor {
  constructor(private readonly repository: ChapterRepository) {}

  /**
   * Removes a chapter from the repository.
   *
   * @param idFromEvent - The id of the chapter to be deleted.
   */
  public async run(idFromEvent: string): Promise<void> {
    const id = new ChapterId(idFromEvent)

    await this.repository.delete(id)
  }
}
