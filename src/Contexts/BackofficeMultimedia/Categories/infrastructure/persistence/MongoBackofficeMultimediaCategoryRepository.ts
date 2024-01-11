import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'
import { type BackofficeMultimediaCategory } from '../../domain/BackofficeMultimediaCategory'
import { type BackofficeMultimediaCategoryRepository } from '../../domain/BackofficeMultimediaCategoryRepository'

/**
 * MongoDB repository implementation backoffice categories.
 */
export class MongoBackofficeMultimediaCategoryRepository
  extends MongoRepository<BackofficeMultimediaCategory>
  implements BackofficeMultimediaCategoryRepository
{
  public async save(category: BackofficeMultimediaCategory): Promise<void> {
    await this.persist(category.id.value, category)
  }

  public collectionName(): string {
    return 'categories'
  }
}
