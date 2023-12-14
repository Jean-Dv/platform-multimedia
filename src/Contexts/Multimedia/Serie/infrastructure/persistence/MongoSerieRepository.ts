import { Serie } from '@Multimedia/Serie/domain/Serie'
import { type SerieRepository } from '@Multimedia/Serie/domain/SerieRepository'
import { type CategoryName } from '@Multimedia/Shared/domain/Category/CategoryName'
import { type SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'
import { type Criteria } from '@Shared/domain/criteria/Criteria'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'

interface SerieDocument {
  _id: string
  id: string
  category: string
  title: string
  releaseDate: Date
}

/**
 * Repository implementation for manage series in a MongoDB database.
 */
export class MongoSerieRepository
  extends MongoRepository<Serie>
  implements SerieRepository
{
  public async save(serie: Serie): Promise<void> {
    await this.persist(serie.id.value, serie)
  }

  public async matching(criteria: Criteria): Promise<Serie[]> {
    const documents = await this.searchByCriteria<SerieDocument>(criteria)
    return documents.map((document) =>
      Serie.fromPrimitive({
        id: document.id,
        category: document.category,
        title: document.title,
        releaseDate: document.releaseDate
      })
    )
  }

  public async updateSeriesByCategory(category: CategoryName): Promise<void> {
    const collection = await this.collection()
    await collection.updateMany(
      { category: { $eq: category.value } },
      { $set: { category: 'other' } }
    )
  }

  public async searchById(id: SerieId): Promise<Serie | null> {
    const collection = await this.collection()
    const document = await collection.findOne<SerieDocument>({ id: id.value })
    return document !== null
      ? Serie.fromPrimitive({
          id: document.id,
          category: document.category,
          title: document.title,
          releaseDate: document.releaseDate
        })
      : null
  }

  public async delete(id: SerieId): Promise<void> {
    await this.erase(id.value)
  }

  protected collectionName(): string {
    return 'series'
  }
}
