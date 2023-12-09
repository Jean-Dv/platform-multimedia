import { type MovieId } from '@Multimedia/Movies/domain/MovieId'
import { type MovieRepository } from '@Multimedia/Movies/domain/MovieRepository'
import { MovieWithPermissionResponse } from '../MovieWithPermissionResponse'
import { MovieNotFound } from '@Multimedia/Movies/domain/MovieNotFound'

export class MovieByIdSearcher {
  constructor(private readonly repository: MovieRepository) {}

  public async run(id: MovieId): Promise<MovieWithPermissionResponse> {
    const movie = await this.repository.search(id)
    if (movie === null) {
      throw new MovieNotFound(`Movie with id <${id.value}> not found`)
    }
    return new MovieWithPermissionResponse(movie)
  }
}
