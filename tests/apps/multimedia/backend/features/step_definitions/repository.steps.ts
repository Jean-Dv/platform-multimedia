import { Movie } from '@Multimedia/Movies/domain/Movie'
import { MovieDuration } from '@Multimedia/Movies/domain/MovieDuration'
import { MovieId } from '@Multimedia/Movies/domain/MovieId'
import { MovieReleaseDate } from '@Multimedia/Movies/domain/MovieReleaseDate'
import { type MovieRepository } from '@Multimedia/Movies/domain/MovieRepository'
import { MovieTitle } from '@Multimedia/Movies/domain/MovieTitle'
import { Given } from '@cucumber/cucumber'
import { container } from '../../../../../../src/apps/multimedia/backend/dependency-injection'
import { type SerieRepository } from '@Multimedia/Serie/domain/SerieRepository'
import { Serie } from '@Multimedia/Serie/domain/Serie'
import { SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'
import { SerieTitle } from '@Multimedia/Serie/domain/SerieTitle'
import { SerieReleaseDate } from '@Multimedia/Serie/domain/SerieReleaseDate'

const moviesRepository: MovieRepository = container.get(
  'Multimedia.Movies.domain.MovieRepository'
)

const seriesRepository: SerieRepository = container.get(
  'Multimedia.Series.domain.SerieRepository'
)

Given('there is the movie:', async (movie: string) => {
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

Given('there is the serie:', async (movie: string) => {
  const { id, title, releaseDate } = JSON.parse(movie)
  await seriesRepository.save(
    new Serie(
      new SerieId(id),
      new SerieTitle(title),
      new SerieReleaseDate(releaseDate)
    )
  )
})
