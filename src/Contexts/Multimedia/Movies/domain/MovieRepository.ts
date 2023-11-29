import { type Movie } from './Movie'

/**
 * Interface for a movie repository, defining methods for saving movie entities.
 */
export interface MovieRepository {
  /**
   * Saves a movie entity to the repository.
   *
   * @param movie The movie entity to be saved.
   */
  save: (movie: Movie) => Promise<void>

  /**
   * Searches and retrieves all movies entities
   * from the repository.
   *
   * @returns A promise that resolves to an array of movie entities.
   */
  searchAll: () => Promise<Movie[]>
}
