import { type MovieRepository } from '../../domain/MovieRepository'
import { Movie } from '../../domain/Movie'

/**
 * Class responsible for creating and storing movie entities.
 */
export class MovieCreator {
  constructor(private readonly repository: MovieRepository) {}

  /**
   * Creates a new movie with the provided information, saves it to the repository,
   * and publishes any domain events associated with user creation.
   *
   * @param params - The parameters needed to create the movie.
   */
  public async run(
    id: string,
    title: string,
    releaseYear: number,
    synopsis: string,
    categories: string[],
    videoId: string
  ): Promise<void> {
    const movie = Movie.fromPrimitives({
      id,
      title,
      releaseYear,
      synopsis,
      categories,
      videoId
    })

    await this.repository.save(movie)
  }
}
