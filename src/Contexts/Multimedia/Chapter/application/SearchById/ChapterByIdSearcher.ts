import { type ChapterId } from '@Multimedia/Chapter/domain/ChapterId'
import { type ChapterRepository } from '@Multimedia/Chapter/domain/ChapterRepository'
import { ChapterWithPermissionsResponse } from '../ChapterWithPermissionsResponse'
import { ChapterNotFound } from '@Multimedia/Chapter/domain/ChapterNotFound'

/**
 * Represents a class responsible for searching chapter based on specified id.
 */
export class ChapterByIdSearcher {
  constructor(private readonly repository: ChapterRepository) {}

  /**
   * Executes the chapter search based on provided id.
   *
   * @param id - The id of the chapter to be retrieved.
   */
  public async run(id: ChapterId): Promise<ChapterWithPermissionsResponse> {
    const chapter = await this.repository.search(id)
    if (chapter === null) {
      throw new ChapterNotFound(`The chapter <${id.value}> does not exist.`)
    }
    return new ChapterWithPermissionsResponse(chapter)
  }
}
