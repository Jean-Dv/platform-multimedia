import { type BackofficeCategory } from './BackofficeCategory'

/**
 * Represents a repository for managing backoffice categories.
 */
export interface BackofficeCategoryRepository {
  /**
   * Saves a backoffice category entity to the repository.
   *
   * @param category - The backoffice category entity to be saved.
   * @returns A promise that resolves when the category has been saved.
   */
  save: (category: BackofficeCategory) => Promise<void>
}
