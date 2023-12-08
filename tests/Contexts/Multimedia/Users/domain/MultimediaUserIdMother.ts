import { MultimediaUserId } from '@Multimedia/Users/domain/MultimediaUserId'
import { UuidMother } from '../../../Shared/domain/UuidMother'

export class MultimediaUserIdMother {
  public static create(value: string): MultimediaUserId {
    return new MultimediaUserId(value)
  }

  public static random(): MultimediaUserId {
    return this.create(UuidMother.random())
  }
}
