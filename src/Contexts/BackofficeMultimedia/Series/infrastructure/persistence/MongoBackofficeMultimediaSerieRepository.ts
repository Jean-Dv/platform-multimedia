import { BackofficeMultimediaSerie } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerie'
import { type BackofficeMultimediaSerieRepository } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieRepository'
import { type BackofficeMultimediaSerieId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSerieId'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'

interface BackofficeMultimediaSerieMongoDocument {
  _id: string
  title: string
  releaseYear: number
  synopsis: string
  categories: string[]
}

/**
 * MongoDB repository implementation backoffice series.
 */
export class MongoBackofficeMultimediaSerieRepository
  extends MongoRepository<BackofficeMultimediaSerie>
  implements BackofficeMultimediaSerieRepository
{
  public async save(serie: BackofficeMultimediaSerie): Promise<void> {
    await this.persist(serie.id.value, serie)
  }

  public async search(
    id: BackofficeMultimediaSerieId
  ): Promise<BackofficeMultimediaSerie | null> {
    const serie = await this.findById<BackofficeMultimediaSerieMongoDocument>(
      id.value
    )
    return serie !== null
      ? BackofficeMultimediaSerie.fromPrimitives({
          id: serie._id,
          title: serie.title,
          releaseYear: serie.releaseYear,
          synopsis: serie.synopsis,
          categories: serie.categories
        })
      : null
  }

  public collectionName(): string {
    return 'backoffice-multimedia-series'
  }
}
