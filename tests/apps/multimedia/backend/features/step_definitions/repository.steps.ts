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
import { type SeasonRepository } from '@Multimedia/Season/domain/SeasonRepository'
import { type ChapterRepository } from '@Multimedia/Chapter/domain/ChapterRepository'
import { Season } from '@Multimedia/Season/domain/Season'
import { SeasonId } from '@Multimedia/Shared/domain/Season/SeasonId'
import { SeasonTitle } from '@Multimedia/Season/domain/SeasonTitle'
import { SeasonReleaseDate } from '@Multimedia/Season/domain/SeasonReleaseDate'
import { Chapter } from '@Multimedia/Chapter/domain/Chapter'
import { ChapterId } from '@Multimedia/Chapter/domain/ChapterId'
import { ChapterTitle } from '@Multimedia/Chapter/domain/ChapterTitle'
import { ChapterReleaseDate } from '@Multimedia/Chapter/domain/ChapterReleaseDate'
import { ChapterDuration } from '@Multimedia/Chapter/domain/ChapterDuration'

const moviesRepository: MovieRepository = container.get(
  'Multimedia.Movies.domain.MovieRepository'
)

const seriesRepository: SerieRepository = container.get(
  'Multimedia.Series.domain.SerieRepository'
)

const seasonsRepository: SeasonRepository = container.get(
  'Multimedia.Seasons.domain.SeasonRepository'
)

const chaptersRepository: ChapterRepository = container.get(
  'Multimedia.Chapters.domain.ChapterRepository'
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

Given('there is the serie:', async (serie: string) => {
  const { id, title, releaseDate } = JSON.parse(serie)
  await seriesRepository.save(
    new Serie(
      new SerieId(id),
      new SerieTitle(title),
      new SerieReleaseDate(releaseDate)
    )
  )
})

Given('there is the season:', async (season: string) => {
  const { id, serieId, title, releaseDate } = JSON.parse(season)
  await seasonsRepository.save(
    new Season(
      new SeasonId(id),
      new SerieId(serieId),
      new SeasonTitle(title),
      new SeasonReleaseDate(releaseDate)
    )
  )
})

Given('there is the chapter:', async (chapter: string) => {
  const { id, seasonId, title, releaseDate, duration } = JSON.parse(chapter)
  await chaptersRepository.save(
    new Chapter(
      new ChapterId(id),
      new SeasonId(seasonId),
      new ChapterTitle(title),
      new ChapterReleaseDate(releaseDate),
      new ChapterDuration(duration)
    )
  )
})
