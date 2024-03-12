import { type CommandHandler } from '@Shared/domain/CommandHandler'
import { CreateBackofficeMultimediaVideoCommand } from './CreateBackofficeMultimediaVideoCommand'
import { type BackofficeMultimediaVideoCreator } from './BackofficeMultimediaVideoCreator'
import { type Command } from '@Shared/domain/Command'
import { BackofficeMultimediaVideoId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaVideoId'
import { BackofficeMultimediaVideoPath } from '@BackofficeMultimedia/Videos/domain/BackofficeMultimediaVideoPath'

/**
 * Command handler for creating backoffice multimedia videos.
 */
export class CreateBackofficeMultimediaVideoCommandHandler
  implements CommandHandler<CreateBackofficeMultimediaVideoCommand>
{
  constructor(private readonly creator: BackofficeMultimediaVideoCreator) {}

  public subscribedTo(): Command {
    return CreateBackofficeMultimediaVideoCommand
  }

  public async handle(
    command: CreateBackofficeMultimediaVideoCommand
  ): Promise<void> {
    const id = new BackofficeMultimediaVideoId(command.id)
    const path = new BackofficeMultimediaVideoPath(command.path)
    await this.creator.run({
      id,
      path
    })
  }
}
