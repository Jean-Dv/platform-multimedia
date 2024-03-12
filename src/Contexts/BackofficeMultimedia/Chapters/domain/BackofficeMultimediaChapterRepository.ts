import { type BackofficeMultimediaChapter } from './BackofficeMultimediaChapter'
import { type BackofficeMultimediaChapterId } from './BackofficeMultimediaChapterId'

/**
 * Interface for the repository of chapters
 */
export interface BackofficeMultimediaChapterRepository {
  /**
   * Saves a chapter to the repository.
   *
   * @param chapter - The chapter to be saved.
   */
  save: (chapter: BackofficeMultimediaChapter) => Promise<void>

  /**
   * Search for a chapter by its id.
   *
   * @param id - The id of the chapter to search for.
   * @returns A Promise that resolves to the chapter if found, or null if not found.
   */
  search: (
    id: BackofficeMultimediaChapterId
  ) => Promise<BackofficeMultimediaChapter | null>

  /**
   * Deletes a chapter from the repository.
   *
   * @param chapter - The chapter to be deleted.
   */
  delete: (chapter: BackofficeMultimediaChapter) => Promise<void>
}
