import { MoviesResponse } from '@Multimedia/Movies/application/MoviesResponse'
import { type Movie } from '@Multimedia/Movies/domain/Movie'
import { type Response } from '@Shared/domain/Response'

export class SearchAllMoviesResponseMother {
  public static create(movies: Movie[]): Response {
    return new MoviesResponse(movies)
  }
}
