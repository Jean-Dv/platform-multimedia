import { type CommandHandler } from '@Shared/domain/CommandHandler'
import { CreateBackofficeCategoryCommand } from './CreateBackofficeCategoryCommand'
import { type BackofficeCategoryCreator } from './BackofficeCategoryCreator'
import { type Command } from '@Shared/domain/Command'
import { BackofficeCategoryId } from '../../domain/BackofficeCategoryId'
import { BackofficeCategoryName } from '../../domain/BackofficeCategoryName'

/**
 * Command handler for creating a new backoffice category.
 */
export class CreateBackofficeCategoryCommandHandler
  implements CommandHandler<CreateBackofficeCategoryCommand>
{
  constructor(private readonly creator: BackofficeCategoryCreator) {}

  /**
   * Gets the command type this handler is subscribed to.
   *
   * @returns The command type.
   */
  public subscribedTo(): Command {
    return CreateBackofficeCategoryCommand
  }

  /**
   * Handles the creation of a new backoffice category based on the received command.
   *
   * @param command - The command containing the details for creating the category.
   * @returns A promise that resolves when the creation process is completed.
   */
  public async handle(command: CreateBackofficeCategoryCommand): Promise<void> {
    const id = new BackofficeCategoryId(command.id)
    const name = new BackofficeCategoryName(command.name)
    await this.creator.run({ id, name })
  }
}
