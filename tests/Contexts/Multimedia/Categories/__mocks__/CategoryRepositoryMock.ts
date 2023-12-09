import { type Category } from '@Multimedia/Categories/domain/Category'
import { type CategoryId } from '@Multimedia/Categories/domain/CategoryId'
import { type CategoryRepository } from '@Multimedia/Categories/domain/CategoryRepository'

export class CategoryRepositoryMock implements CategoryRepository {
  private readonly mockSave: jest.Mock
  private readonly searchMock: jest.Mock
  private readonly deleteMock: jest.Mock
  private readonly categories: Category[] = []

  constructor() {
    this.mockSave = jest.fn()
    this.searchMock = jest.fn()
    this.deleteMock = jest.fn()
  }

  public async save(category: Category): Promise<void> {
    this.mockSave(category)
  }

  public async search(id: CategoryId): Promise<Category | null> {
    this.searchMock(id)
    return (
      this.categories.find((category) => category.id.value === id.value) ?? null
    )
  }

  public async delete(id: CategoryId): Promise<void> {
    this.deleteMock(id)
  }

  public assertSaveHaveBeenCalledWith(category: Category): void {
    expect(this.mockSave).toHaveBeenCalledWith(category)
  }

  public assertDeleteHaveBeenCalledWith(id: CategoryId): void {
    expect(this.deleteMock).toHaveBeenCalledWith(id)
  }

  public assertSearchHaveBeenCalledWith(id: CategoryId): void {
    expect(this.searchMock).toHaveBeenCalledWith(id)
  }

  public searchMockReturnValue(category: Category): void {
    this.categories.push(category)
  }

  public searchMockReturnValues(categories: Category[]): void {
    this.categories.push(...categories)
  }
}
