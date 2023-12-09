import { AuthUser } from '@Auth/UserAuth/domain/AuthUser'
import { AuthUserEmailMother } from './AuthUserEmailMother'
import { AuthUserPasswordMother } from './AuthUserPasswordMother'
import { type AuthEmail } from '@Auth/UserAuth/domain/AuthEmail'
import { type AuthPassword } from '@Auth/UserAuth/domain/AuthPassword'
import { type AuthenticateUserCommand } from '@Auth/UserAuth/domain/AuthenticateUserCommand'

export class AuthUserMother {
  public static create(email: AuthEmail, password: AuthPassword): AuthUser {
    return new AuthUser(email, password)
  }

  public static from(command: AuthenticateUserCommand): AuthUser {
    return this.create(
      AuthUserEmailMother.create(command.email),
      AuthUserPasswordMother.create(command.password)
    )
  }

  public static random(): AuthUser {
    return this.create(
      AuthUserEmailMother.random(),
      AuthUserPasswordMother.random()
    )
  }
}
