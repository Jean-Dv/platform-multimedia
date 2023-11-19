import { UserId } from '@Auth/Shared/domain/User/UserId'
import { UuidMother } from '../../../../Shared/domain/UuidMother'

export class UserIdMother {
  public static create(value: string): UserId {
    return new UserId(value)
  }

  public static random(): UserId {
    return new UserId(UuidMother.random())
  }
}
