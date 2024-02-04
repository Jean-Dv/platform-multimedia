import { type Movie } from '../domain/Movie'

interface MovieResponse {
  id: string
  title: string
  releaseYear: number
  synopsis: string
  categories: string[]
  videoId: string
}

export class MovieWithPermissionResponse {
  public readonly movie: MovieResponse

  constructor(movie: Movie) {
    this.movie = movie.toPrimitives()
  }
}
