import { Given } from '@cucumber/cucumber'
import { container } from '../../../../../../src/apps/backoffice-multimedia/backend/dependency-injection'
import { BackofficeMultimediaCategory } from '@BackofficeMultimedia/Categories/domain/BackofficeMultimediaCategory'
import { BackofficeMultimediaCategoryId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaCategoryId'
import { BackofficeMultimediaCategoryName } from '@BackofficeMultimedia/Categories/domain/BackofficeMultimediaCategoryName'
import { type BackofficeMultimediaCategoryRepository } from '@BackofficeMultimedia/Categories/domain/BackofficeMultimediaCategoryRepository'
import { type BackofficeMultimediaSerieRepository } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieRepository'
import { BackofficeMultimediaSerie } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerie'
import { BackofficeMultimediaSerieId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSerieId'
import { BackofficeMultimediaSerieTitle } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieTitle'
import { BackofficeMultimediaSerieReleaseYear } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieReleaseYear'
import { BackofficeMultimediaSerieSynopsis } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieSynopsis'
import { type BackofficeMultimediaSeasonRepository } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonRepository'
import { BackofficeMultimediaSeason } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeason'
import { BackofficeMultimediaSeasonId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSeasonId'
import { BackofficeMultimediaSeasonTitle } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonTitle'
import { BackofficeMultimediaSeasonReleaseYear } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonReleaseYear'
import { type BackofficeMultimediaChapterRepository } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterRepository'
import { BackofficeMultimediaChapter } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapter'
import { BackofficeMultimediaChapterId } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterId'
import { BackofficeMultimediaChapterTitle } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterTitle'
import { BackofficeMultimediaChapterReleaseYear } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterReleaseYear'
import { BackofficeMultimediaVideoId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaVideoId'
import { type BackofficeMultimediaMovieRepository } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieRepository'
import { BackofficeMultimediaMovie } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovie'
import { BackofficeMultimediaMovieId } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieId'
import { BackofficeMultimediaMovieTitle } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieTitle'
import { BackofficeMultimediaMovieReleaseYear } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieReleaseYear'
import { BackofficeMultimediaMovieSynopsis } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieSynopsis'

const categoriesRepository: BackofficeMultimediaCategoryRepository =
  container.get('BackofficeMultimedia.Categories.domain.CategoryRepository')

const serieRepository: BackofficeMultimediaSerieRepository = container.get(
  'BackofficeMultimedia.Series.domain.SerieRepository'
)

const seasonRepository: BackofficeMultimediaSeasonRepository = container.get(
  'BackofficeMultimedia.Seasons.domain.SeasonRepository'
)

const chapterRepository: BackofficeMultimediaChapterRepository = container.get(
  'BackofficeMultimedia.Chapters.domain.ChapterRepository'
)

const movieRepository: BackofficeMultimediaMovieRepository = container.get(
  'BackofficeMultimedia.Movies.domain.MovieRepository'
)

Given('there is the category:', async (category: string) => {
  const { id, name } = JSON.parse(category)
  await categoriesRepository.save(
    new BackofficeMultimediaCategory(
      new BackofficeMultimediaCategoryId(id),
      new BackofficeMultimediaCategoryName(name)
    )
  )
})

Given('there is the serie:', async (serie: string) => {
  const { id, title, synopsis, releaseYear, categories } = JSON.parse(serie)
  await serieRepository.save(
    new BackofficeMultimediaSerie(
      new BackofficeMultimediaSerieId(id),
      new BackofficeMultimediaSerieTitle(title),
      new BackofficeMultimediaSerieReleaseYear(releaseYear),
      new BackofficeMultimediaSerieSynopsis(synopsis),
      categories.map(
        (category: string) => new BackofficeMultimediaCategoryId(category)
      )
    )
  )
})

Given('there is the season:', async (season: string) => {
  const { id, title, releaseYear, serie } = JSON.parse(season)
  await seasonRepository.save(
    new BackofficeMultimediaSeason(
      new BackofficeMultimediaSeasonId(id),
      new BackofficeMultimediaSeasonTitle(title),
      new BackofficeMultimediaSeasonReleaseYear(releaseYear),
      new BackofficeMultimediaSerieId(serie)
    )
  )
})

Given('there is the chapter:', async (chapter: string) => {
  const { id, title, releaseYear, season, video } = JSON.parse(chapter)
  await chapterRepository.save(
    new BackofficeMultimediaChapter(
      new BackofficeMultimediaChapterId(id),
      new BackofficeMultimediaChapterTitle(title),
      new BackofficeMultimediaChapterReleaseYear(releaseYear),
      new BackofficeMultimediaSeasonId(season),
      new BackofficeMultimediaVideoId(video)
    )
  )
})

Given('there is the movie:', async (movie: string) => {
  const { id, title, releaseYear, synopsis, categories, videoId } =
    JSON.parse(movie)
  await movieRepository.save(
    new BackofficeMultimediaMovie(
      new BackofficeMultimediaMovieId(id),
      new BackofficeMultimediaMovieTitle(title),
      new BackofficeMultimediaMovieReleaseYear(releaseYear),
      new BackofficeMultimediaMovieSynopsis(synopsis),
      categories.map(
        (category: string) => new BackofficeMultimediaCategoryId(category)
      ),
      new BackofficeMultimediaVideoId(videoId)
    )
  )
})
