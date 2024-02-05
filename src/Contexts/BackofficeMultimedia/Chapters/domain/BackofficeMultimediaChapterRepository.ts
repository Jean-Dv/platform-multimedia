import { type BackofficeMultimediaChapter } from './BackofficeMultimediaChapter'

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
}
