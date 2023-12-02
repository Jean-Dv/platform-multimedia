import { type Season } from '@Multimedia/Season/domain/Season'
import { type SeasonRepository } from '@Multimedia/Season/domain/SeasonRepository'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'

export class MongoSeasonRepository
  extends MongoRepository<Season>
  implements SeasonRepository
{
  public async save(season: Season): Promise<void> {
    await this.persist(season.id.value, season)
  }

  protected collectionName(): string {
    return 'seasons'
  }
}
