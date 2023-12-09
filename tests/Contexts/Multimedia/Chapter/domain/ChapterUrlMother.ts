import { ChapterUrl } from '@Multimedia/Chapter/domain/ChapterUrl'
import { InternetMother } from '../../../Shared/domain/InternetMother'
import { WordMother } from '../../../Shared/domain/WordMother'

export class ChapterUrlMother {
  public static create(value: string): ChapterUrl {
    return new ChapterUrl(value)
  }

  public static random(): ChapterUrl {
    return this.create(InternetMother.random().url({ protocol: 'https' }))
  }

  public static invalid(): ChapterUrl {
    return this.create(WordMother.random({ max: 5 }))
  }
}
