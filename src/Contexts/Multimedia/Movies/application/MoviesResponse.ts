import { type Movie } from '../domain/Movie'

interface MovieResponse {
  id: string
  title: string
  releaseYear: number
  synopsis: string
  categories: string[]
  videoId: string
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
        releaseYear: movie.releaseYear.value,
        synopsis: movie.synopsis.value,
        categories: movie.categories.map((category) => category.value),
        videoId: movie.videoId.value
      }
    })
  }
}
