import { SeasonTitle } from '@Multimedia/Season/domain/SeasonTitle'
import { WordMother } from '../../../Shared/domain/WordMother'

export class SeasonTitleMother {
  public static create(value: string): SeasonTitle {
    return new SeasonTitle(value)
  }

  public static random(): SeasonTitle {
    return this.create(WordMother.random({ max: 5 }))
  }

  public static invalid(): string {
    return WordMother.random({ max: 50 })
  }
}
