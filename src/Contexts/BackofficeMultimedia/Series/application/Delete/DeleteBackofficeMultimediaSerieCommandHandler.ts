import { type CommandHandler } from '@Shared/domain/CommandHandler'
import { DeleteBackofficeMultimediaSerieCommand } from './DeleteBackofficeMultimediaSerieCommand'
import { type Command } from '@Shared/domain/Command'
import { BackofficeMultimediaSerieId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSerieId'
import { type BackofficeMultimediaSerieDeletor } from './BackofficeMultimediaSerieDeletor'

/**
 * Command handler for deleting backoffice multimedia series.
 */
export class DeleteBackofficeMultimediaSerieCommandHandler
  implements CommandHandler<DeleteBackofficeMultimediaSerieCommand>
{
  constructor(private readonly deletor: BackofficeMultimediaSerieDeletor) {}

  public subscribedTo(): Command {
    return DeleteBackofficeMultimediaSerieCommand
  }

  public async handle(
    command: DeleteBackofficeMultimediaSerieCommand
  ): Promise<void> {
    const id = new BackofficeMultimediaSerieId(command.id)
    await this.deletor.run(id)
  }
}
