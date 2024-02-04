import { Movie } from '@Multimedia/Movies/domain/Movie'
import { MovieId } from '@Multimedia/Movies/domain/MovieId'
import { MovieReleaseYear } from '@Multimedia/Movies/domain/MovieReleaseYear'
import { type MovieRepository } from '@Multimedia/Movies/domain/MovieRepository'
import { MovieTitle } from '@Multimedia/Movies/domain/MovieTitle'
import { Given } from '@cucumber/cucumber'
import { container } from '../../../../../../src/apps/multimedia/backend/dependency-injection'
import { type SerieRepository } from '@Multimedia/Serie/domain/SerieRepository'
import { Serie } from '@Multimedia/Serie/domain/Serie'
import { SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'
import { SerieTitle } from '@Multimedia/Serie/domain/SerieTitle'
import { SerieReleaseYear } from '@Multimedia/Serie/domain/SerieReleaseYear'
import { type SeasonRepository } from '@Multimedia/Season/domain/SeasonRepository'
import { type ChapterRepository } from '@Multimedia/Chapter/domain/ChapterRepository'
import { Season } from '@Multimedia/Season/domain/Season'
import { SeasonId } from '@Multimedia/Shared/domain/Season/SeasonId'
import { SeasonTitle } from '@Multimedia/Season/domain/SeasonTitle'
import { SeasonReleaseYear } from '@Multimedia/Season/domain/SeasonReleaseYear'
import { Chapter } from '@Multimedia/Chapter/domain/Chapter'
import { ChapterId } from '@Multimedia/Chapter/domain/ChapterId'
import { ChapterTitle } from '@Multimedia/Chapter/domain/ChapterTitle'
import { ChapterReleaseDate } from '@Multimedia/Chapter/domain/ChapterReleaseDate'
import { ChapterDuration } from '@Multimedia/Chapter/domain/ChapterDuration'
import { ChapterUrl } from '@Multimedia/Chapter/domain/ChapterUrl'
import { type PlaylistRepository } from '@Multimedia/Playlists/domain/PlaylistRepository'
import { Playlist } from '@Multimedia/Playlists/domain/Playlist'
import { PlaylistId } from '@Multimedia/Playlists/domain/PlaylistId'
import { UserId } from '@Auth/Shared/domain/User/UserId'
import { PlaylistName } from '@Multimedia/Playlists/domain/PlaylistName'
import { type CategoryRepository } from '@Multimedia/Categories/domain/CategoryRepository'
import { Category } from '@Multimedia/Categories/domain/Category'
import { CategoryId } from '@Multimedia/Categories/domain/CategoryId'
import { CategoryName } from '@Multimedia/Shared/domain/Category/CategoryName'
import { type MultimediaRoleRepository } from '@Multimedia/Roles/domain/MultimediaRoleRepository'
import { MultimediaRole } from '@Multimedia/Roles/domain/MultimediaRole'
import { MultimediaRoleId } from '@Multimedia/Roles/domain/MultimediaRoleId'
import { MultimediaRoleName } from '@Multimedia/Roles/domain/MultimediaRoleName'
import { MultimediaUser } from '@Multimedia/Users/domain/MultimediaUser'
import { type MultimediaUserRepository } from '@Multimedia/Users/domain/MultimediaUserRepository'
import { MultimediaUserId } from '@Multimedia/Users/domain/MultimediaUserId'
import { SerieSynopsis } from '@Multimedia/Serie/domain/SerieSynopsis'
import { MovieSynopsis } from '@Multimedia/Movies/domain/MovieSynopsis'
import { VideoId } from '@Multimedia/Shared/domain/Video/VideoId'

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

const rolesRepository: MultimediaRoleRepository = container.get(
  'Multimedia.Roles.domain.MultimediaRoleRepository'
)

const usersRepository: MultimediaUserRepository = container.get(
  'Multimedia.Users.domain.MultimediaUserRepository'
)

Given('there is the movie:', async (movie: string) => {
  const { id, title, releaseYear, synopsis, categories, videoId } =
    JSON.parse(movie)
  await moviesRepository.save(
    new Movie(
      new MovieId(id),
      new MovieTitle(title),
      new MovieReleaseYear(releaseYear),
      new MovieSynopsis(synopsis),
      categories.map((category: string) => new CategoryId(category)),
      new VideoId(videoId)
    )
  )
})

Given('there is the serie:', async (serie: string) => {
  const { id, title, releaseYear, synopsis, categories } = JSON.parse(serie)
  await seriesRepository.save(
    new Serie(
      new SerieId(id),
      new SerieTitle(title),
      new SerieReleaseYear(releaseYear),
      new SerieSynopsis(synopsis),
      categories.map((category: string) => new CategoryId(category))
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
      new SeasonReleaseYear(releaseDate)
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

Given('there is the role:', async (role: string) => {
  const { id, name } = JSON.parse(role)
  await rolesRepository.save(
    new MultimediaRole(new MultimediaRoleId(id), new MultimediaRoleName(name))
  )
})

Given('there is the user:', async (user: string) => {
  const { id } = JSON.parse(user)
  await usersRepository.save(new MultimediaUser(new MultimediaUserId(id)))
})
