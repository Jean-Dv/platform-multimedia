import { type BackofficeMultimediaMovie } from './BackofficeMultimediaMovie'

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
}
