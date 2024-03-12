import { type BackofficeMultimediaVideo } from './BackofficeMultimediaVideo'

/**
 * Interface for the repository of backoffice multimedia videos.
 */
export interface BackofficeMultimediaVideoRepository {
  /**
   * Saves a backoffice multimedia video to the repository.
   *
   * @param video - The backoffice multimedia video to be saved.
   */
  save: (video: BackofficeMultimediaVideo) => Promise<void>
}
