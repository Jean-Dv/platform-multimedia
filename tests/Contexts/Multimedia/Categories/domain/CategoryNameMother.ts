import { CategoryName } from '@Multimedia/Categories/domain/CategoryName'
import { WordMother } from '../../../Shared/domain/WordMother'

export class CategoryNameMother {
  public static create(value: string): CategoryName {
    return new CategoryName(value)
  }

  public static random(): CategoryName {
    return this.create(WordMother.random({ max: 2 }))
  }

  public static invalid(): string {
    return WordMother.random({ max: 10 })
  }
}
