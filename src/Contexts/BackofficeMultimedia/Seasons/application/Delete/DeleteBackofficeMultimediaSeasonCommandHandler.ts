import { type CommandHandler } from '@Shared/domain/CommandHandler'
import { DeleteBackofficeMultimediaSeasonCommand } from './DeleteBackofficeMultimediaSeasonCommand'
import { type Command } from '@Shared/domain/Command'
import { type BackofficeMultimediaSeasonDeletor } from './BackofficeMultimediaSeasonDeletor'
import { BackofficeMultimediaSeasonId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSeasonId'

/**
 * Command handler for deleting backoffice multimedia seasons.
 */
export class DeleteBackofficeMultimediaSeasonCommandHandler
  implements CommandHandler<DeleteBackofficeMultimediaSeasonCommand>
{
  constructor(private readonly deletor: BackofficeMultimediaSeasonDeletor) {}
  public subscribedTo(): Command {
    return DeleteBackofficeMultimediaSeasonCommand
  }

  public async handle(
    command: DeleteBackofficeMultimediaSeasonCommand
  ): Promise<void> {
    const id = new BackofficeMultimediaSeasonId(command.id)
    await this.deletor.run(id)
  }
}
