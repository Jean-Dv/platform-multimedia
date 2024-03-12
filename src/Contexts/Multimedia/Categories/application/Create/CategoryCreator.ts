import { Category } from '@Multimedia/Categories/domain/Category'
import { CategoryId } from '@Multimedia/Categories/domain/CategoryId'
import { CategoryName } from '@Multimedia/Shared/domain/Category/CategoryName'
import { type CategoryRepository } from '@Multimedia/Categories/domain/CategoryRepository'

/**
 * Service responsible for creating a category.
 */
export class CategoryCreator {
  constructor(private readonly repository: CategoryRepository) {}

  /**
   * Runs the service.
   *
   * @param id - The category id.
   * @param name - The category name.
   */
  public async run(id: string, name: string): Promise<void> {
    const category = new Category(new CategoryId(id), new CategoryName(name))
    await this.repository.save(category)
  }
}
