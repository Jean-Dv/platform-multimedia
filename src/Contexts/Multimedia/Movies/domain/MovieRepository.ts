import { type Criteria } from '@Shared/domain/criteria/Criteria'
import { type Movie } from './Movie'
import { type MovieId } from './MovieId'
import { type CategoryName } from '@Multimedia/Shared/domain/Category/CategoryName'

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

  /**
   * Retrieves movies that match the specified criteria.
   *
   * @param criteria - The criteria used for matching movies.
   * @returns A promise that resolves to an array of matched movies.
   */
  matching: (criteria: Criteria) => Promise<Movie[]>

  /**
   * Retrieves a movie by its id.
   *
   * @param id - The id of the movie to be retrieved.
   * @returns A promise that resolves to the movie with the specified id, or null if not found.
   */
  search: (id: MovieId) => Promise<Movie | null>

  /**
   * Updates the category of movies.
   *
   * @param nameCategory - The name of the category.
   */
  updateMoviesByCategory: (name: CategoryName) => Promise<void>

  /**
   * Deletes a movie from the repository.
   *
   * @param id - The id of the movie to be deleted.
   */
  delete: (id: MovieId) => Promise<void>
}
