import { type BackofficeMultimediaCategory } from '@BackofficeMultimedia/Categories/domain/BackofficeMultimediaCategory'
import { type BackofficeMultimediaCategoryRepository } from '@BackofficeMultimedia/Categories/domain/BackofficeMultimediaCategoryRepository'

/**
 * Mock implementation of the `BackofficeMultimediaCategoryRepository` for testing.
 */
export class BackofficeMultimediaCategoryRepositoryMock
  implements BackofficeMultimediaCategoryRepository
{
  private readonly mockSave: jest.Mock

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
   * Asserts that the `save` method has been called with the specified category.
   *
   * @param category - The expected category.
   */
  public assertSaveHaveBeenCalledWith(
    category: BackofficeMultimediaCategory
  ): void {
    expect(this.mockSave).toHaveBeenCalledWith(category)
  }
}
