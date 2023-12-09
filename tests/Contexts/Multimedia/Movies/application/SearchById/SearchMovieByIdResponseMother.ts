import { MovieWithPermissionResponse } from '@Multimedia/Movies/application/MovieWithPermissionResponse'
import { type Movie } from '@Multimedia/Movies/domain/Movie'

export class SearchMovieByIdResponseMother {
  public static create(movie: Movie): MovieWithPermissionResponse {
    return new MovieWithPermissionResponse(movie)
  }
}
