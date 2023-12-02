import { ChapterId } from '@Multimedia/Chapter/domain/ChapterId'
import { UuidMother } from '../../../Shared/domain/UuidMother'

export class ChapterIdMother {
  public static create(value: string): ChapterId {
    return new ChapterId(value)
  }

  public static random(): ChapterId {
    return this.create(UuidMother.random())
  }
}
