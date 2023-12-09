import { MovieTitle } from '@Multimedia/Movies/domain/MovieTitle'
import { WordMother } from '../../../Shared/domain/WordMother'

export class MovieTitleMother {
  public static create(value: string): MovieTitle {
    return new MovieTitle(value)
  }

  public static random(): MovieTitle {
    return this.create(WordMother.random({ max: 10 }))
  }

  public static invalid(): string {
    return WordMother.random({ max: 101 })
  }
}
