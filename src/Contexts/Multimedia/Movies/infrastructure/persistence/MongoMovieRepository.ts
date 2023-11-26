import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'
import { type Movie } from '../../domain/Movie'
import { type MovieRepository } from '../../domain/MovieRepository'

/**
 * Repository implementation for manage movies in a MongoDB database.
 */
export class MongoMovieRepository
  extends MongoRepository<Movie>
  implements MovieRepository
{
  /**
   * This method is used to save a user in the database.
   *
   * @param movie The movie to save.
   */
  public async save(movie: Movie): Promise<void> {
    await this.persist(movie.id.value, movie)
  }

  /**
   * This method is used to define the name of the collection
   * where the users will be stored.
   *
   * @returns The name of the collection.
   */
  protected collectionName(): string {
    return 'movies'
  }
}
