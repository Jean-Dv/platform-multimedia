import { type Serie } from '@Multimedia/Serie/domain/Serie'
import { type SerieRepository } from '@Multimedia/Serie/domain/SerieRepository'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'

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

  protected collectionName(): string {
    return 'series'
  }
}
