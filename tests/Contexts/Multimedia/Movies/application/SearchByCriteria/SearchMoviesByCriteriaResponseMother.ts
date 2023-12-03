import { MoviesResponse } from '@Multimedia/Movies/application/MoviesResponse'
import { type Movie } from '@Multimedia/Movies/domain/Movie'

export class SearchMoviesByCriteriaResponseMother {
  public static create(courses: Movie[]): MoviesResponse {
    return new MoviesResponse(courses)
  }
}
