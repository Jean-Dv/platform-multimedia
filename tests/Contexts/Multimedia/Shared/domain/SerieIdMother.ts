import { SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'
import { UuidMother } from '../../../Shared/domain/UuidMother'

export class SerieIdMother {
  public static create(value: string): SerieId {
    return new SerieId(value)
  }

  public static random(): SerieId {
    return new SerieId(UuidMother.random())
  }
}
