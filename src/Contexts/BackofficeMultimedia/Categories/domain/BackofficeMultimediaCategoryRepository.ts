import { type BackofficeMultimediaCategoryId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaCategoryId'
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

  /**
   * Searches for a backoffice category entity in the repository.
   *
   * @param id - The id of the backoffice category entity to be searched.
   * @returns A promise that resolves true when the category has been found.
   */
  search: (
    id: BackofficeMultimediaCategoryId
  ) => Promise<BackofficeMultimediaCategory | null>
}
