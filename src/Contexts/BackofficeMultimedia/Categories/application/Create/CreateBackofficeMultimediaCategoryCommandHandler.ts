import { type CommandHandler } from '@Shared/domain/CommandHandler'
import { CreateBackofficeMultimediaCategoryCommand } from './CreateBackofficeMultimediaCategoryCommand'
import { type BackofficeMultimediaCategoryCreator } from './BackofficeMultimediaCategoryCreator'
import { type Command } from '@Shared/domain/Command'
import { BackofficeMultimediaCategoryId } from '../../../Shared/domain/BackofficeMultimediaCategoryId'
import { BackofficeMultimediaCategoryName } from '../../domain/BackofficeMultimediaCategoryName'

/**
 * Command handler for creating a new backoffice category.
 */
export class CreateBackofficeMultimediaCategoryCommandHandler
  implements CommandHandler<CreateBackofficeMultimediaCategoryCommand>
{
  constructor(private readonly creator: BackofficeMultimediaCategoryCreator) {}

  /**
   * Gets the command type this handler is subscribed to.
   *
   * @returns The command type.
   */
  public subscribedTo(): Command {
    return CreateBackofficeMultimediaCategoryCommand
  }

  /**
   * Handles the creation of a new backoffice category based on the received command.
   *
   * @param command - The command containing the details for creating the category.
   * @returns A promise that resolves when the creation process is completed.
   */
  public async handle(
    command: CreateBackofficeMultimediaCategoryCommand
  ): Promise<void> {
    const id = new BackofficeMultimediaCategoryId(command.id)
    const name = new BackofficeMultimediaCategoryName(command.name)
    await this.creator.run({ id, name })
  }
}
