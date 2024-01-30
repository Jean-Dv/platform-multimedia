import { BackofficeMultimediaSeason } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeason'
import { type BackofficeMultimediaSeasonRepository } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonRepository'
import { type BackofficeMultimediaSeasonId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSeasonId'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'
import { type UUID } from 'mongodb'

interface BackofficeMultimediaSeasonMongoDocument {
  _id: UUID
  title: string
  releaseYear: number
  serie: string
}

export class MongoBackofficeMultimediaSeasonRepository
  extends MongoRepository<BackofficeMultimediaSeason>
  implements BackofficeMultimediaSeasonRepository
{
  public async save(season: BackofficeMultimediaSeason): Promise<void> {
    await this.persist(season.id.value, season)
  }

  public async search(
    id: BackofficeMultimediaSeasonId
  ): Promise<BackofficeMultimediaSeason | null> {
    const season = await this.findById<BackofficeMultimediaSeasonMongoDocument>(
      id.value
    )
    return season !== null
      ? BackofficeMultimediaSeason.fromPrimitives({
          id: season._id.toString(),
          title: season.title,
          releaseYear: season.releaseYear,
          serie: season.serie
        })
      : null
  }

  protected collectionName(): string {
    return 'backoffice-multimedia-seasons'
  }
}
