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

export class MovieMother {
  public static create(
    id: MovieId,
    title: MovieTitle,
    releaseDate: MovieReleaseDate,
    duration: MovieDuration
  ): Movie {
    return new Movie(id, title, releaseDate, duration)
  }

  public static from(command: CreateMovieCommand): Movie {
    return this.create(
      new MovieId(command.id),
      new MovieTitle(command.title),
      new MovieReleaseDate(new Date(command.releaseDate)),
      new MovieDuration(command.duration)
    )
  }

  public static random(): Movie {
    return this.create(
      MovieIdMother.random(),
      MovieTitleMother.random(),
      MovieReleaseDateMother.random(),
      MovieDurationMother.random()
    )
  }
}
