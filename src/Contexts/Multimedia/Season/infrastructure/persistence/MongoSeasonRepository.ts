import { Season } from '@Multimedia/Season/domain/Season'
import { type SeasonRepository } from '@Multimedia/Season/domain/SeasonRepository'
import { type SeasonId } from '@Multimedia/Shared/domain/Season/SeasonId'
import { type SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'
import { type Criteria } from '@Shared/domain/criteria/Criteria'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'

interface SeasonDocument {
  _id: string
  id: string
  serieId: string
  title: string
  releaseDate: Date
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
        id: document.id,
        serieId: document.serieId,
        title: document.title,
        releaseDate: document.releaseDate
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
          releaseDate: document.releaseDate
        })
      : null
  }

  public async deleteBySerie(id: SerieId): Promise<void> {
    const collection = await this.collection()
    const document = {
      deltedAt: new Date()
    }
    await collection.updateMany(
      {
        serieId: { $eq: id.value }
      },
      { $set: document }
    )
  }

  protected collectionName(): string {
    return 'seasons'
  }
}
