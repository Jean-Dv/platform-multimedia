import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'
import { type BackofficeCategory } from '../../domain/BackofficeCategory'
import { type BackofficeCategoryRepository } from '../../domain/BackofficeCategoryRepository'

/**
 * MongoDB repository implementation backoffice categories.
 */
export class MongoBackofficeCategoryRepository
  extends MongoRepository<BackofficeCategory>
  implements BackofficeCategoryRepository
{
  public async save(category: BackofficeCategory): Promise<void> {
    await this.persist(category.id.value, category)
  }

  public collectionName(): string {
    return 'categories'
  }
}
