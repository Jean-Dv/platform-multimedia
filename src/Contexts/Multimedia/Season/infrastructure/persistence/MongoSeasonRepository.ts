import { Season } from '@Multimedia/Season/domain/Season'
import { type SeasonRepository } from '@Multimedia/Season/domain/SeasonRepository'
import { type SeasonId } from '@Multimedia/Shared/domain/Season/SeasonId'
import { type Criteria } from '@Shared/domain/criteria/Criteria'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'
import { type UUID } from 'mongodb'

interface SeasonDocument {
  _id: UUID
  id: string
  serieId: string
  title: string
  releaseYear: number
}

export class MongoSeasonRepository
  extends MongoRepository<Season>
  implements SeasonRepository
{
  public async save(season: Season): Promise<void> {
    await this.persist(season.id.value, season)
  }

  public async matching(criteria: Criteria): Promise<Season[]> {
    const documents = await this.searchByCriteria<SeasonDocument>(criteria)
    return documents.map((document) =>
      Season.fromPrimitives({
        id: document._id.toString(),
        serieId: document.serieId,
        title: document.title,
        releaseYear: document.releaseYear
      })
    )
  }

  public async searchById(id: SeasonId): Promise<Season | null> {
    const collection = await this.collection()
    const document = await collection.findOne<SeasonDocument>({ id: id.value })
    return document !== null
      ? Season.fromPrimitives({
          id: document.id,
          serieId: document.serieId,
          title: document.title,
          releaseYear: document.releaseYear
        })
      : null
  }

  protected collectionName(): string {
    return 'seasons'
  }
}
