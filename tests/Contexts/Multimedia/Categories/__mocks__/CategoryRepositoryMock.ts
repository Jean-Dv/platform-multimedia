import { type Category } from '@Multimedia/Categories/domain/Category'
import { type CategoryId } from '@Multimedia/Categories/domain/CategoryId'
import { type CategoryRepository } from '@Multimedia/Categories/domain/CategoryRepository'
import { type CategoryName } from '@Multimedia/Shared/domain/Category/CategoryName'
import { type Criteria } from '@Shared/domain/criteria/Criteria'

export class CategoryRepositoryMock implements CategoryRepository {
  private readonly mockSave: jest.Mock
  private readonly searchMock: jest.Mock
  private readonly deleteMock: jest.Mock
  private readonly searchByNameMock: jest.Mock
  private readonly matchingMock: jest.Mock
  private readonly categories: Category[] = []

  constructor() {
    this.mockSave = jest.fn()
    this.searchMock = jest.fn()
    this.deleteMock = jest.fn()
    this.searchByNameMock = jest.fn()
    this.matchingMock = jest.fn()
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

  public async searchByName(name: CategoryName): Promise<Category | null> {
    this.searchByNameMock(name)
    return (
      this.categories.find((category) => category.name.value === name.value) ??
      null
    )
  }

  public async matching(criteria: Criteria): Promise<Category[]> {
    this.matchingMock(criteria)
    return this.categories
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

  public assertSearchByNameHaveBeenCalledWith(name: CategoryName): void {
    expect(this.searchByNameMock).toHaveBeenCalledWith(name)
  }

  public assertMatchingHaveBeenCalled(): void {
    expect(this.matchingMock).toHaveBeenCalled()
  }

  public searchMockReturnValue(category: Category): void {
    this.categories.push(category)
  }

  public searchByNameMockReturnValue(category: Category): void {
    this.categories.push(category)
  }

  public searchMockReturnValues(categories: Category[]): void {
    this.categories.push(...categories)
  }

  public matchingMockReturnValue(categories: Category[]): void {
    this.categories.push(...categories)
  }
}
