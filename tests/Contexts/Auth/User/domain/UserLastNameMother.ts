import { UserLastName } from '@Auth/User/domain/UserLastName'
import { PersonMother } from '../../../Shared/domain/PersonMother'

export class UserLastNameMother {
  public static create(value: string): UserLastName {
    return new UserLastName(value)
  }

  public static random(): UserLastName {
    return new UserLastName(PersonMother.random().lastName())
  }
}
