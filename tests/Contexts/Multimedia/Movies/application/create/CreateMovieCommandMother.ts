import { type CreateMovieCommand } from '@Multimedia/Movies/domain/CreateMovieCommand'
import { type MovieDuration } from '@Multimedia/Movies/domain/MovieDuration'
import { type MovieId } from '@Multimedia/Movies/domain/MovieId'
import { type MovieReleaseDate } from '@Multimedia/Movies/domain/MovieReleaseDate'
import { type MovieTitle } from '@Multimedia/Movies/domain/MovieTitle'
import { MovieDurationMother } from '../../domain/MovieDurationMother'
import { MovieIdMother } from '../../domain/MovieIdMother'
import { MovieReleaseDateMother } from '../../domain/MovieReleaseDateMother'
import { MovieTitleMother } from '../../domain/MovieTitleMother'
import { type MovieUrl } from '@Multimedia/Movies/domain/MovieUrl'
import { MovieUrlMother } from '../../domain/MovieUrlMother'

export class CreateMovieCommandMother {
  public static create(
    id: MovieId,
    title: MovieTitle,
    releaseDate: MovieReleaseDate,
    url: MovieUrl,
    duration: MovieDuration
  ): CreateMovieCommand {
    return {
      id: id.value,
      title: title.value,
      releaseDate: releaseDate.value,
      url: url.value,
      duration: duration.value
    }
  }

  public static random(): CreateMovieCommand {
    return this.create(
      MovieIdMother.random(),
      MovieTitleMother.random(),
      MovieReleaseDateMother.random(),
      MovieUrlMother.random(),
      MovieDurationMother.random()
    )
  }

  public static invalid(): CreateMovieCommand {
    return {
      id: MovieIdMother.random().value,
      title: MovieTitleMother.invalid(),
      releaseDate: MovieReleaseDateMother.random().value,
      url: MovieUrlMother.invalid(),
      duration: MovieDurationMother.random().value
    }
  }
}
