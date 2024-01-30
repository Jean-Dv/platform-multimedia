import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'
import { BackofficeMultimediaCategory } from '../../domain/BackofficeMultimediaCategory'
import { type BackofficeMultimediaCategoryRepository } from '../../domain/BackofficeMultimediaCategoryRepository'
import { type BackofficeMultimediaCategoryId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaCategoryId'
import { type UUID } from 'mongodb'

interface BackofficeMultimediaCategoryMongoDocument {
  _id: UUID
  name: string
}

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

  public async search(
    id: BackofficeMultimediaCategoryId
  ): Promise<BackofficeMultimediaCategory | null> {
    const category =
      await this.findById<BackofficeMultimediaCategoryMongoDocument>(id.value)
    return category !== null
      ? BackofficeMultimediaCategory.fromPrimitives({
          id: category._id.toString(),
          name: category.name
        })
      : null
  }

  public collectionName(): string {
    return 'backoffice-multimedia-categories'
  }
}
