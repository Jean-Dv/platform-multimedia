import { type BackofficeMultimediaSeason } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeason'
import { type BackofficeMultimediaSeasonRepository } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonRepository'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'

export class MongoBackofficeMultimediaSeasonRepository
  extends MongoRepository<BackofficeMultimediaSeason>
  implements BackofficeMultimediaSeasonRepository
{
  public async save(season: BackofficeMultimediaSeason): Promise<void> {
    await this.persist(season.id.value, season)
  }

  protected collectionName(): string {
    return 'backoffice-multimedia-seasons'
  }
}
