import { BackofficeMultimediaCategoryNotFound } from '@BackofficeMultimedia/Categories/domain/BackofficeMultimediaCategoryNotFound'
import { type BackofficeMultimediaCategoryRepository } from '@BackofficeMultimedia/Categories/domain/BackofficeMultimediaCategoryRepository'
import { type BackofficeMultimediaCategoryId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaCategoryId'

/**
 * Service for finding backoffice multimedia categories.
 */
export class BackofficeMultimediaCategoryFinder {
  constructor(
    private readonly repository: BackofficeMultimediaCategoryRepository
  ) {}

  /**
   * Runs the category search process.
   *
   * @param id - The id of the backoffice category entity to be searched.
   * @returns A promise that resolves true when the category has been found.
   */
  public async run(id: BackofficeMultimediaCategoryId): Promise<boolean> {
    const category = await this.repository.search(id)
    if (category === null) {
      throw new BackofficeMultimediaCategoryNotFound(
        `The category with id <${id.value}> does not exist.`
      )
    }
    return true
  }
}
