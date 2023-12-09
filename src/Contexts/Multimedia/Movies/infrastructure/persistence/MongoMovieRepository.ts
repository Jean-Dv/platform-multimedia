import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'
import { Movie } from '../../domain/Movie'
import { type MovieRepository } from '../../domain/MovieRepository'
import { type Criteria } from '@Shared/domain/criteria/Criteria'
import { type MovieId } from '@Multimedia/Movies/domain/MovieId'
import { type CategoryName } from '@Multimedia/Shared/domain/Category/CategoryName'

interface MovieDocument {
  _id: string
  id: string
  category: string
  title: string
  url: string
  releaseDate: Date
  duration: number
}

/**
 * Repository implementation for manage movies in a MongoDB database.
 */
export class MongoMovieRepository
  extends MongoRepository<Movie>
  implements MovieRepository
{
  public async searchAll(): Promise<Movie[]> {
    const collection = await this.collection()
    const documents = await collection.find<MovieDocument>({}, {}).toArray()
    return documents.map((document) =>
      Movie.fromPrimitives({
        id: document.id,
        category: document.category,
        title: document.title,
        releaseDate: document.releaseDate,
        url: document.url,
        duration: document.duration
      })
    )
  }

  public async matching(criteria: Criteria): Promise<Movie[]> {
    const documents = await this.searchByCriteria<MovieDocument>(criteria)
    return documents.map((document) =>
      Movie.fromPrimitives({
        id: document.id,
        category: document.category,
        title: document.title,
        releaseDate: document.releaseDate,
        url: document.url,
        duration: document.duration
      })
    )
  }

  public async search(id: MovieId): Promise<Movie | null> {
    const collection = await this.collection()
    const document = await collection.findOne<MovieDocument>({ id: id.value })
    return document !== null
      ? Movie.fromPrimitives({
          id: document.id,
          category: document.category,
          title: document.title,
          releaseDate: document.releaseDate,
          url: document.url,
          duration: document.duration
        })
      : null
  }

  public async updateMoviesByCategory(name: CategoryName): Promise<void> {
    const collection = await this.collection()
    await collection.updateMany(
      { category: { $eq: name.value } },
      { $set: { category: '' } }
    )
  }

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
