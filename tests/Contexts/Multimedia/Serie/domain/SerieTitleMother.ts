import { SerieTitle } from '@Multimedia/Serie/domain/SerieTitle'
import { WordMother } from '../../../Shared/domain/WordMother'

export class SerieTitleMother {
  public static create(value: string): SerieTitle {
    return new SerieTitle(value)
  }

  public static random(): SerieTitle {
    return new SerieTitle(WordMother.random({ max: 5 }))
  }

  public static invalid(): string {
    return WordMother.random({ max: 50 })
  }
}
