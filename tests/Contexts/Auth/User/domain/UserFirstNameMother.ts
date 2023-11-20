import { UserFirstName } from '@Auth/User/domain/UserFirstName'
import { PersonMother } from '../../../Shared/domain/PersonMother'

export class UserFirstNameMother {
  public static create(value: string): UserFirstName {
    return new UserFirstName(value)
  }

  public static random(): UserFirstName {
    return new UserFirstName(PersonMother.random().firstName())
  }
}
