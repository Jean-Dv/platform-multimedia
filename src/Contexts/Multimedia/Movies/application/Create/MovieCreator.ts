import { type EventBus } from '@Shared/domain/EventBus'
import { type MovieRepository } from '../../domain/MovieRepository'
import { type MovieId } from '../../domain/MovieId'
import { type MovieTitle } from '../../domain/MovieTitle'
import { type MovieReleaseDate } from '../../domain/MovieReleaseDate'
import { type MovieDuration } from '../../domain/MovieDuration'
import { Movie } from '../../domain/Movie'
import { type MovieUrl } from '../../domain/MovieUrl'

/**
 * Class responsible for creating and storing movie entities.
 */
export class MovieCreator {
  constructor(
    private readonly repository: MovieRepository,
    private readonly eventBus: EventBus
  ) {}

  /**
   * Creates a new movie with the provided information, saves it to the repository,
   * and publishes any domain events associated with user creation.
   *
   * @param params - The parameters needed to create the movie.
   */
  public async run(params: {
    id: MovieId
    title: MovieTitle
    releaseDate: MovieReleaseDate
    url: MovieUrl
    duration: MovieDuration
  }): Promise<void> {
    const movie = Movie.create(
      params.id,
      params.title,
      params.releaseDate,
      params.url,
      params.duration
    )
    await this.repository.save(movie)
    await this.eventBus.publish(movie.pullDomainEvents())
  }
}
