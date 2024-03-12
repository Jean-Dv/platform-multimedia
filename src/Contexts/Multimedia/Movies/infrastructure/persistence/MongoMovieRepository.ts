import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'
import { Movie } from '../../domain/Movie'
import { type MovieRepository } from '../../domain/MovieRepository'
import { type Criteria } from '@Shared/domain/criteria/Criteria'
import { type MovieId } from '@Multimedia/Movies/domain/MovieId'
import { type CategoryName } from '@Multimedia/Shared/domain/Category/CategoryName'
import { type UUID } from 'mongodb'

interface MovieDocument {
  _id: UUID
  id: string
  title: string
  releaseYear: number
  synopsis: string
  categories: string[]
  videoId: string
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
        id: document._id.toString(),
        title: document.title,
        releaseYear: document.releaseYear,
        synopsis: document.synopsis,
        categories: document.categories,
        videoId: document.videoId
      })
    )
  }

  public async matching(criteria: Criteria): Promise<Movie[]> {
    const documents = await this.searchByCriteria<MovieDocument>(criteria)
    return documents.map((document) =>
      Movie.fromPrimitives({
        id: document._id.toString(),
        title: document.title,
        releaseYear: document.releaseYear,
        synopsis: document.synopsis,
        categories: document.categories,
        videoId: document.videoId
      })
    )
  }

  public async search(id: MovieId): Promise<Movie | null> {
    const collection = await this.collection()
    const document = await collection.findOne<MovieDocument>({ id: id.value })
    return document !== null
      ? Movie.fromPrimitives({
          id: document._id.toString(),
          title: document.title,
          releaseYear: document.releaseYear,
          synopsis: document.synopsis,
          categories: document.categories,
          videoId: document.videoId
        })
      : null
  }

  public async updateMoviesByCategory(name: CategoryName): Promise<void> {
    const collection = await this.collection()
    await collection.updateMany(
      { category: { $eq: name.value } },
      { $set: { category: 'other' } }
    )
  }

  public async delete(id: MovieId): Promise<void> {
    await this.erase(id.value)
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
