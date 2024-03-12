import { MovieId } from '@Multimedia/Movies/domain/MovieId'
import { type MovieRepository } from '@Multimedia/Movies/domain/MovieRepository'

/**
 * Service for deleting a movie
 */
export class MovieDeletor {
  constructor(private readonly repository: MovieRepository) {}

  /**
   * Removes a movie from the repository.
   *
   * @param idFromEvent - The id of the movie to be deleted.
   */
  public async run(idFromEvent: string): Promise<void> {
    const id = new MovieId(idFromEvent)

    await this.repository.delete(id)
  }
}
