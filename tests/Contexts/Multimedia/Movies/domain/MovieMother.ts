import { type CreateMovieCommand } from '@Multimedia/Movies/domain/CreateMovieCommand'
import { Movie } from '@Multimedia/Movies/domain/Movie'
import { MovieDuration } from '@Multimedia/Movies/domain/MovieDuration'
import { MovieId } from '@Multimedia/Movies/domain/MovieId'
import { MovieReleaseDate } from '@Multimedia/Movies/domain/MovieReleaseDate'
import { MovieTitle } from '@Multimedia/Movies/domain/MovieTitle'
import { MovieIdMother } from './MovieIdMother'
import { MovieTitleMother } from './MovieTitleMother'
import { MovieReleaseDateMother } from './MovieReleaseDateMother'
import { MovieDurationMother } from './MovieDurationMother'
import { MovieUrl } from '@Multimedia/Movies/domain/MovieUrl'
import { MovieUrlMother } from './MovieUrlMother'
import { CategoryName } from '@Multimedia/Shared/domain/Category/CategoryName'
import { CategoryNameMother } from '../../Categories/domain/CategoryNameMother'

export class MovieMother {
  public static create(
    id: MovieId,
    category: CategoryName,
    title: MovieTitle,
    releaseDate: MovieReleaseDate,
    url: MovieUrl,
    duration: MovieDuration
  ): Movie {
    return new Movie(id, category, title, releaseDate, url, duration)
  }

  public static from(command: CreateMovieCommand): Movie {
    return this.create(
      new MovieId(command.id),
      new CategoryName(command.category),
      new MovieTitle(command.title),
      new MovieReleaseDate(new Date(command.releaseDate)),
      new MovieUrl(command.url),
      new MovieDuration(command.duration)
    )
  }

  public static random(): Movie {
    return this.create(
      MovieIdMother.random(),
      CategoryNameMother.random(),
      MovieTitleMother.random(),
      MovieReleaseDateMother.random(),
      MovieUrlMother.random(),
      MovieDurationMother.random()
    )
  }
}
