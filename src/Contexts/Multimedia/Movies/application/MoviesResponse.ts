import { type Movie } from '../domain/Movie'

interface MovieResponse {
  id: string
  title: string
  releaseDate: Date
  duration: number
}

/**
 * Represents a response containing a list of movies.
 */
export class MoviesResponse {
  public readonly movies: MovieResponse[]

  constructor(movies: Movie[]) {
    this.movies = movies.map((movie) => {
      return {
        id: movie.id.value,
        title: movie.title.value,
        releaseDate: movie.releaseDate.value,
        duration: movie.duration.value
      }
    })
  }
}
