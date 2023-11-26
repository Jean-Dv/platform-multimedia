import { MovieReleaseDate } from '@Multimedia/Movies/domain/MovieReleaseDate'
import { DateMother } from '../../../Shared/domain/DateMother'

export class MovieReleaseDateMother {
  public static create(value: Date): MovieReleaseDate {
    return new MovieReleaseDate(value)
  }

  public static random(): MovieReleaseDate {
    return this.create(DateMother.random().past())
  }
}
