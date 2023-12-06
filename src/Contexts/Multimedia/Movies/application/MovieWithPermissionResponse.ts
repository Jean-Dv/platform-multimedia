import { type Movie } from '../domain/Movie'

interface MovieResponse {
  id: string
  title: string
  releaseDate: Date
  url: string
  duration: number
}

export class MovieWithPermissionResponse {
  public readonly movie: MovieResponse

  constructor(movie: Movie) {
    this.movie = movie.toPrimitives()
  }
}
