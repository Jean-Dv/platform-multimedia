import { type BackofficeMultimediaCategory } from './BackofficeMultimediaCategory'

/**
 * Represents a repository for managing backoffice categories.
 */
export interface BackofficeMultimediaCategoryRepository {
  /**
   * Saves a backoffice category entity to the repository.
   *
   * @param category - The backoffice category entity to be saved.
   * @returns A promise that resolves when the category has been saved.
   */
  save: (category: BackofficeMultimediaCategory) => Promise<void>
}
