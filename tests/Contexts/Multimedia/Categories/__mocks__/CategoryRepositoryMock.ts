import { type Category } from '@Multimedia/Categories/domain/Category'
import { type CategoryRepository } from '@Multimedia/Categories/domain/CategoryRepository'

export class CategoryRepositoryMock implements CategoryRepository {
  private readonly mockSave: jest.Mock

  constructor() {
    this.mockSave = jest.fn()
  }

  public async save(category: Category): Promise<void> {
    this.mockSave(category)
  }

  public assertSaveHaveBeenCalledWith(category: Category): void {
    expect(this.mockSave).toHaveBeenCalledWith(category)
  }
}
