import { type Movie } from '@Multimedia/Movies/domain/Movie'
import { type MovieRepository } from '@Multimedia/Movies/domain/MovieRepository'

/**
 * Represents a service responsible for finding and retrieving movies.
 */
export class MoviesFinder {
  constructor(private readonly repository: MovieRepository) {
    this.repository = repository
  }

  /**
   * Executes the movies finding operation.
   *
   * @returns A Promise that resolves to an array of Movie instances.
   */
  public async run(): Promise<Movie[]> {
    const movies = await this.repository.searchAll()
    return movies
  }
}
