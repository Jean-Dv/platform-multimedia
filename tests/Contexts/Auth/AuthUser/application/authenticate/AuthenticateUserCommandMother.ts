import { type AuthEmail } from '@Auth/UserAuth/domain/AuthEmail'
import { type AuthPassword } from '@Auth/UserAuth/domain/AuthPassword'
import { type AuthenticateUserCommand } from '@Auth/UserAuth/domain/AuthenticateUserCommand'
import { AuthUserEmailMother } from '../../domain/AuthUserEmailMother'
import { AuthUserPasswordMother } from '../../domain/AuthUserPasswordMother'

export class AuthenticateUserCommandMother {
  public static create(
    email: AuthEmail,
    password: AuthPassword
  ): AuthenticateUserCommand {
    return {
      email: email.value,
      password: password.value
    }
  }

  public static random(): AuthenticateUserCommand {
    return this.create(
      AuthUserEmailMother.random(),
      AuthUserPasswordMother.random()
    )
  }

  public static invalid(): AuthenticateUserCommand {
    return {
      email: AuthUserEmailMother.invalid(),
      password: AuthUserPasswordMother.random().value
    }
  }
}
