import { Movie } from '@Multimedia/Movies/domain/Movie'
import { MovieDuration } from '@Multimedia/Movies/domain/MovieDuration'
import { MovieId } from '@Multimedia/Movies/domain/MovieId'
import { MovieReleaseDate } from '@Multimedia/Movies/domain/MovieReleaseDate'
import { type MovieRepository } from '@Multimedia/Movies/domain/MovieRepository'
import { MovieTitle } from '@Multimedia/Movies/domain/MovieTitle'
import { Given } from '@cucumber/cucumber'
import { container } from '../../../../../../src/apps/multimedia/backend/dependency-injection'

const moviesRepository: MovieRepository = container.get(
  'Multimedia.Movies.domain.MovieRepository'
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Given('there is the movie:', async (movie: any) => {
  const { id, title, releaseDate, duration } = JSON.parse(movie)
  await moviesRepository.save(
    new Movie(
      new MovieId(id),
      new MovieTitle(title),
      new MovieReleaseDate(releaseDate),
      new MovieDuration(duration)
    )
  )
})
