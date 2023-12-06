import { type CreateUserCommand } from '@Auth/User/domain/CreateUserCommand'
import { type UserEmail } from '@Auth/User/domain/UserEmail'
import { type UserFirstName } from '@Auth/User/domain/UserFirstName'
import { type UserLastName } from '@Auth/User/domain/UserLastName'
import { type UserPassword } from '@Auth/User/domain/UserPassword'
import { UserEmailMother } from '../../domain/UserEmailMother'
import { UserFirstNameMother } from '../../domain/UserFirstNameMother'
import { UserLastNameMother } from '../../domain/UserLastNameMother'
import { UserPasswordMother } from '../../domain/UserPasswordMother'
import { UserId } from '@Auth/Shared/domain/User/UserId'

export class CreateUserCommandMother {
  public static create(
    id: UserId,
    firstName: UserFirstName,
    lastName: UserLastName,
    email: UserEmail,
    password: UserPassword
  ): CreateUserCommand {
    return {
      id: id.value,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value
    }
  }

  public static random(): CreateUserCommand {
    return this.create(
      UserId.random(),
      UserFirstNameMother.random(),
      UserLastNameMother.random(),
      UserEmailMother.random(),
      UserPasswordMother.random()
    )
  }

  public static invalid(): CreateUserCommand {
    return {
      id: UserId.random().value,
      firstName: UserFirstNameMother.random().value,
      lastName: UserLastNameMother.random().value,
      email: UserEmailMother.invalid(),
      password: UserPasswordMother.invalid()
    }
  }
}
