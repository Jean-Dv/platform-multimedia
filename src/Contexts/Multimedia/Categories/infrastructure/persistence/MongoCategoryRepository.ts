import { type Category } from '@Multimedia/Categories/domain/Category'
import { type CategoryRepository } from '@Multimedia/Categories/domain/CategoryRepository'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'

export class MongoCategoryRepository
  extends MongoRepository<Category>
  implements CategoryRepository
{
  public async save(category: Category): Promise<void> {
    await this.persist(category.id.value, category)
  }

  public collectionName(): string {
    return 'categories'
  }
}
