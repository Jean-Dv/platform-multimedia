import { AuthenticateUserCommand } from '@Auth/UserAuth/domain/AuthenticateUserCommand'
import { type CommandHandler } from '@Shared/domain/CommandHandler'
import { type UserAuthenticator } from './UserAuthenticator'
import { type Command } from '@Shared/domain/Command'
import { AuthEmail } from '@Auth/UserAuth/domain/AuthEmail'
import { AuthPassword } from '@Auth/UserAuth/domain/AuthPassword'

/**
 * Command handler for authenticating a user.
 */
export class AuthenticateUserCommandHandler
  implements CommandHandler<AuthenticateUserCommand>
{
  constructor(private readonly userAuthenticator: UserAuthenticator) {}

  /**
   * Returns the type of command this handler subscribes to.
   *
   * @returns An instance of AuthenticateUserCommand.
   */
  public subscribedTo(): Command {
    return AuthenticateUserCommand
  }

  /**
   * Handles the authentication command by running the user authenticator service.
   *
   * @param command - The authentication command containing user credentials.
   */
  public async handle(command: AuthenticateUserCommand): Promise<void> {
    const email = new AuthEmail(command.email)
    const password = new AuthPassword(command.password)
    await this.userAuthenticator.run({ email, password })
  }
}
