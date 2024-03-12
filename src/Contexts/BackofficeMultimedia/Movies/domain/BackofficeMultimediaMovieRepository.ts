import { type BackofficeMultimediaMovie } from './BackofficeMultimediaMovie'
import { type BackofficeMultimediaMovieId } from './BackofficeMultimediaMovieId'

/**
 * Interface for the repository of backoffice multimedia movies.
 */
export interface BackofficeMultimediaMovieRepository {
  /**
   * Saves a backoffice multimedia movie to the repository.
   *
   * @param movie - The backoffice multimedia movie to be saved.
   */
  save: (movie: BackofficeMultimediaMovie) => Promise<void>

  /**
   * Deletes a backoffice multimedia movie from the repository.
   *
   * @param movie - The backoffice multimedia movie to be deleted.
   */
  delete: (movie: BackofficeMultimediaMovie) => Promise<void>

  /**
   * Searches for a backoffice multimedia movie by its id.
   *
   * @param id - The id of the backoffice multimedia movie to be searched.
   * @returns The backoffice multimedia movie if found, null otherwise.
   */
  search: (
    id: BackofficeMultimediaMovieId
  ) => Promise<BackofficeMultimediaMovie | null>
}
