import { CreateUserCommand } from '@Auth/User/domain/CreateUserCommand'
import { type CommandHandler } from '@Shared/domain/CommandHandler'
import { type UserCreator } from './UserCreator'
import { type Command } from '@Shared/domain/Command'
import { UserFirstName } from '@Auth/User/domain/UserFirstName'
import { UserLastName } from '@Auth/User/domain/UserLastName'
import { UserEmail } from '@Auth/User/domain/UserEmail'
import { UserPassword } from '@Auth/User/domain/UserPassword'
import { UserId } from '@Auth/Shared/domain/User/UserId'

export class CreateUserCommandHandler
  implements CommandHandler<CreateUserCommand>
{
  constructor(private readonly userCreator: UserCreator) {}

  public subscribedTo(): Command {
    return CreateUserCommand
  }

  public async handle(command: CreateUserCommand): Promise<void> {
    const id = new UserId(command.id)
    const firstName = new UserFirstName(command.firstName)
    const lastName = new UserLastName(command.lastName)
    const email = new UserEmail(command.email)
    const password = new UserPassword(command.password)
    await this.userCreator.run({ id, firstName, lastName, email, password })
  }
}
