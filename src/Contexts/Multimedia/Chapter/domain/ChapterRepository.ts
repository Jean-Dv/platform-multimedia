import { type Chapter } from './Chapter'

export interface ChapterRepository {
  /**
   * Saves a movie entity tot he repository.
   *
   * @param movie The movie entity to be saved.
   */
  save: (chapter: Chapter) => Promise<void>
}
