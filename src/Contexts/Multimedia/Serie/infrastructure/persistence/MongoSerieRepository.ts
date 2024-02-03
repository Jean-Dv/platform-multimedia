import { Serie } from '@Multimedia/Serie/domain/Serie'
import { type SerieRepository } from '@Multimedia/Serie/domain/SerieRepository'
import { type CategoryName } from '@Multimedia/Shared/domain/Category/CategoryName'
import { type SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'
import { type Criteria } from '@Shared/domain/criteria/Criteria'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'
import { type UUID } from 'mongodb'

interface SerieDocument {
  _id: UUID
  id: string
  title: string
  releaseYear: number
  synopsis: string
  categories: string[]
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
      Serie.fromPrimitives({
        id: document._id.toString(),
        title: document.title,
        releaseYear: document.releaseYear,
        synopsis: document.synopsis,
        categories: document.categories
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
      ? Serie.fromPrimitives({
          id: document._id.toString(),
          title: document.title,
          releaseYear: document.releaseYear,
          synopsis: document.synopsis,
          categories: document.categories
        })
      : null
  }

  protected collectionName(): string {
    return 'series'
  }
}
