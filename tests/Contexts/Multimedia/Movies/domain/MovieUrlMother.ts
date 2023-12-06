import { MovieUrl } from '@Multimedia/Movies/domain/MovieUrl'
import { InternetMother } from '../../../Shared/domain/InternetMother'
import { WordMother } from '../../../Shared/domain/WordMother'

export class MovieUrlMother {
  public static create(value: string): MovieUrl {
    return new MovieUrl(value)
  }

  public static random(): MovieUrl {
    return this.create(InternetMother.random().url({ protocol: 'https' }))
  }

  public static invalid(): string {
    return WordMother.random({ max: 5 })
  }
}
