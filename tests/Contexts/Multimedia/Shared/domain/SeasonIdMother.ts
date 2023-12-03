import { SeasonId } from '@Multimedia/Shared/domain/Season/SeasonId'
import { UuidMother } from '../../../Shared/domain/UuidMother'

export class SeasonIdMother {
  public static create(value: string): SeasonId {
    return new SeasonId(value)
  }

  public static random(): SeasonId {
    return this.create(UuidMother.random())
  }
}
