import { Movie } from '@Multimedia/Movies/domain/Movie'
import { type MovieId } from '@Multimedia/Movies/domain/MovieId'
import { MovieNotFound } from '@Multimedia/Movies/domain/MovieNotFound'
import { type MovieRepository } from '@Multimedia/Movies/domain/MovieRepository'
import { type EventBus } from '@Shared/domain/EventBus'

export class MovieDeletor {
  constructor(
    private readonly repository: MovieRepository,
    private readonly eventBus: EventBus
  ) {}

  public async run(id: MovieId): Promise<void> {
    const movie = await this.repository.search(id)
    if (movie === null) {
      throw new MovieNotFound(`The movie <${id.value}> does not exist`)
    }
    const movieToDelete = Movie.delete(
      movie.id,
      movie.category,
      movie.title,
      movie.releaseDate,
      movie.url,
      movie.duration
    )
    await this.repository.delete(movieToDelete.id)
    await this.eventBus.publish(movieToDelete.pullDomainEvents())
  }
}
