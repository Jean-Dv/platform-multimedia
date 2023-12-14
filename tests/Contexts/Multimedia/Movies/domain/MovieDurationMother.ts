import { MovieDuration } from '@Multimedia/Movies/domain/MovieDuration'

export class MovieDurationMother {
  public static create(value: number): MovieDuration {
    return new MovieDuration(value)
  }

  public static random(): MovieDuration {
    return this.create(Math.abs(Math.floor(Math.random() * 1000)))
  }

  public static invalid(): number {
    return -1
  }
}
