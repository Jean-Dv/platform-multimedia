import { Season } from '@Multimedia/Season/domain/Season'
import { type SeasonRepository } from '@Multimedia/Season/domain/SeasonRepository'
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

  protected collectionName(): string {
    return 'seasons'
  }
}
