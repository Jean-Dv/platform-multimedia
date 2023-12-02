import { ChapterTitle } from '@Multimedia/Chapter/domain/ChapterTitle'
import { WordMother } from '../../../Shared/domain/WordMother'

export class ChapterTitleMother {
  public static create(value: string): ChapterTitle {
    return new ChapterTitle(value)
  }

  public static random(): ChapterTitle {
    return this.create(WordMother.random({ max: 5 }))
  }

  public static invalid(): string {
    return WordMother.random({ max: 50 })
  }
}
