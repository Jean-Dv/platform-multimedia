import { type BackofficeMultimediaMovieRepository } from './../../domain/BackofficeMultimediaMovieRepository'
import { type BackofficeMultimediaMovie } from './../../domain/BackofficeMultimediaMovie'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'

export class MongoBackofficeMultimediaMovieRepository
  extends MongoRepository<BackofficeMultimediaMovie>
  implements BackofficeMultimediaMovieRepository
{
  public async save(movie: BackofficeMultimediaMovie): Promise<void> {
    await this.persist(movie.id.value, movie)
  }

  protected collectionName(): string {
    return 'backoffice-multimedia-movies'
  }
}
