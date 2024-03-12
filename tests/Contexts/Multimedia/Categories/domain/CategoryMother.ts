import { Category } from '@Multimedia/Categories/domain/Category'
import { type CategoryId } from '@Multimedia/Categories/domain/CategoryId'
import { type CategoryName } from '@Multimedia/Shared/domain/Category/CategoryName'
import { CategoryIdMother } from './CategoryIdMother'
import { CategoryNameMother } from './CategoryNameMother'

/**
 * Factory class for creating Category instances for testing purposes.
 */
export class CategoryMother {
  /**
   * Creates a category with the specified ID and name.
   *
   * @param id - The ID of the category.
   * @param name - The name of the category.
   * @returns A new Category instance.
   */
  public static create(id: CategoryId, name: CategoryName): Category {
    return new Category(id, name)
  }

  /**
   * Creates a random category for testing.
   *
   * @returns A new Category instance with random ID and name.
   */
  public static random(): Category {
    return this.create(CategoryIdMother.random(), CategoryNameMother.random())
  }
}
