import { type UserId } from '@Auth/Shared/domain/User/UserId'
import { type CreateUserCommand } from '@Auth/User/domain/CreateUserCommand'
import { User } from '@Auth/User/domain/User'
import { type UserEmail } from '@Auth/User/domain/UserEmail'
import { type UserFirstName } from '@Auth/User/domain/UserFirstName'
import { type UserLastName } from '@Auth/User/domain/UserLastName'
import { type UserPassword } from '@Auth/User/domain/UserPassword'
import { UserIdMother } from '../../Shared/User/domain/UserIdMother'
import { UserFirstNameMother } from './UserFirstNameMother'
import { UserLastNameMother } from './UserLastNameMother'
import { UserEmailMother } from './UserEmailMother'
import { UserPasswordMother } from './UserPasswordMother'

export class UserMother {
  public static create(
    id: UserId,
    firstName: UserFirstName,
    lastName: UserLastName,
    email: UserEmail,
    password: UserPassword
  ): User {
    return new User(id, firstName, lastName, email, password)
  }

  public static from(command: CreateUserCommand): User {
    return this.create(
      UserIdMother.create(command.id),
      UserFirstNameMother.create(command.firstName),
      UserLastNameMother.create(command.lastName),
      UserEmailMother.create(command.email),
      UserPasswordMother.create(command.password)
    )
  }

  public static random(): User {
    return this.create(
      UserIdMother.random(),
      UserFirstNameMother.random(),
      UserLastNameMother.random(),
      UserEmailMother.random(),
      UserPasswordMother.random()
    )
  }
}
