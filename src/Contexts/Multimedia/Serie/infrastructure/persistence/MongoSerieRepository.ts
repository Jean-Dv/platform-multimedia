import { Serie } from '@Multimedia/Serie/domain/Serie'
import { type SerieRepository } from '@Multimedia/Serie/domain/SerieRepository'
import { type Criteria } from '@Shared/domain/criteria/Criteria'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'

interface SerieDocument {
  _id: string
  id: string
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
        title: document.title,
        releaseDate: document.releaseDate
      })
    )
  }

  protected collectionName(): string {
    return 'series'
  }
}
