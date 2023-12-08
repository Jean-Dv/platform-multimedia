import { type CommandHandler } from '@Shared/domain/CommandHandler'
import { CreateRoleCommand } from './CreateRoleCommand'
import { type RoleCreator } from './RoleCreator'
import { type Command } from '@Shared/domain/Command'
import { RoleId } from '@Auth/Shared/domain/Roles/RoleId'
import { RoleName } from '@Auth/Roles/domain/RoleName'

export class CreateRoleCommandHandler
  implements CommandHandler<CreateRoleCommand>
{
  constructor(private readonly creator: RoleCreator) {}

  public subscribedTo(): Command {
    return CreateRoleCommand
  }

  public async handle(command: CreateRoleCommand): Promise<void> {
    const id = new RoleId(command.id)
    const name = RoleName.fromValue(command.name)
    await this.creator.run({
      id,
      name
    })
  }
}
