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
import { MovieUrl } from '@Multimedia/Movies/domain/MovieUrl'
import { ChapterUrl } from '@Multimedia/Chapter/domain/ChapterUrl'
import { type PlaylistRepository } from '@Multimedia/Playlists/domain/PlaylistRepository'
import { Playlist } from '@Multimedia/Playlists/domain/Playlist'
import { PlaylistId } from '@Multimedia/Playlists/domain/PlaylistId'
import { UserId } from '@Auth/Shared/domain/User/UserId'
import { PlaylistName } from '@Multimedia/Playlists/domain/PlaylistName'
import { type CategoryRepository } from '@Multimedia/Categories/domain/CategoryRepository'
import { Category } from '@Multimedia/Categories/domain/Category'
import { CategoryId } from '@Multimedia/Categories/domain/CategoryId'
import { CategoryName } from '@Multimedia/Categories/domain/CategoryName'

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

const playlistsRepository: PlaylistRepository = container.get(
  'Multimedia.Playlists.domain.PlaylistRepository'
)

const categoriesRepository: CategoryRepository = container.get(
  'Multimedia.Categories.domain.CategoryRepository'
)

Given('there is the movie:', async (movie: string) => {
  const { id, title, releaseDate, url, duration } = JSON.parse(movie)
  await moviesRepository.save(
    new Movie(
      new MovieId(id),
      new MovieTitle(title),
      new MovieReleaseDate(releaseDate),
      new MovieUrl(url),
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
  const { id, seasonId, title, releaseDate, url, duration } =
    JSON.parse(chapter)
  await chaptersRepository.save(
    new Chapter(
      new ChapterId(id),
      new SeasonId(seasonId),
      new ChapterTitle(title),
      new ChapterReleaseDate(releaseDate),
      new ChapterUrl(url),
      new ChapterDuration(duration)
    )
  )
})

Given('there is the playlist:', async (playlist: string) => {
  const { id, userId, name, movies, series } = JSON.parse(playlist)
  await playlistsRepository.save(
    new Playlist(
      new PlaylistId(id),
      new PlaylistName(name),
      new UserId(userId),
      series.map((serieId: string) => new SerieId(serieId)),
      movies.map((movieId: string) => new MovieId(movieId))
    )
  )
})

Given('there is the category:', async (category: string) => {
  const { id, name } = JSON.parse(category)
  await categoriesRepository.save(
    new Category(new CategoryId(id), new CategoryName(name))
  )
})
