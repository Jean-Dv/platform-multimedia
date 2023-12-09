import { type Criteria } from '@Shared/domain/criteria/Criteria'
import { type Chapter } from './Chapter'
import { type ChapterId } from './ChapterId'

export interface ChapterRepository {
  /**
   * Saves a movie entity tot he repository.
   *
   * @param movie The movie entity to be saved.
   */
  save: (chapter: Chapter) => Promise<void>

  /**
   * Retireves movies that match the specified criteria.
   *
   * @param criteria - The criteria used for matching movies.
   * @returns A promise that resolves to an array of matched movies.
   */
  matching: (criteria: Criteria) => Promise<Chapter[]>

  /**
   * Retrieves a chapter by its id.
   *
   * @param id - The id of the chapter to be retrieved.
   * @returns A promise that resolves to the retrieved chapter, or null if no chapter was found.
   */
  search: (id: ChapterId) => Promise<Chapter | null>
}
