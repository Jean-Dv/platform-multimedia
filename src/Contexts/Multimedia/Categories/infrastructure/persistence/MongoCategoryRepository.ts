import { Category } from '@Multimedia/Categories/domain/Category'
import { type CategoryId } from '@Multimedia/Categories/domain/CategoryId'
import { type CategoryRepository } from '@Multimedia/Categories/domain/CategoryRepository'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'

interface CategoryDocument {
  _id: string
  id: string
  name: string
}

export class MongoCategoryRepository
  extends MongoRepository<Category>
  implements CategoryRepository
{
  public async save(category: Category): Promise<void> {
    await this.persist(category.id.value, category)
  }

  public async search(id: CategoryId): Promise<Category | null> {
    const collection = await this.collection()
    const document = await collection.findOne<CategoryDocument>({
      id: id.value
    })
    return document !== null
      ? Category.fromPrimitives({
          id: document.id,
          name: document.name
        })
      : null
  }

  public async delete(id: CategoryId): Promise<void> {
    await this.erase(id.value)
  }

  public collectionName(): string {
    return 'categories'
  }
}
