import { MovieId } from '@Multimedia/Movies/domain/MovieId'
import { UuidMother } from '../../../Shared/domain/UuidMother'

export class MovieIdMother {
  public static create(value: string): MovieId {
    return new MovieId(value)
  }

  public static random(): MovieId {
    return new MovieId(UuidMother.random())
  }
}
