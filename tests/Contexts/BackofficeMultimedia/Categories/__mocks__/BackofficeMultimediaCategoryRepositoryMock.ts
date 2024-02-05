import { type BackofficeMultimediaCategory } from '@BackofficeMultimedia/Categories/domain/BackofficeMultimediaCategory'
import { type BackofficeMultimediaCategoryRepository } from '@BackofficeMultimedia/Categories/domain/BackofficeMultimediaCategoryRepository'
import { type BackofficeMultimediaCategoryId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaCategoryId'

/**
 * Mock implementation of the `BackofficeMultimediaCategoryRepository` for testing.
 */
export class BackofficeMultimediaCategoryRepositoryMock
  implements BackofficeMultimediaCategoryRepository
{
  private readonly mockSave: jest.Mock
  private readonly categories: BackofficeMultimediaCategory[] = []

  constructor() {
    this.mockSave = jest.fn()
  }

  /**
   * Mock implementation of the `save` method.
   *
   * @param category - The category to save.
   * @returns A Promise that resolves with `undefined`.
   */
  public async save(category: BackofficeMultimediaCategory): Promise<void> {
    this.mockSave(category)
  }

  /**
   * Mock implementation of the `search` method.
   *
   * @param id - The id of the category to search.
   * @returns A Promise that resolves with `null`.
   */
  public async search(
    id: BackofficeMultimediaCategoryId
  ): Promise<BackofficeMultimediaCategory | null> {
    return (
      this.categories.find((category) => category.id.value === id.value) ?? null
    )
  }

  /**
   * Asserts that the `save` method has been called with the specified category.
   *
   * @param category - The expected category.
   */
  public assertSaveHaveBeenCalledWith(
    category: BackofficeMultimediaCategory
  ): void {
    expect(this.mockSave).toHaveBeenCalledWith(category)
  }

  public searchMockReturnValue(
    categories: BackofficeMultimediaCategory[]
  ): void {
    this.categories.push(...categories)
  }
}
