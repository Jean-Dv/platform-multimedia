import { type BackofficeMultimediaMovieRepository } from './../../domain/BackofficeMultimediaMovieRepository'
import { BackofficeMultimediaMovie } from './../../domain/BackofficeMultimediaMovie'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'
import { type BackofficeMultimediaMovieId } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieId'
import { type UUID } from 'mongodb'

interface BackofficeMultimediaMovieMongoDocument {
  _id: UUID
  title: string
  releaseYear: number
  synopsis: string
  categories: string[]
  videoId: string
}

export class MongoBackofficeMultimediaMovieRepository
  extends MongoRepository<BackofficeMultimediaMovie>
  implements BackofficeMultimediaMovieRepository
{
  public async save(movie: BackofficeMultimediaMovie): Promise<void> {
    await this.persist(movie.id.value, movie)
  }

  public async delete(movie: BackofficeMultimediaMovie): Promise<void> {
    await this.erase(movie.id.value)
  }

  public async search(
    id: BackofficeMultimediaMovieId
  ): Promise<BackofficeMultimediaMovie | null> {
    const movie = await this.findById<BackofficeMultimediaMovieMongoDocument>(
      id.value
    )
    return movie !== null
      ? BackofficeMultimediaMovie.fromPrimitives({
          id: movie._id.toString(),
          title: movie.title,
          releaseYear: movie.releaseYear,
          synopsis: movie.synopsis,
          categories: movie.categories,
          videoId: movie.videoId
        })
      : null
  }

  protected collectionName(): string {
    return 'backoffice-multimedia-movies'
  }
}
