import { Category } from '@Multimedia/Categories/domain/Category'
import { type CategoryId } from '@Multimedia/Categories/domain/CategoryId'
import { type CategoryRepository } from '@Multimedia/Categories/domain/CategoryRepository'
import { type CategoryName } from '@Multimedia/Shared/domain/Category/CategoryName'
import { type Criteria } from '@Shared/domain/criteria/Criteria'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'
import { type UUID } from 'mongodb'

interface CategoryDocument {
  _id: UUID
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

  public async searchByName(name: CategoryName): Promise<Category | null> {
    const collection = await this.collection()
    const document = await collection.findOne<CategoryDocument>({
      name: name.value
    })
    return document !== null
      ? Category.fromPrimitives({
          id: document.id,
          name: document.name
        })
      : null
  }

  public async matching(criteria: Criteria): Promise<Category[]> {
    const documents = await this.searchByCriteria<CategoryDocument>(criteria)
    return documents.map((document) =>
      Category.fromPrimitives({
        id: document._id.toString(),
        name: document.name
      })
    )
  }

  public async delete(id: CategoryId): Promise<void> {
    await this.erase(id.value)
  }

  public collectionName(): string {
    return 'categories'
  }
}
